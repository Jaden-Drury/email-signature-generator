import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  EmailSignatureFormData,
  emailSignatureFormSchema,
} from "@/schemas/EmailSignatureFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EmailSignatureFormProps = {
  formState: EmailSignatureFormData | undefined;
  setFormState: (formState: EmailSignatureFormData) => void;
};

type FormType = z.infer<typeof emailSignatureFormSchema>;

export default function EmailSignatureForm({
  setFormState,
}: EmailSignatureFormProps) {
  const defaultFormState: FormType = {
    firstName: "Jaden",
    lastName: "Drury",
    title: "Software Engineer",
    company: "Developer Inc.",
    phone: "555-123-4567",
    email: "jdrury@example.com",
    website: "example.com/jdrury",
  };

  const form = useForm<FormType>({
    resolver: zodResolver(emailSignatureFormSchema),
    defaultValues: defaultFormState,
  });

  //   Updates the parent form state on blur of each field
  function updateState() {
    setFormState(form.getValues());
  }

  function onSubmit(data: z.infer<typeof emailSignatureFormSchema>) {
    setFormState(form.getValues());
    console.log(data);
  }

  function clearForm() {
    form.reset();
    setFormState(undefined);
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Controller
        name="firstName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="John"
              autoComplete="given-name"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="lastName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Doe"
              autoComplete="family-name"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Software Engineer"
              autoComplete="organization-title"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="company"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Company</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Software Engineer"
              autoComplete="organization-title"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="(123) 456-7890"
              autoComplete="tel"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="john.doe@example.com"
              autoComplete="email"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="website"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Website</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="https://example.com"
              autoComplete="url"
              onBlur={() => updateState()}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <p>Logo</p>

      <div className="flex flex-row gap-4">
        <Button type="button" variant="outline" onClick={clearForm}>
          Clear
        </Button>

        <Button type="submit" form="form-rhf-demo">
          Submit
        </Button>
      </div>
    </form>
  );
}
