import { Request, Response } from 'express';

import { badRequest, internalError, notFound } from '../helpers/http.helper';
import ServiceType from '../types/service.type';
import databaseService from '../services/DatabaseService';
import professionalRepository from '../repositories/professional.repository';
import schedulingRepository from '../repositories/scheduling.repository';
import serviceRepository from '../repositories/service.repository';

export default class SchedulingController {
  public static async create(req: Request, res: Response) {
    const scheduling = req.body;

    const { professionalId, startTime, serviceIds } = scheduling;

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

      const startTimeInMilisseconds = Date.parse(startTime)
      const serviceDurationInMilisseconds = estimatedTime * 60000

      const endTime = startTimeInMilisseconds + serviceDurationInMilisseconds;

      scheduling.totalPrice = totalPrice;
      scheduling.endTime = endTime

      // TODO Adicionar scheduling no banco e linkar cada servico a ele

      return res
        .status(201)
        .json({ message: 'Agendamento criado com sucesso.' });
    } catch (err) {
      console.error(err);
      return internalError(res, 'Não foi possível realizar o agendamento');
    }
  }
}
