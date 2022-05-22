import { Request, Response } from 'express';

import { badRequest, internalError, notFound } from '../helpers/http.helper';
import databaseService from '../services/DatabaseService';
import professionalRepository from '../repositories/professional.repository';
import schedulingRepository from '../repositories/scheduling.repository';
import SchedulingType from '../types/scheduling.type';
import serviceRepository from '../repositories/service.repository';
import ServiceType from '../types/service.type';

export default class SchedulingController {
  public static async create(req: Request, res: Response) {
    const rawScheduling = req.body;

    const { professionalId, startTime, serviceIds } = rawScheduling;

    const professionalExists = await professionalRepository.exists(
      +professionalId
    );

    if (!professionalExists) {
      const noProfessionalError = `professionalId ${professionalId} não encontrado.`;
      return badRequest(res, noProfessionalError);
    }

    const availableServices = await serviceRepository.findByProfessionalId(
      +professionalId
    );

    if (!availableServices) {
      const noServicesError = `professionalId ${professionalId} não possui serviços disponíveis.`;
      return badRequest(res, noServicesError);
    }

    let selectedServices: ServiceType[] = availableServices.filter(
      (service: ServiceType) => serviceIds.includes(service.id)
    );

    if (!selectedServices) {
      const noAvailableServicesError = `Não foi possível buscar serviços para professionalId ${professionalId}`;
      return internalError(res, noAvailableServicesError);
    }

    if (!selectedServices.length) {
      const servicesNotFoundError = `Serviços selecionados [${serviceIds}] não encontrados.`;
      return notFound(res, servicesNotFoundError);
    }

    try {
      selectedServices = await serviceRepository.findByIds(
        selectedServices.map((s: ServiceType) => +s.id)
      );

      const [estimatedTime, totalPrice] = selectedServices.reduce(
        (total: number[], current: ServiceType) => [
          total[0] + +current.estimatedTime,
          total[1] + +current.startingPrice
        ],
        [0, 0]
      );

      const startTimeInMilisseconds = Date.parse(startTime);
      const serviceDurationInMilisseconds = estimatedTime * 60000;

      const endTime = startTimeInMilisseconds + serviceDurationInMilisseconds;

      rawScheduling.totalPrice = totalPrice;
      rawScheduling.endTime = new Date(endTime).toISOString();

      const customerId = res.locals.user.id;
      rawScheduling.customerId = customerId;

      delete rawScheduling.serviceIds;
    } catch (err) {
      console.error(err);
      return internalError(res, 'Erro ao obter dados de serviços.');
    }

    const scheduling: SchedulingType = Object.assign(rawScheduling, {});

    return databaseService.connection.transaction(async (trx) => {
      try {
        const schedulingId = await schedulingRepository.createScheduling(
          scheduling,
          trx
        );

        await schedulingRepository.insertSchedulingServices(
          +schedulingId,
          serviceIds,
          trx
        );
        return res
          .status(201)
          .json({ message: 'Agendamento criado com sucesso.' });
      } catch (err) {
        console.log(err);
        return internalError(res, 'Erro ao criar agendamento.');
      }
    });
  }

  public static async deleteById(req: Request, res: Response) {
    const { schedulingId } = req.params;
    const user = res.locals.user;

    let scheduling: SchedulingType;

    try {
      scheduling = await schedulingRepository.findById(
        +schedulingId,
        user.id,
        user.type
      );

      if (!scheduling) {
        return badRequest(res, `Não existe agendamento com id ${schedulingId}`);
      }
    } catch (err) {
      console.error(err);
      return internalError(res, 'Houve algum erro ao buscar por agendamento');
    }

    const toleranceHours = 24;
    const remainingHoursUntilService = hoursFromScheduling(scheduling);

    if (remainingHoursUntilService < toleranceHours) {
      const errorMessage =
        'Não é possível remover agendamento com menos de 24h de antecedência';
      return badRequest(res, errorMessage);
    }

    try {
      await schedulingRepository.removeById(+schedulingId);
    } catch (err) {
      console.error(err);
      return internalError(
        res,
        'Houve algum erro durante a remoção do agendamento'
      );
    }

    return res
      .status(204)
      .json({ message: 'Agendamento removido com sucesso.' });
  }

  public static async get(req: Request, res: Response) {
    const confirmed = req.query.confirmed === 'true';
    const { user } = res.locals;

    try {
      const schedulings = await schedulingRepository
        .findAll(user.id, user.type, confirmed)
        .then((schedulings) => {
          for (const s of schedulings)
            if (user.type === 'CUSTOMER') delete s.customer;
            else delete s.professional;

          return schedulings;
        });

      return res.status(200).json(schedulings);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro interno ao retornar agendamentos');
    }
  }

  public static async acceptById(req: Request, res: Response) {
    const { schedulingId } = req.params;

    let scheduling: SchedulingType;

    try {
      const { user } = res.locals;
      scheduling = await schedulingRepository.findById(
        +schedulingId,
        user.id,
        'PROFESSIONAL',
        false
      );

      if (!scheduling) {
        const errorMessage = `Não existe agendamento com id ${schedulingId}`;
        return badRequest(res, errorMessage);
      }
    } catch (err) {
      console.error(err);
      const errorMessage = `Não foi possível buscar o agendamento com id ${schedulingId}`;
      return internalError(res, errorMessage);
    }

    try {
      await schedulingRepository.confirmById(schedulingId);
      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return internalError(res, 'Não foi possível confirmar agendamento');
    }
  }

  public static async refuseById(req: Request, res: Response) {
    const { schedulingId } = req.params;

    let scheduling: SchedulingType;

    try {
      const { user } = res.locals;
      scheduling = await schedulingRepository.findById(
        +schedulingId,
        user.id,
        'PROFESSIONAL',
        false
      );

      if (!scheduling) {
        const errorMessage = `Não existe agendamento com id ${schedulingId}`;
        return badRequest(res, errorMessage);
      }
    } catch (err) {
      console.error(err);
      const errorMessage = `Não foi possível buscar o agendamento com id ${schedulingId}`;
      return internalError(res, errorMessage);
    }

    try {
      await schedulingRepository.removeById(+schedulingId);
      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return internalError(res, 'Não foi possível confirmar agendamento');
    }
  }

  public static async getOne(req: Request, res: Response) {
    const schedulingId = +req.params.schedulingId;
    const { user } = res.locals;

    try {
      const scheduling = await schedulingRepository.findById(
        schedulingId,
        user.id,
        user.type
      );

      if (!scheduling)
        return notFound(
          res,
          `Agendamento com id ${schedulingId} não encontrado.`
        );

      if (user.type === 'CUSTOMER') delete scheduling.customer;
      else delete scheduling.professional;

      return res.status(200).json(scheduling);
    } catch (err) {
      console.error(err);

      return internalError(res, 'Erro interno ao retornar agendamentos');
    }
  }
}

function hoursFromScheduling(scheduling: SchedulingType): number {
  const currentTimestamp = Date.now();
  const schedulingTimestamp = scheduling.startTime.getTime();

  const remainingTime = schedulingTimestamp - currentTimestamp;
  const remainingHours = Math.ceil(remainingTime / (1000 * 60 * 60));

  return remainingHours;
}
