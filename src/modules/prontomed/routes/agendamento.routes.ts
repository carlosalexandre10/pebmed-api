import { Router } from 'express';

import AlteraAgendamentoController from '../controllers/agendamentoControllers/AlteraAgendamentoController';
import ExcluiAgendamentoController from '../controllers/agendamentoControllers/ExcluiAgendamentoController';
import IncluiAgendamentoController from '../controllers/agendamentoControllers/IncluiAgendamentoController';
import ListaAgendamentoController from '../controllers/agendamentoControllers/ListaAgendamentoController';

const agendamentoRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: API - Agendamentos
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Agendamento:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID do Agendamento - NotNull.
 *          paciente_id:
 *            type: string
 *            description: ID do Paciente do Agendamento - NotNull.
 *          data:
 *            type: Date
 *            description: Data do Agendamento no formato yyyy/MM/dd - NotNull.
 *        example:
 *          id: aa951bdc-f80d-492c-9eae-c3b2fc9922ba
 *          paciente_id: 7957a433-8051-444c-a141-0e167a841311
 *          data: 2021-08-23
 */

/**
 * @swagger
 * /v1/agendamentos:
 *   post:
 *     tags: [Agendamentos]
 *     summary: Inclui um Agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                paciente_id:
 *                  type: string
 *                  description: ID do Paciente do Agendamento.
 *                  example: 7957a433-8051-444c-a141-0e167a841311
 *                data:
 *                  type: Date
 *                  description: Data da Consulta no formato yyyy/MM/dd.
 *                  example: 2021-08-23
 *     responses:
 *       201:
 *         description: Agendamento criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 */
const incluiAgendamentoController = new IncluiAgendamentoController();
agendamentoRouter.post('/', incluiAgendamentoController.handle);

/**
 * @swagger
 * /v1/agendamentos:
 *   get:
 *     tags: [Agendamentos]
 *     summary: Lista de Agendamentos.
 *     description: Retorna uma lista dos Agendamentos em um JSON contendo todos os campos.
 *     responses:
 *       200:
 *         description: Agendamentos listados.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Agendamento'
 */
const listaAgendamentoController = new ListaAgendamentoController();
agendamentoRouter.get('/', listaAgendamentoController.handle);

/**
 * @swagger
 * /v1/agendamentos/{id}:
 *   put:
 *     tags: [Agendamentos]
 *     summary: Altera um Agendamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Agendamento.
 *         schema:
 *           type: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                paciente_id:
 *                  type: string
 *                  description: ID do Paciente do Agendamento.
 *                  example: 7957a433-8051-444c-a141-0e167a841311
 *                data:
 *                  type: Date
 *                  description: Data da Consulta no formato yyyy/MM/dd.
 *                  example: 2021-08-23
 *     responses:
 *       200:
 *         description: Agendamento alterado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 */
const alteraAgendamentoController = new AlteraAgendamentoController();
agendamentoRouter.put('/:id', alteraAgendamentoController.handle);

/**
 * @swagger
 * /v1/agendamentos/{id}:
 *   delete:
 *     tags: [Agendamentos]
 *     summary: Exclui um Agendamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Agendamento.
 *         schema:
 *           type: uuid
 *     responses:
 *       204:
 *         description: Agendamento excluído
 */
const excluiAgendamentoController = new ExcluiAgendamentoController();
agendamentoRouter.delete('/:id', excluiAgendamentoController.handle);

export default agendamentoRouter;
