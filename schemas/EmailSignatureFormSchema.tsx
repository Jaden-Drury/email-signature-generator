import * as z from "zod";

export type EmailSignatureFormData =
  | z.infer<typeof emailSignatureFormSchema>
  | undefined;

export const emailSignatureFormSchema = z.object({
  firstName: z.string().min(1, "First name must be at least 1 character."),
  lastName: z.string().min(1, "Last name must be at least 1 character."),
  title: z.string(),
  company: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
});
