import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est obligatoire"),
});
