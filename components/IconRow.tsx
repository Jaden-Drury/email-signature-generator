import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";

/* eslint-disable @next/next/no-img-element */
export default function IconRow({
  formState,
}: {
  formState: EmailSignatureFormData;
}) {
  return (
    <table style={{ height: "100%", width: "100%" }}>
      <tbody
        style={{
          display: "flex",
          flexDirection: formState?.iconPosition === "right" ? "column" : "row",
          justifyContent: formState?.iconAlignment,
        }}
      >
        {formState &&
          formState.icons.map((icon, index) => (
            <tr key={`icon_${index}`}>
              <td>
                <img
                  src={icon.value}
                  alt="Logo"
                  style={{
                    width: "25px",
                    marginTop:
                      formState?.iconPosition === "right" ? "4px" : "0",
                    marginBottom:
                      formState?.iconPosition === "right" ? "4px" : "0",
                    marginRight:
                      formState?.iconPosition === "bottom" ? "4px" : "0",
                    marginLeft:
                      formState?.iconPosition === "bottom" ? "4px" : "0",
                  }}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
