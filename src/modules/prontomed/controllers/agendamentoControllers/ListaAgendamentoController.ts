import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListaAgendamentoService from '@modules/prontomed/services/agendamentoServices/ListaAgendamentoService';

class ListaAgendamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listaAgendamentoService = container.resolve(ListaAgendamentoService);

    const agendamentos = await listaAgendamentoService.execute();

    return response.status(200).json(agendamentos);
  }
}

export default ListaAgendamentoController;
