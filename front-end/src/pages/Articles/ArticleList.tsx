import { Link, useLoaderData } from "react-router-dom";
import { ArticleType } from "../../services/dto";
import CreateArticle from "./CreateArticle";
import useUser from "../../hooks/useUser";

const ArticleList = () => {
  const posts = useLoaderData() as ArticleType[];
  const { user } = useUser();

  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">PostList</h1>

      {!user && (
        <p className="text-gray-600 mt-4">
          Please{" "}
          <Link to="/login" className="text-blue-500 underline">
            log in
          </Link>{" "}
          to create a post.
        </p>
      )}

      {user && (!posts || posts.length === 0) && (
        <div className="text-center mt-4">
          <p className="text-gray-600">No posts available.</p>
          <CreateArticle />
        </div>
      )}

      <ul className="flex justify-between gap-4 flex-col items-center mt-4 w-full">
        {posts && posts.length > 0
          ? posts.map((article: ArticleType) => (
              <li
                key={article.id}
                className="flex justify-center items-start align-middle bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md"
              >
                <Link to={`/post/${article.title}`}>
                  <h2 className="text-lg font-bold">{article.title}</h2>
                  <p className="text-gray-700">Upvotes: {article.upvotes}</p>
                  <p className="text-sm font-light text-gray-500">
                    <span>Click here to read more</span>
                  </p>
                </Link>
              </li>
            ))
          : // Si no hay posts pero no hay usuario, no mostramos nada adicional
            !user && (
              <>
                {" "}
                <p className="text-gray-600">No posts available.</p>
              </>
            )}
      </ul>
    </section>
  );
};

export default ArticleList;
