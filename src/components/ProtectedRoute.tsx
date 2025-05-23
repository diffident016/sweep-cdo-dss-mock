
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: JSX.Element;
  requiredModule?: string;
};

const ProtectedRoute = ({ children, requiredModule }: ProtectedRouteProps) => {
  const { isAuthenticated, hasAccess, getModuleByRoute } = useAuth();
  const location = useLocation();

  // First check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific module access is required, check if the user has access
  if (requiredModule && !hasAccess(requiredModule)) {
    // Get the current module from the route
    const currentPath = location.pathname;
    const currentModule = getModuleByRoute(currentPath);
    
    console.log(`Access denied: User does not have access to ${requiredModule}`);
    
    // Redirect to dashboard as fallback
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
