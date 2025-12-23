import * as z from "zod";

export type EmailSignatureFormData = z.infer<typeof emailSignatureFormSchema>;

export const emailSignatureFormSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  title: z.string(),
  company: z.string(),
  phone: z.string(),
  email: z.string(),
  website: z.string(),
  image: z
    .array(
      z.object({
        value: z.url("Must be a valid URL"),
        altText: z.string().min(1, "Alt text is required"),
      })
    )
    .length(1),
  icons: z.array(
    z.object({
      value: z.url("Must be a valid URL"),
      altText: z.string().min(1, "Alt text is required"),
    })
  ),
  displayIcons: z.boolean().optional(),
  iconPosition: z.enum(["right", "bottom"]).optional(),
  iconAlignment: z.enum(["start", "center", "end"]).optional(),
  includeBackground: z.boolean().optional(),
  backgroundColor: z.string().optional(),
  includeBorder: z.boolean().optional(),
  borderColor: z.string().optional(),
  borderWidth: z.string().optional(),
  fontSize: z.string().optional(),
});
