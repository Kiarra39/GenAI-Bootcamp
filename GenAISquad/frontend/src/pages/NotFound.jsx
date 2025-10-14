import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
        >
          ← Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
