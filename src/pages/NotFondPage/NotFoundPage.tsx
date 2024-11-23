import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-slate-400 mb-4">404</h1>
      <p className="text-lg text-slate-400 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/profile"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back to Profile Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
