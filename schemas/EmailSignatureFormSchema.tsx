import * as z from "zod";

export type EmailSignatureFormData =
  | z.infer<typeof emailSignatureFormSchema>
  | undefined;

export const emailSignatureFormSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  title: z.string(),
  company: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  displaySocialMediaIcons: z.boolean().optional(),
  includeBackground: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  includeBorder: z.boolean().optional(),
  borderColor: z.string().optional(),
  borderWidth: z.string().optional(),
  fontSize: z.string().optional(),
});
