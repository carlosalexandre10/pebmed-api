import { Router } from 'express';

import AutenticaMedicoController from '../controllers/medicoControllers/AutenticaMedicoController';

const autenticacaoRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: API - Autenticação
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
 * /v1/sessions:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autentica um Médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
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
 *         description: Médico autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 */
const autenticaMedicoController = new AutenticaMedicoController();
autenticacaoRouter.post('/sessions', autenticaMedicoController.handle);

export default autenticacaoRouter;
