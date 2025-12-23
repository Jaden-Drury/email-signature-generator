"use client";
import EmailSignatureForm from "@/components/EmailSignatureForm";
import PreviewCard from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import { useState } from "react";
import { FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export default function Home() {
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

  return (
    <main className="flex flex-col w-full items-center m-4 ">
      <h1 className="text-4xl font-bold">Email Signature Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <Card className="p-4">
          Errors: {JSON.stringify(errors)}
          <br />
          formState: {JSON.stringify(formState)}
          <EmailSignatureForm
            formState={formState}
            setFormState={setFormState}
            setErrors={setErrors}
          />
        </Card>
        <div className="flex flex-col gap-8 sticky top-4 h-auto self-start">
          <Card className="p-4 items-center">
            <PreviewCard formState={formState} />
          </Card>
          <div className="flex flex-row gap-4">
            <Button
              disabled={!formState || Object.keys(errors).length > 0}
              onClick={() => copyHTML()}
            >
              Copy HTML
            </Button>
            <Button disabled={true} onClick={() => console.log("download")}>
              {/* https://www.npmjs.com/package/html-to-image?activeTab=readme */}
              Download as Image
            </Button>
          </div>
          <p>
            Copy the HTML above by clicking the &quot;Copy HTML&quot; button or
            highlighting and copying it manually. Then paste it into your email
            or add it to your signature settings.
          </p>
        </div>
      </div>
    </main>
  );
}
