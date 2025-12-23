import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  EmailSignatureFormData,
  emailSignatureFormSchema,
} from "@/schemas/EmailSignatureFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, PlusIcon, XIcon } from "lucide-react";
import { useCallback, useEffect } from "react";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type EmailSignatureFormProps = {
  formState: EmailSignatureFormData | undefined;
  setFormState: (formState: EmailSignatureFormData | undefined) => void;
  setErrors: (errors: FieldErrors<FormType>) => void;
};

type FormType = z.infer<typeof emailSignatureFormSchema>;

export default function EmailSignatureForm({
  formState,
  setFormState,
  setErrors,
}: EmailSignatureFormProps) {
  const defaultFormState: FormType = {
    image: [],
    icons: [],
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    iconPosition: "right",
    iconAlignment: "center",
    includeBackground: true,
    backgroundColor: "#ffffffff",
    includeBorder: false,
    borderColor: "#000000",
    borderWidth: "1",
    fontSize: "12",
  };

  const form = useForm<FormType>({
    resolver: zodResolver(emailSignatureFormSchema),
    defaultValues: defaultFormState,
    mode: "all",
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

  const [backgroundEnabled, borderEnabled, iconPosition] = useWatch({
    control: form.control,
    name: ["includeBackground", "includeBorder", "iconPosition"],
  });

  //   Formstate is updated onBlur of each field
  // There is a bug with this
  // because onBlur event happens before this updateState, I can't leverate the isDirty properties to know if the form is valid or not
  // So I have to check the formState errors directly
  // A better way would be to have the formState updated onChange of each field, but that would be too many updates
  const updateState = useCallback(() => {
    console.log("Updating form state...");
    const hasErrors = Object.keys(form.formState.errors).length > 0;

    if (hasErrors) {
      console.log("form has errors, setting formState to undefined");
      setFormState(undefined);
    } else {
      console.log("form is valid, updating formState");
      const currentValues = form.getValues();
      console.log("currentValues:", currentValues);
      setFormState(currentValues);
    }
  }, [form, setFormState]);

  useEffect(() => {
    setErrors(form.formState.errors);
  }, [form.formState.errors, setErrors]);

  function clearForm() {
    form.reset();
    setFormState(undefined);
  }

  return (
    <form
      id="form-rhf-demo"
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                required
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="John"
                autoComplete="given-name"
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
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
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
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
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
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
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
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
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
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
                onBlur={() => {
                  field.onBlur();
                  updateState();
                }}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Separator />
      {/* Icons and images Settings */}
      {/* Image */}
      {imageFields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <Controller
            name={`image.${index}.value`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field key={field.name} data-invalid={fieldState.invalid}>
                <span className="flex flex-row gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon size={20} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[300px] ">
                        Choose a url for the primary image/logo you want to
                        display. Make sure the URL is publicly accessible to
                        help ensure email clients render it. Note, some company
                        email security settings still may block images from
                        rendering. Provide alt text that clearly conveys
                        important information you may be using the image to
                        convey. For more information writing alt text visit{" "}
                        <a
                          className="text-chart-5"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://www.w3.org/WAI/tutorials/images/"
                        >
                          w3.org
                        </a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <FieldLabel htmlFor={field.value}>
                    Image {index + 1} URL{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Button
                    aria-label={`Remove Image ${index + 1}`}
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={() => {
                      deleteImage(index);
                      updateState();
                    }}
                    className="text-destructive cursor-pointer"
                  >
                    <XIcon />
                  </Button>
                </span>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="www.example.com/image-url"
                  onBlur={() => {
                    field.onBlur();
                    updateState();
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Image Alt text */}
          <Controller
            name={`image.${index}.altText`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field key={field.name} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.value}>
                  Image {index + 1} Alt Text{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Description of the image"
                  onBlur={() => {
                    field.onBlur();
                    updateState();
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      ))}
      {/* Add Image Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          appendImage({ value: "https://placehold.co/200x200", altText: "" });
        }}
        disabled={formState?.image && formState?.image.length >= 1}
      >
        Add Image <PlusIcon />
      </Button>
      <Separator />
      {/* Icons */}
      {iconFields.map((field, index) => (
        <div key={field.id} className="space-y-2">
          <Controller
            name={`icons.${index}.value`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field key={field.name} data-invalid={fieldState.invalid}>
                <span className="flex flex-row gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon size={20} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-[300px] ">
                        Choose a url for the icon you want to display. Make sure
                        the URL is publicly accessible to help ensure email
                        clients render it. Note, some email security settings
                        may block images from rendering. Provide alt text that
                        clearly conveys important information you may be using
                        the icon to convey.For more information writing alt text
                        visit{" "}
                        <a
                          className="text-chart-5"
                          href="https://www.w3.org/WAI/tutorials/images/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          w3.org
                        </a>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <FieldLabel htmlFor={field.value}>
                    Icon {index + 1} URL{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Button
                    aria-label={`Remove Icon ${index + 1}`}
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={() => {
                      deleteIcon(index);
                      updateState();
                    }}
                    className="text-destructive cursor-pointer"
                  >
                    <XIcon />
                  </Button>
                </span>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="www.example.com/icon-url"
                  onBlur={() => {
                    field.onBlur();
                    updateState();
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Icon Alt text */}
          <Controller
            name={`icons.${index}.altText`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field key={field.name} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.value}>
                  Icon {index + 1} Alt Text{" "}
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Description of the icon"
                  onBlur={() => {
                    field.onBlur();
                    updateState();
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      ))}
      {/* Add Icon Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          appendIcon({
            value: "https://placehold.co/25x25",
            altText: "",
          });
        }}
        disabled={formState?.icons && formState?.icons.length >= 5}
      >
        Add Icon <PlusIcon />
      </Button>
      {/* Icons positions */}
      {iconFields.length > 0 && (
        <div className="flex flex-row gap-4">
          <Controller
            name="iconPosition"
            control={form.control}
            render={({ field }) => (
              <Field>
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

          {iconPosition === "bottom" && (
            <Controller
              name="iconAlignment"
              control={form.control}
              render={({ field }) => (
                <Field>
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
      )}
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
        {backgroundEnabled && (
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
                  onBlur={() => {
                    field.onBlur();
                    updateState();
                  }}
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

        {borderEnabled && (
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
                    min={1}
                    onBlur={(e) => {
                      field.onBlur();
                      if (!e.target.value) {
                        field.onChange("1");
                      }
                      if (parseInt(e.target.value) < 1) {
                        field.onChange("1");
                      }
                      updateState();
                    }}
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
                    onBlur={() => {
                      field.onBlur();
                      updateState();
                    }}
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
              min={10}
              onBlur={(e) => {
                field.onBlur();
                if (!e.target.value) {
                  field.onChange("12");
                }
                if (parseInt(e.target.value) < 10) {
                  field.onChange("10");
                }
                updateState();
              }}
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-row gap-4">
        <Button
          type="button"
          variant="outline"
          className="text-destructive"
          onClick={clearForm}
        >
          Reset Form
        </Button>
        {/* The submit button doesn't need to trigger any actions since the form handles everything onChange or onBlur. It does give users a focus to switch to if a field is set to onBlur and needs a new focus to trigger it's changes */}
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
