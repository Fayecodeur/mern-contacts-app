import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro est obligatoire"),
});

export const updateContactSchema = createContactSchema.partial();
