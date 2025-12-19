"use client";
import EmailSignatureForm from "@/components/EmailSignatureForm";
import PreviewCard from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import { useState } from "react";

export default function Home() {
  const [formState, setFormState] = useState<EmailSignatureFormData>(undefined);

  return (
    <main className="flex flex-col w-full items-center m-4 ">
      <h1 className="text-4xl font-bold">Email Signature Generator</h1>
      <div className="grid grid-cols-2 gap-8 p-8">
        <EmailSignatureForm formState={formState} setFormState={setFormState} />
        <div className="flex flex-col gap-8">
          <PreviewCard formState={formState} />
          <div className="flex flex-row gap-4">
            <Button onClick={() => console.log("copy")}>Copy HTML</Button>
            <Button onClick={() => console.log("download")}>
              Download as Image
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
