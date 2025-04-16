import { useLoaderData, useParams } from "react-router-dom";
import CommentsList from "../../components/CommentsList";
import { ArticleType, commentType } from "../../services/dto";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import AddCommentForm from "../../components/AddCommentForm";
import {
  upvoteArticle,
  addCommentToArticle,
} from "../../services/articles.services";

const Article = () => {
  const { name } = useParams();
  const { isLoading, user } = useUser();

  const { comments: initialComments, upvotes: initialUpvotes }: ArticleType =
    useLoaderData();
  const [upvotes, setUpvotes] = useState<number>(initialUpvotes);
  const [comments, setComments] = useState<commentType[]>(initialComments);

  const getAuthHeaders = async () => {
    const token = user && (await user.getIdToken());
    return token ? { 
      headers: { 
        'authtoken': token,
        'Content-Type': 'application/json' 
      } 
    } : {};
  };

  const onUpvoteClicked = async () => {
    try {
      if (!name) return;
      const headersAuth = await getAuthHeaders();
      const updatedUpvotes = await upvoteArticle(name, headersAuth);
      setUpvotes(updatedUpvotes);
    } catch (error) {
      console.error("Error upvoting article:", error);
    }
  };

  const onAddComment = async (nameText: string, commentText: string) => {
    try {
      if (!name) return;
      const headersAuth = await getAuthHeaders();
      const updatedComments = await addCommentToArticle(
        name,
        nameText,
        commentText,
        headersAuth
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-xl">{upvotes}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        onClick={onUpvoteClicked}
      >
        Upvote
      </button>
      {user ? (
        <AddCommentForm onAddComment={onAddComment} />
      ) : (
        <p>Log In to add a comment</p>
      )}

      <CommentsList comments={comments} />
    </section>
  );
};

export default Article;
