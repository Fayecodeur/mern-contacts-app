import z from "zod";

export const createContactSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  email: z.string().email("L''email est invalid"),
  phone: z.string().min(6, "Téléphone invalide"),
});
