import { useEffect, useState } from "react";
import { Article, getArticles } from "../../services/artiicles.services";
import { Link } from "react-router-dom";

const PostList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticles();

        setArticles(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">PostList</h1>

      <ul className="flex justify-between gap-4 flex-col items-center mt-4  ">
        {articles.length === 0 ? (
          <li>No articles available</li>
        ) : (
          articles.map((article: Article) => (
            <li
              key={article.id}
              className="flex  justify-center items-start align-middle bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md"
            >
              <Link to={`/post/${article.id}`}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
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
export default PostList;
