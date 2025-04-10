import { useLoaderData } from "react-router-dom";
import { Article } from "../../services/articles.services";

const Post = () => {
  const  article: Article  = useLoaderData();
  console.log(article);
  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex flex-col justify-center items-center mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold">{article.name}</h1>
      <p className="text-xl">{article.upvotes}</p>
    </section>
  );
};
export default Post;
