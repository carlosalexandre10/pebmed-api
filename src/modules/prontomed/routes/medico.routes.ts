import { Router } from 'express';

import IncluiMedicoController from '../controllers/medicoControllers/IncluiMedicoController';
import ListaMedicoController from '../controllers/medicoControllers/ListaMedicoController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const medicoRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: API - Médicos
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Medico:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID do Médico - NotNull.
 *          nome:
 *            type: string
 *            description: Nome do Médico - NotNull.
 *          crm:
 *            type: number
 *            description: CRM do Médico - NotNull.
 *        example:
 *          id: d0d0ae53-4e3d-4ff6-87f5-f95e7d53c3ec
 *          nome: Carlos Alexandre
 *          crm: 9999
 */

/**
 * @swagger
 * /v1/medicos:
 *   post:
 *     tags: [Médicos]
 *     summary: Inclui um Médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                nome:
 *                  type: string
 *                  description: Nome do Médico.
 *                  example: Carlos Alexandre
 *                crm:
 *                  type: number
 *                  description: CRM do Médico.
 *                  example: 9999
 *                senha:
 *                  type: string
 *                  description: Senha do Médico.
 *                  example: CÇndqwew12212
 *     responses:
 *       201:
 *         description: Médico criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 */
const incluiMedicoController = new IncluiMedicoController();
medicoRouter.post('/', incluiMedicoController.handle);

/**
 * @swagger
 * /v1/medicos:
 *   get:
 *     tags: [Médicos]
 *     summary: Lista de Médicos.
 *     description: Retorna uma lista dos Médicos em um JSON contendo todos os campos.
 *     responses:
 *       200:
 *         description: Médicos listados.
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Medico'
 */
const listaMedicoController = new ListaMedicoController();
medicoRouter.get('/', ensureAuthenticated, listaMedicoController.handle);

export default medicoRouter;
