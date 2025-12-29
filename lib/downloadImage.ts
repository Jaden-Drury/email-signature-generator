import { toJpeg, toPng, toSvg } from "@jpinsonneau/html-to-image";

const fileName = "email-signature";

export function downloadPNG(ref: HTMLDivElement) {
  toPng(ref, { cacheBust: true })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function downloadJPEG(ref: HTMLDivElement) {
  try {
    const data = await toJpeg(ref, { quality: 0.95 });
    const link = document.createElement("a");
    link.download = `${fileName}.jpeg`;
    link.href = data;
    link.click();
  } catch (err) {
    console.log(err);
  }
}

function filter(node: HTMLElement) {
  return node.tagName !== "i";
}

export async function downloadSVG(ref: HTMLDivElement) {
  try {
    const data = await toSvg(ref, { filter: filter });
    const link = document.createElement("a");
    link.download = `${fileName}.svg`;
    link.href = data;
    link.click();
  } catch (err) {
    console.log(err);
  }
}
