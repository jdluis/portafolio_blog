import { Link, useLoaderData } from "react-router-dom";
import { ArticleType } from "../../services/dto";

const ArticleList = () => {
  const posts = useLoaderData();
  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">PostList</h1>

      <ul className="flex justify-between gap-4 flex-col items-center mt-4  ">
        {!posts ? (
          <li>No posts available</li>
        ) : (
          posts.map((article: ArticleType) => (
            <li
              key={article.id}
              className="flex  justify-center items-start align-middle bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md"
            >
              <Link to={`/post/${article.name}`}>
                <h2>{article.name}</h2>
                <p>{article.upvotes}</p>

                <p className="text-sm font-light text-gray-500">
                  <span>Click here to read more</span>
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};
export default ArticleList;
