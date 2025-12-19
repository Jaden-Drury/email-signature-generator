import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import { Circle, Square, Triangle } from "lucide-react";
import Image from "next/image";

type PreviewCardProps = {
  formState: EmailSignatureFormData;
};

export default function PreviewCard({ formState }: PreviewCardProps) {
  const belowFoldContent =
    formState?.phone || formState?.email || formState?.website;

  // TODO: clean up these styles to make them safe for email clients (like inline styles)
  //   https://www.caniemail.com/features/css-display-grid/
  return formState === undefined ? (
    <div className="border p-4 rounded-md w-[400px] flex items-center justify-center">
      <p className="text-gray-500">Preview will appear here</p>
    </div>
  ) : (
    <div
      id="previewCard"
      style={{ border: "1px solid black" }}
      className="p-4 text-sm grid grid-cols-[auto_auto_auto] gap-4 "
    >
      <Image
        src="https://www.placecats.com/neo/300/200"
        alt="Logo"
        width={150}
        height={150}
        className="object-cover self-center"
      />
      <div className="flex flex-col justify-between">
        <span className="flex flex-col">
          <p className="font-semibold font-bold">
            {formState?.firstName} {formState?.lastName}
          </p>
          <p className="font-light text-xs">{formState?.title}</p>
        </span>
        <p>{formState?.company}</p>
        {belowFoldContent && (
          <hr className="border-0 border-t-[1px] w-full my-1" />
        )}
        {formState.phone && <p>{formState.phone}</p>}
        {formState.email && <p>{formState.email}</p>}
        {formState.website && <p>{formState.website}</p>}
      </div>
      <div className="flex flex-col justify-between ">
        {/* social media */}
        <Circle />
        <Square />
        <Triangle />
      </div>
    </div>
  );
}
