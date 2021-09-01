import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListaConsultaService from '@modules/prontomed/services/consultaServices/ListaConsultaService';

class ListaConsultaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listaConsultaService = container.resolve(ListaConsultaService);

    const consultas = await listaConsultaService.execute();

    return response.status(200).json(consultas);
  }
}

export default ListaConsultaController;
