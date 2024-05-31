import { z } from 'zod';

export const AddAddressSchema = z.object({
  pincode: z.coerce.number().int().positive(),
  houseNo: z.string(),
  area: z.string(),
  landmark: z.string().optional(),
  city: z.string(),
  state: z.string()
});

export type AddAddressSchema = z.infer<typeof AddAddressSchema>;
