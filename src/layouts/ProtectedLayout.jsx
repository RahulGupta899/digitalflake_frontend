import { Navigate, Outlet} from "react-router-dom";
import { authorizationToken } from "../consts/localStorageKeyNames";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function ProtectedLayout(){
  
  const authorizationKey = window.localStorage.getItem(authorizationToken);
  if (!authorizationKey) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header/>
      <div className="flex">
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  );
}

