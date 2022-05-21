import { Request, Response } from 'express';

import {
  badRequest,
  internalError,
  notFound,
  unauthorizedAccess
} from '../helpers/http.helper';
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
    const { schedulingId } = req.query;

    return databaseService.connection.transaction(async (trx) => {
      try {
        // TODO Remover tudo o que tiver relacionado com esse agendamento se não tiver sido confirmado
      } catch (err) {
        console.error(err);
        return internalError(res, 'Não foi possível remover o agendamento');
      }

      return unauthorizedAccess(res);
    });
  }
}
