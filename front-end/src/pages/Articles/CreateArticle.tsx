import { useState } from "react";
import { createNewArticle } from "../../services/articles.services";
import useUser from "../../hooks/useUser";

const CreateArticle = () => {
  const { isLoading, user } = useUser();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const getAuthHeaders = async () => {
    const token = user && (await user.getIdToken());
    return token
      ? {
          headers: {
            authtoken: token,
            "Content-Type": "application/json",
          },
        }
      : {};
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !content) {
      setError("Both title and content are required.");
      return;
    }

    try {
      const headersAuth = await getAuthHeaders();
      await createNewArticle(title, content, headersAuth);
      setSuccess("Article created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      setError("Error creating article. Please try again.");
      return error;
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create New Article
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
        )}

        <form onSubmit={handleCreateArticle} className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            className="border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content" className="text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            className="border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Create Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
