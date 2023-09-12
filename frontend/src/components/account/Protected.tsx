import { Navigate, Outlet } from "react-router-dom";

const Protected = ({allowedRoles}:any) => { // Role-Based Access Control, allowedRoles params sent from App, depending on child page
  const type = localStorage.getItem("type");

  if (type === null || type.length === 0) { // If the user never logged in, so there's no type in localStorage
    return (
    <>
    <Navigate to="/unauthorized"/>
    </>
    )
  }

  return allowedRoles.includes(type) ? ( // If the user logged in, there is a user type that can be checked and led to correct page
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  )
};

export default Protected;