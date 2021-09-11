import { validate } from 'class-validator';

export default async function validarCampos(entity: object): Promise<string> {
  const errors = await validate(entity, { skipMissingProperties: true });

  if (errors.length > 0 && errors[0].constraints) {
    for (const message of Object.keys(errors[0].constraints)) {
      return errors[0].constraints[message];
    }
  }

  return '';
}
