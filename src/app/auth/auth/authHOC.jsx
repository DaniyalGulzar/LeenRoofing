import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (!session) signIn(); // Redirect to sign-in if not authenticated
    }, [session, status]);

    if (status === "loading") {
      return <div>Loading...</div>; // Display a loading state while checking authentication
    }
    if (!session) {
      return null; // Don't render anything if not authenticated 
    }
    return <Component {...props} />; // Render the child component if authenticated
  };
}
