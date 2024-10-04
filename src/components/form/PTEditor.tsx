"use client";
import envConfig from "@/src/config/envConfig";
import { handleImageUpload } from "@/src/services/ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

interface MyEditorProps {
  content: string;
  setContent: (content: string) => void; // Pass setContent function from the parent
}

export default function PTEditor({ content, setContent }: MyEditorProps) {
  const example_image_upload_handler = (
    blobInfo: any,
    progress: (percent: number) => void
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const imageUrl = await handleImageUpload(blobInfo.blob()); // Call your custom function
        if (imageUrl) {
          resolve(imageUrl); // Resolve with the Cloudinary image URL
        } else {
          reject("Image upload failed");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div>
      <Editor
        apiKey={envConfig.editorApiKey}
        value={content} // Bind content from the parent state
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Oct 17, 2024:
            "checklist",
            "mediaembed",
            "casechange",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "ai",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request: any, respondWith: any) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
          images_upload_handler: example_image_upload_handler,
        }}
        initialValue=""
      />
    </div>
  );
}
