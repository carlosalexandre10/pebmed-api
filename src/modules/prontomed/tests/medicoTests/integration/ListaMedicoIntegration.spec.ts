import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/database';

import app from '../../../../../app';

let connection: Connection;

describe('Lista Médico Controller', () => {
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

  it('deve ser capaz de listar todos os médico', async () => {
    const responseToken = await request(app).post('/v1/sessions').send({
      crm: 9999,
      senha: 'admin',
    });
    const { token } = responseToken.body;

    const response = await request(app)
      .get('/v1/medicos')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body.length).toBeGreaterThan(0);
  });
});
