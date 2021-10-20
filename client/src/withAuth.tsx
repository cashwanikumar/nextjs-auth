import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "./provider/AuthProvider";

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const ProtectedRoute = (props: P) => {
    const { isAuthenticated, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }
    }, [loading, isAuthenticated]);

    return <WrappedComponent {...props} />;
  };
  return ProtectedRoute;
}
