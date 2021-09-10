import { validate } from 'class-validator';

export default async function validarCampos(
  entity: Record<string, unknown>,
): Promise<string> {
  const errors = await validate(entity);

  if (errors.length > 0 && errors[0].constraints) {
    for (const message of Object.keys(errors[0].constraints)) {
      return errors[0].constraints[message];
    }
  }

  return '';
}
