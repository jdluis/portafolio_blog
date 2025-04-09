import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article, getArticleById } from "../../services/artiicles.services";

const Post = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) {
          throw new Error("Article ID is undefined");
        }
        const response = await getArticleById(id);
        if (!response) {
          throw new Error("Error fetching article");
        }

        setArticle(response);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <p className="text-xl">{article.description}</p>
    </section>
  );
};
export default Post;
