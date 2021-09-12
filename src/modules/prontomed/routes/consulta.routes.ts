import { Router } from 'express';

import IncluiAnotacaoConsultaController from '../controllers/consultaControllers/IncluiAnotacaoConsultaController';
import IncluiConsultaController from '../controllers/consultaControllers/IncluiConsultaController';
import ListaConsultaController from '../controllers/consultaControllers/ListaConsultaController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const consultaRouter = Router();
consultaRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: API - Consultas
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Consulta:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID da Consulta - NotNull.
 *          paciente_id:
 *            type: string
 *            description: ID do Paciente da Consulta - NotNull.
 *          data:
 *            type: Date
 *            description: Data da Consulta no formato yyyy/MM/dd - NotNull.
 *          anotacao:
 *            type: string
 *            description: Anotação da Consulta - Null.
 *        example:
 *          id: aa951bdc-f80d-492c-9eae-c3b2fc9922ba
 *          paciente_id: 7957a433-8051-444c-a141-0e167a841311
 *          data: 2021-08-23
 *          anotacao: paciente melhorou...
 */

/**
 * @swagger
 * /v1/consultas:
 *   post:
 *     tags: [Consultas]
 *     summary: Inclui uma Consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                paciente_id:
 *                  type: string
 *                  description: ID do Paciente da Consulta.
 *                  example: 7957a433-8051-444c-a141-0e167a841311
 *                data:
 *                  type: Date
 *                  description: Data da Consulta no formato yyyy/MM/dd.
 *                  example: 2021-08-23
 *                anotacao:
 *                  type: string
 *                  description: Anotação da Consulta.
 *                  example: campo null
 *     responses:
 *       201:
 *         description: Consulta criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 */
const incluiConsultaController = new IncluiConsultaController();
consultaRouter.post('/', incluiConsultaController.handle);

/**
 * @swagger
 * /v1/consultas/{id}:
 *   patch:
 *     tags: [Consultas]
 *     summary: Inclui uma Anotação na Consulta feita pelo Médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Consulta.
 *         schema:
 *           type: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                anotacao:
 *                  type: string
 *                  description: Anotação da Consulta.
 *                  example: paciente melhorou...
 *     responses:
 *       200:
 *         description: Anotação inserida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 */
const incluiAnotacaoConsultaController = new IncluiAnotacaoConsultaController();
consultaRouter.patch('/:id', incluiAnotacaoConsultaController.handle);

/**
 * @swagger
 * /v1/consultas:
 *   get:
 *     tags: [Consultas]
 *     summary: Lista de Consultas.
 *     description: Retorna uma lista das Consultas em um JSON contendo todos os campos.
 *     responses:
 *       200:
 *         description: Consultas listadas.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Consulta'
 */
const listaConsultaController = new ListaConsultaController();
consultaRouter.get('/', listaConsultaController.handle);

export default consultaRouter;
