import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/database';

import app from '../../../../../app';

let connection: Connection;

describe('Inclui Médico Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const senha = await hash('admin', 8);

    await connection.query(
      `INSERT INTO MEDICO(id, nome, crm ,senha, "isAdmin")
      values('${id}', 'admin', 9999, '${senha}', true )`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('deve ser capaz de incluir um novo médico', async () => {
    const responseToken = await request(app).post('/v1/sessions').send({
      crm: 9999,
      senha: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/v1/medicos')
      .send({
        nome: 'Carlos SuperTest',
        crm: 999999,
        senha: 'carlos123',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it('não deve ser capaz de incluir médico com mesmo CRM', async () => {
    const responseToken = await request(app).post('/v1/sessions').send({
      crm: 9999,
      senha: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/v1/medicos')
      .send({
        nome: 'Carlos SuperTest',
        crm: 999999,
        senha: 'carlos123',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
