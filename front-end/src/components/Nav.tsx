import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Nav = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className="hover:text-blue-400 transition duration-300"
            >
              Posts
            </Link>
          </li>
        </ul>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : (
            user && (
              <span className="text-sm text-gray-300">
                Logged in as <span className="font-semibold">{user.email}</span>
              </span>
            )
          )}
          <div>
            {user ? (
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
                onClick={() => signOut(getAuth())}
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
