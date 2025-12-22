"use client";
import EmailSignatureForm from "@/components/EmailSignatureForm";
import PreviewCard from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formState, setFormState] = useState<EmailSignatureFormData>(undefined);

  async function copyHTML() {
    // https://www.nikouusitalo.com/blog/why-isnt-clipboard-write-copying-my-richtext-html/
    // CSS variables won't work with the CSS clipboard API it seems. So I'll have to get and render them manually in this function if I want to keep using them.
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
      <div className="grid grid-cols-2 gap-8 p-8">
        <EmailSignatureForm formState={formState} setFormState={setFormState} />
        <div className="flex flex-col gap-8">
          <Card className="p-4">
            <PreviewCard formState={formState} />
          </Card>
          <div className="flex flex-row gap-4">
            <Button disabled={!formState} onClick={() => copyHTML()}>
              Copy HTML
            </Button>
            <Button disabled={true} onClick={() => console.log("download")}>
              {/* https://www.npmjs.com/package/html-to-image?activeTab=readme */}
              Download as Image
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
