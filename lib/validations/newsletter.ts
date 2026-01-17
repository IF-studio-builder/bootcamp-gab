import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),
  parcours: z
    .array(z.enum(["dev", "pm", "designer", "ops"]))
    .optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
