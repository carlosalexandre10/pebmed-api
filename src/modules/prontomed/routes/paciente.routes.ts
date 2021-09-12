import { Router } from 'express';

import AlteraPacienteController from '../controllers/pacienteControllers/AlteraPacienteController';
import IncluiPacienteController from '../controllers/pacienteControllers/IncluiPacienteController';
import ListaPacienteController from '../controllers/pacienteControllers/ListaPacienteController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const pacienteRouter = Router();
pacienteRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: API - Pacientes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Paciente:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: ID do Paciente - NotNull.
 *          medico_id:
 *            type: string
 *            description: ID do Médico do Paciente - NotNull.
 *          nome:
 *            type: string
 *            description: Nome do Paciente - NotNull.
 *          telefone:
 *            type: number
 *            description: Telefone do Paciente - NotNull.
 *          email:
 *            type: string
 *            description: E-mail do Paciente - NotNull.
 *          dataNascimento:
 *            type: Date
 *            description: Data de Nascimento do Paciente no formato yyyy/MM/dd - NotNull.
 *          sexo:
 *            type: number
 *            description: Sexo do Paciente - 1 (Masculino) | 2 (Feminino) - NotNull.
 *          altura:
 *            type: number
 *            description: Altura do Paciente - NotNull.
 *          peso:
 *            type: number
 *            description: Peso do Paciente - NotNull.
 *        example:
 *          id: 7957a433-8051-444c-a141-0e167a841311
 *          medico_id: d0d0ae53-4e3d-4ff6-87f5-f95e7d53c3ec
 *          nome: Carlos Oliveira
 *          telefone: 62999999999
 *          email: carlos@gmail.com
 *          dataNascimento: 1992-11-16
 *          sexo: 1
 *          altura: 1.75
 *          peso: 82
 */

/**
 * @swagger
 * /v1/pacientes:
 *   post:
 *     tags: [Pacientes]
 *     summary: Inclui um Paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                medico_id:
 *                  type: string
 *                  description: Médico do Paciente.
 *                  example: 7957a433-8051-444c-a141-0e167a841311
 *                nome:
 *                  type: string
 *                  description: Nome do Paciente.
 *                  example: Carlos Oliveira
 *                telefone:
 *                  type: number
 *                  description: Telefone do Paciente.
 *                  example: 62999999999
 *                email:
 *                  type: string
 *                  description: E-mail do Paciente.
 *                  example: carlos@gmail.com
 *                dataNascimento:
 *                  type: string
 *                  description: Data de Nascimento do Paciente no formato yyyy/MM/dd.
 *                  example: 1992-11-16
 *                sexo:
 *                  type: number
 *                  description: Sexo do Paciente - 1 (Masculino) | 2 (Feminino).
 *                  example: 1
 *                altura:
 *                  type: number
 *                  description: Altura do Paciente.
 *                  example: 1.75
 *                peso:
 *                  type: number
 *                  description: Peso do Paciente.
 *                  example: 82
 *     responses:
 *       201:
 *         description: Paciente criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 */
const incluiPacienteController = new IncluiPacienteController();
pacienteRouter.post('/', incluiPacienteController.handle);

/**
 * @swagger
 * /v1/pacientes:
 *   get:
 *     tags: [Pacientes]
 *     summary: Lista de Pacientes.
 *     description: Retorna uma lista dos Pacientes em um JSON contendo todos os campos.
 *     responses:
 *       200:
 *         description: Pacientes listados..
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Paciente'
 */
const listaPacienteController = new ListaPacienteController();
pacienteRouter.get('/', listaPacienteController.handle);

/**
 * @swagger
 * /v1/pacientes/{id}:
 *   put:
 *     tags: [Pacientes]
 *     summary: Altera um Paciente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do Paciente.
 *         schema:
 *           type: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                medico_id:
 *                  type: string
 *                  description: Médico do Paciente.
 *                  example: 7957a433-8051-444c-a141-0e167a841311
 *                nome:
 *                  type: string
 *                  description: Nome do Paciente.
 *                  example: Carlos Oliveira
 *                telefone:
 *                  type: number
 *                  description: Telefone do Paciente.
 *                  example: 62999999999
 *                email:
 *                  type: string
 *                  description: E-mail do Paciente.
 *                  example: carlos@gmail.com
 *                dataNascimento:
 *                  type: string
 *                  description: Data de Nascimento do Paciente no formato yyyy/MM/dd.
 *                  example: 1992-11-16
 *                sexo:
 *                  type: number
 *                  description: Sexo do Paciente - 1 (Masculino) | 2 (Feminino).
 *                  example: 1
 *                altura:
 *                  type: number
 *                  description: Altura do Paciente.
 *                  example: 1.75
 *                peso:
 *                  type: number
 *                  description: Peso do Paciente.
 *                  example: 82
 *     responses:
 *       200:
 *         description: Paciente alterado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 */
const alteraPacienteController = new AlteraPacienteController();
pacienteRouter.put('/:id', alteraPacienteController.handle);

export default pacienteRouter;
