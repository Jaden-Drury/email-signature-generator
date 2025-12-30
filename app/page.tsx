"use client";
import EmailSignatureForm from "@/components/EmailSignatureForm";
import PreviewCard from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { downloadJPEG, downloadPNG, downloadSVG } from "@/lib/downloadImage";
import { type EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import { useCallback, useRef, useState } from "react";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export default function Home() {
  enum FileType {
    PNG = "png",
    JPEG = "jpeg",
    SVG = "svg",
  }

  const [formState, setFormState] = useState<
    EmailSignatureFormData | undefined
  >(undefined);
  const [errors, setErrors] = useState<FieldErrors<EmailSignatureFormData>>({});

  async function copyHTML() {
    const previewHTML = document.getElementById("previewCard") as HTMLElement;
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([previewHTML.innerText], { type: "text/plain" }),
      "text/html": new Blob([previewHTML.outerHTML], { type: "text/html" }),
    });

    navigator.clipboard.write([clipboardItem]);
    toast.success("HTML copied to clipboard!");
  }

  const ref = useRef<HTMLDivElement>(null);
  const [fileType, setFileType] = useState<FileType>(FileType.PNG);

  const downloadImage = useCallback(
    (fileType: FileType) => {
      if (ref.current === null) {
        console.log("ref is null");
        return;
      }

      if (fileType === FileType.PNG) {
        downloadPNG(ref.current);
      }

      if (fileType === FileType.JPEG) {
        downloadJPEG(ref.current);
      }

      if (fileType === FileType.SVG) {
        downloadSVG(ref.current);
      }
    },
    [ref, FileType]
  );

  return (
    <main className="flex flex-col px-12 pb-4 gap-4 w-full ">
      <h1 className="sm:text-3xl lg:text-4xl font-bold">
        Email Signature Generator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4">
          <EmailSignatureForm
            formState={formState}
            setFormState={setFormState}
            setErrors={setErrors}
          />
        </Card>
        <div className="flex flex-col gap-8 sticky top-4 h-auto self-start">
          <Card className="p-4 items-center">
            <div ref={ref}>
              <PreviewCard formState={formState} />
            </div>
          </Card>
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              disabled={!formState || Object.keys(errors).length > 0}
              onClick={() => copyHTML()}
            >
              Copy HTML
            </Button>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                variant="outline"
                disabled={!formState || Object.keys(errors).length > 0}
                onClick={() => downloadImage(fileType)}
              >
                {/* https://www.npmjs.com/package/html-to-image?activeTab=readme */}
                {/* https://www.npmjs.com/package/@jpinsonneau/html-to-image package was used instead due to the maintainer of the previous packages no longer being around. */}
                {/* https://github.com/bubkoo/html-to-image/pull/547 */}
                Download
              </Button>
              <Select
                defaultValue={fileType}
                onValueChange={(e) => setFileType(e as FileType)}
              >
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FileType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              Fill out the form on the left to customize your email signature.
            </p>
            <p>
              Copy the HTML above by clicking the &quot;Copy HTML&quot; button
              or highlighting and copying it manually. Then paste it into your
              email or add it to your signature settings. For accessibility
              purposes it is recommended you use the HTML option for your email
              signature if possible. This will allow screen readers and other
              assistive technologies to properly interpret and navigate your
              signature content. Companies that have their email services set to
              block images by default will also be able to parse the content
              without users having to manually allow images.
            </p>
            <p>
              Alternatively download your signature as an image using the file
              type dropdown and download button.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
