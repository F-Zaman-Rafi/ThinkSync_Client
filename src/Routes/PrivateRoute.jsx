/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Pages/Shared/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p><LoadingSpinner /></p>
    }

    if (user) return children

    return <Navigate to='/sign-in' state={{ from: location }} replace={true}></Navigate>
};

export default PrivateRoute;
