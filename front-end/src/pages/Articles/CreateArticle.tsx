import { useState } from "react";
import { Link } from "react-router-dom";
import { createNewArticle } from "../../services/articles.services";
import useUser from "../../hooks/useUser";

const CreateArticle = () => {
  const { isLoading, user } = useUser();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");

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

    try {
      const headersAuth = await getAuthHeaders();
      await createNewArticle(title, content, headersAuth);
    } catch (error) {
      console.error("Error creating article:", error);
      setError("Error creating article. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create new Article</h1>

      {error && <p>{error}</p>}
      <input
        className="border border-gray-300 p-2 mb-4"
        type="text"
        placeholder="Email"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 mb-4"
        placeholder="Password"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded"
        type="submit"
        onClick={handleCreateArticle}
      >
        Create Account
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <Link className="text-blue-500" to="/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default CreateArticle;
