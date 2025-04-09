import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Post from "./pages/Articles/Post";
import PostList from "./pages/Articles/PostsList";



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
            },
            {
                path: "/post/:id",
                element: <Post />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;