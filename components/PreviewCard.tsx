/* eslint-disable @next/next/no-img-element */
// html table structure was used with inline styles to maximize email client compatibility
import {
  encodedFacebookLogo,
  encodedGithubLogo,
  encodedInstagramLogo,
  encodedLinkedinLogo,
  encodedTwitterLogo,
} from "@/public/Phosphor_Social_Icons/EncodedPhosphorIcons";
import { EmailSignatureFormData } from "@/schemas/EmailSignatureFormSchema";

type PreviewCardProps = {
  formState: EmailSignatureFormData;
};

export default function PreviewCard({ formState }: PreviewCardProps) {
  const belowFoldContent =
    formState?.phone || formState?.email || formState?.website;

  return formState === undefined ? (
    <div className="flex items-center justify-center">
      <p className="text-gray-500">Preview will appear here</p>
    </div>
  ) : (
    <table
      id="previewCard"
      style={{
        width: "auto",
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
          <td>
            <img
              src="https://www.placecats.com/neo/300/200"
              alt="Logo"
              width={150}
              style={{ display: "block", paddingRight: "10px" }}
            />
          </td>
          <td style={{ verticalAlign: "top" }}>
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
          {/* Icons */}
          {/* More work needed to get this completely working, right now it will render on paste but not as an email signature in gmail */}
          {/* https://stackoverflow.com/questions/9110091/base64-encoded-images-in-email-signatures */}
          {formState.displaySocialMediaIcons && (
            <td style={{ verticalAlign: "center" }}>
              <table style={{ height: "100%" }}>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={encodedLinkedinLogo}
                        alt="LinkedIn Logo"
                        width={25}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={encodedInstagramLogo}
                        alt="Instagram Logo"
                        width={25}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={encodedTwitterLogo}
                        alt="Twitter Logo"
                        width={25}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={encodedFacebookLogo}
                        alt="Facebook Logo"
                        width={25}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={encodedGithubLogo}
                        alt="Github Logo"
                        width={25}
                      />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
}
