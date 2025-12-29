/* eslint-disable @next/next/no-img-element */
// html table structure was used with inline styles to maximize email client compatibility
import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";
import IconRow from "./IconRow";

type PreviewCardProps = {
  formState: EmailSignatureFormData | undefined;
};

export default function PreviewCard({ formState }: PreviewCardProps) {
  const belowFoldContent =
    formState?.phone || formState?.email || formState?.website;

  return formState === undefined ? (
    <div className="flex items-center justify-center">
      <p className="text-gray-500">
        Preview will appear here once form is valid
      </p>
    </div>
  ) : (
    <table
      id="previewCard"
      style={{
        width: "fit-content",
        borderCollapse: "separate",
        borderSpacing: "8px",
        backgroundColor: formState?.includeBackground
          ? `${formState.backgroundColor}`
          : "",
        border: formState?.includeBorder
          ? `${formState.borderWidth}px solid ${formState.borderColor}`
          : "",
        fontSize: `${formState.fontSize ?? "12"}px`,
      }}
    >
      <tbody>
        <tr>
          {/* Image */}
          {formState.image.length > 0 && (
            <td>
              <div>
                {formState.image.map((image, index) => (
                  <img
                    key={`image_${index}`}
                    src={image.value}
                    alt="Logo"
                    style={{
                      maxWidth: "120px",
                      maxHeight: "120px",
                      height: "auto",
                      width: "auto",
                    }}
                  />
                ))}
              </div>
            </td>
          )}
          <td>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td>
                    <p style={{ fontWeight: "bold", margin: "0" }}>
                      {formState?.name}
                    </p>
                    <p
                      style={{
                        fontWeight: "300",
                        margin: "0",
                        fontSize: `${(formState?.fontSize
                          ? parseInt(formState.fontSize) - 2
                          : 10
                        ).toString()}px`,
                      }}
                    >
                      {formState?.title}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        margin: "0",
                        fontSize: `${(formState?.fontSize
                          ? parseInt(formState.fontSize) - 2
                          : 10
                        ).toString()}px`,
                      }}
                    >
                      {formState?.company}
                    </p>
                  </td>
                </tr>
                {belowFoldContent && (
                  <tr>
                    <td>
                      <hr
                        style={{
                          border: "0",
                          borderTop: "1px solid #000",
                          margin: "4px 0",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {formState.phone && (
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: "0",
                        }}
                      >
                        {formState.phone}
                      </p>
                    </td>
                  </tr>
                )}
                {formState.email && (
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: "0",
                        }}
                      >
                        {formState.email}
                      </p>
                    </td>
                  </tr>
                )}
                {formState.website && (
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: "0",
                        }}
                      >
                        {formState.website}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
          {/* Icons Right*/}
          {formState.icons.length > 0 && formState.iconPosition === "right" && (
            <td>
              <IconRow formState={formState} />
            </td>
          )}
        </tr>
        {/* Icons Bottom*/}
        {formState.icons.length > 0 && formState.iconPosition === "bottom" && (
          <tr>
            <td colSpan={2}>
              <IconRow formState={formState} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
