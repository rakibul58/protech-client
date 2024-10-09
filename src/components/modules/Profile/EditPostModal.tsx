import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";
import { IPost } from "@/src/types";
import { handleImageUpload } from "@/src/services/ImageUpload";
import envConfig from "@/src/config/envConfig";
import { Button } from "@nextui-org/button";

interface EditPostModalProps {
  post: IPost;
  onSave: (data: {postId: string, payload: {content: string}}) => void;
  onClose: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  onSave,
  onClose,
}) => {
  const [content, setContent] = useState<string>(post.content || "");

  useEffect(() => {
    setContent(post.content || ""); // Initialize editor with post content
  }, [post.content]);

  const example_image_upload_handler = (
    blobInfo: any,
    progress: (percent: number) => void
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const imageUrl = await handleImageUpload(blobInfo.blob());
        if (imageUrl) {
          resolve(imageUrl); // Resolve with the uploaded image URL
        } else {
          reject("Image upload failed");
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSave = () => {
    onSave({payload: {content: content} , postId: post._id});
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-lg font-semibold mb-3">Edit Post</h2>
        <Editor
          apiKey={envConfig.editorApiKey}
          value={content} // Bind content state
          onEditorChange={(newContent) => setContent(newContent)}
          init={{
            height: "40vh",
            plugins: [
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
          initialValue={post.content} // Initial value to load on the first render
        />
        <Button className="mr-2 mt-2" onClick={handleSave}>
          Save
        </Button>
        <Button className="mt-2" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditPostModal;
