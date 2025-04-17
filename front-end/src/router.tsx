import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "./pages/Articles/Article";
import PostList from "./pages/Articles/ArticleList";
import { getArticleByName, getArticles } from "./services/articles.services";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

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
  {
    path: "/login",
   element: <Login />,
 },
 {
    path: "/register",
   element: <CreateAccount />,
 },
]);

export default router;
