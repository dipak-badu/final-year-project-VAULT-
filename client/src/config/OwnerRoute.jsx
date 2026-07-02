import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../component/context/useAuth";

export default function OwnerRoute({ children }) {
  const { authUser, token, authLoading } = useAuth();
  const { userId } = useParams();

  const authId = authUser?._id || authUser?.id;

  if (authLoading) return <p>Loading...</p>;
  if (!token || !authUser) return <Navigate to="/login" replace />;
  if (!authId) return <Navigate to="/login" replace />;

  if (String(authId) !== String(userId)) {
    return <Navigate to={`/user/${authId}`} replace />;
  }

  return children;
}
