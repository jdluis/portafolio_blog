import { useState } from "react";

interface AddCommentFormProps {
  onAddComment: (nameText: string, commentText: string) => Promise<void>;
}

const AddCommentForm = ({ onAddComment }: AddCommentFormProps) => {
  const [nameText, setNameText] = useState("");
  const [commentText, setCommentText] = useState("");
  return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">
        Add a Comment
      </h3>
      <label className="mb-2" htmlFor="">
        Name:
        <input
          className="border-2 border-gray-300 rounded p-2 mb-4"
          type="text"
          value={nameText}
          onChange={(e) => setNameText(e.target.value)}
        />
      </label>
      <label className="mb-2" htmlFor="">
        Comment:
        <input
          className="border-2 border-gray-300 rounded p-2 mb-4"
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        onClick={() => onAddComment(nameText, commentText)}
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddCommentForm;
