import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const senha = await hash('admin', 8);

  await connection.query(
    `INSERT INTO MEDICO(id, nome, crm ,senha, "isAdmin")
      values('${id}', 'admin', 9999, '${senha}', true )`,
  );

  await connection.close;
}

create().then(() => console.log('Médico Administrador criado'));
