import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  EmailSignatureFormData,
  emailSignatureFormSchema,
} from "@/schemas/EmailSignatureFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusIcon, XIcon } from "lucide-react";
import { Separator } from "./ui/separator";

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
    image: [{ value: "https://placehold.co/200x200" }],
    icons: [
      { value: "https://placehold.co/25x25" },
      { value: "https://placehold.co/25x25" },
      { value: "https://placehold.co/25x25" },
    ],
    name: "Jaden Drury",
    title: "Software Engineer",
    company: "Developer Inc.",
    phone: "555-123-4567",
    email: "jdrury@example.com",
    website: "example.com/jdrury",
    iconPosition: "right",
    iconAlignment: "center",
    includeBackground: true,
    backgroundColor: "#ffffffff",
    includeBorder: true,
    borderColor: "#000000",
    borderWidth: "1",
    fontSize: "12",
  };

  const form = useForm<FormType>({
    resolver: zodResolver(emailSignatureFormSchema),
    defaultValues: defaultFormState,
  });

  const {
    fields: iconFields,
    append: appendIcon,
    remove: deleteIcon,
  } = useFieldArray({
    control: form.control,
    name: "icons",
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: deleteImage,
  } = useFieldArray({
    control: form.control,
    name: "image",
  });

  //   Updates the parent form state on blur of each field
  function updateState() {
    setFormState(form.getValues());
  }

  useEffect(() => {
    updateState();
  }, []); // Run only once on mount

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
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
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
      </div>

      <Separator />

      {/* Icons and images Settings */}
      {/* TODO: add information section about hosting images and explain they may not render for all email clients */}
      {/* Image */}
      {imageFields.map((field, index) => (
        <Controller
          key={field.id}
          name={`image.${index}.value`}
          control={form.control}
          render={({ field }) => (
            <Field
              key={field.name} // important to include key with field's id
            >
              <span className="flex flex-row gap-4">
                <FieldLabel htmlFor={field.value}>Image {index + 1}</FieldLabel>
                <Button
                  aria-label={`Remove Image ${index + 1}`}
                  type="button"
                  variant="link"
                  size="icon"
                  onClick={() => {
                    deleteImage(index);
                    updateState();
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  <XIcon />
                </Button>
              </span>
              <Input
                {...field}
                id={field.name}
                placeholder="www.example.com/image-url"
                onBlur={() => updateState()}
              />
            </Field>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          appendImage({ value: "https://placehold.co/200x200" });
        }}
        disabled={formState?.image && formState?.image.length >= 1}
      >
        Add Image <PlusIcon />
      </Button>

      <Separator />

      {/* Icons */}
      {iconFields.map((field, index) => (
        <Controller
          key={field.id}
          name={`icons.${index}.value`}
          control={form.control}
          render={({ field }) => (
            <Field
              key={field.name} // important to include key with field's id
            >
              <span className="flex flex-row gap-4">
                <FieldLabel htmlFor={field.value}>Icon {index + 1}</FieldLabel>
                <Button
                  aria-label={`Remove Icon ${index + 1}`}
                  type="button"
                  variant="link"
                  size="icon"
                  onClick={() => {
                    deleteIcon(index);
                    updateState();
                  }}
                  className="text-red-500 cursor-pointer"
                >
                  <XIcon />
                </Button>
              </span>
              <Input
                {...field}
                id={field.name}
                placeholder="www.example.com/icon-url"
                onBlur={() => updateState()}
              />
            </Field>
          )}
        />
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          appendIcon({ value: "https://placehold.co/25x25" });
        }}
        disabled={formState?.icons && formState?.icons.length >= 5}
      >
        Add Icon <PlusIcon />
      </Button>

      <div className="flex flex-row gap-4">
        <Controller
          name="iconPosition"
          control={form.control}
          render={({ field }) => (
            <Field
              onChange={(e) => {
                field.onChange(e);
                updateState();
              }}
            >
              <FieldLabel htmlFor={field.name}>Icon Position</FieldLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  updateState();
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Icon Position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        {formState && formState.iconPosition === "bottom" && (
          <Controller
            name="iconAlignment"
            control={form.control}
            render={({ field }) => (
              <Field
                onChange={(e) => {
                  field.onChange(e);
                  updateState();
                }}
              >
                <FieldLabel htmlFor={field.name}>Icon Alignment</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    updateState();
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Icon Alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start">Start</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="end">End</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        )}
      </div>

      <Separator />

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
                  onCheckedChange={(e) => {
                    field.onChange(e);
                    updateState();
                  }}
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
              <Field data-invalid={fieldState.invalid} className="w-auto">
                <FieldLabel htmlFor={field.name}>Background Color</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="color"
                  placeholder="#ffffff"
                  onBlur={() => updateState()}
                  className="max-w-[130px] min-w-[50px]"
                />
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
                  onCheckedChange={(e) => {
                    field.onChange(e);
                    updateState();
                  }}
                />
              </div>
            </Field>
          )}
        />

        {formState && formState.includeBorder && (
          <>
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
                    className="max-w-[130px] min-w-[50px]"
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
