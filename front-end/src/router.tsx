import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "./pages/Articles/Post";
import PostList from "./pages/Articles/PostsList";
import { getArticleByName, getArticles } from "./services/articles.services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/posts",
        element: <PostList />,
        loader: async () => {
          const posts = await getArticles();
          console.log(posts);
          return posts;
        },
      },
      {
        path: "/post/:name",
        element: <Post />,
        loader: async ({ params }) => {
          const post = getArticleByName(params.name as string);

          return post;
        },
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
