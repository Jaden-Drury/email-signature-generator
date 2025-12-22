import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  EmailSignatureFormData,
  emailSignatureFormSchema,
} from "@/schemas/EmailSignatureFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type EmailSignatureFormProps = {
  formState: EmailSignatureFormData | undefined;
  setFormState: (formState: EmailSignatureFormData) => void;
};

type FormType = z.infer<typeof emailSignatureFormSchema>;

export default function EmailSignatureForm({
  formState,
  setFormState,
}: EmailSignatureFormProps) {
  const defaultFormState: FormType = {
    name: "Jaden Drury",
    title: "Software Engineer",
    company: "Developer Inc.",
    phone: "555-123-4567",
    email: "jdrury@example.com",
    website: "example.com/jdrury",
    displaySocialMediaIcons: true,
    includeBackground: false,
    backgroundColor: "#ffffffff",
    includeBorder: false,
    borderColor: "#000000",
    borderWidth: "1",
    fontSize: "12",
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
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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

      {/* Social Media Icon Settings */}
      <Controller
        name="displaySocialMediaIcons"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>
              Display Social Media Icons
            </FieldLabel>
            <div>
              <Switch
                checked={field.value}
                id={field.name}
                onCheckedChange={field.onChange}
              />
            </div>
          </Field>
        )}
      />

      {/* Background Settings */}
      <div className="flex flex-row-reverse gap-4">
        <Controller
          name="includeBackground"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Include Background</FieldLabel>
              <div>
                <Switch
                  checked={field.value}
                  id={field.name}
                  onCheckedChange={field.onChange}
                  onClick={() => updateState()}
                />
              </div>
            </Field>
          )}
        />
        {formState && formState.includeBackground && (
          <Controller
            name="backgroundColor"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-[50px]">
                <FieldLabel htmlFor={field.name}>Background Color</FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="color"
                    placeholder="#ffffff"
                    onBlur={() => updateState()}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
      </div>

      {/* Border Settings */}
      <div className="flex flex-row-reverse gap-4">
        <Controller
          name="includeBorder"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Include Border</FieldLabel>
              <div className="w-auto">
                <Switch
                  checked={field.value}
                  id={field.name}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />

        {formState && formState.includeBorder && (
          <>
            <Controller
              name="borderColor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Border Color</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="color"
                    placeholder="#ffffff"
                    onBlur={() => updateState()}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="borderWidth"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Border Width</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="1"
                    onBlur={() => updateState()}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </>
        )}
      </div>

      {/* Font Size  */}
      <Controller
        name="fontSize"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Font Size</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="number"
              placeholder="12"
              onBlur={(e) => {
                if (!e.target.value) {
                  field.onChange("12");
                }
                updateState();
              }}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

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
