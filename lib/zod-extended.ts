import { z } from 'zod';

export const zodExtended = {
  password: () =>
    z
      .string()
      .min(6, 'Password should contain atleast 6 letters')
      .refine(
        (arg) => arg.match(/\d/g)?.length,
        'Password should contain atleast 1 number'
      )
      .refine(
        (arg) => arg.match(/[A-Z]/g)?.length,
        'Password should contain atleast 1 upper-case letter'
      )
      .refine(
        (arg) => arg.match(/[a-z]/g)?.length,
        'Password should contain atleast 1 lower-case letter'
      )
};
