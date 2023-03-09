import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

 const isAuthenticated=() =>{
  const value = localStorage.getItem("token");
  if(!value){
    return false;
  }
  return true;

};

const Protected: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/");
  }, [isAuthenticated()]);

  return <>{children}</>;
};

export default Protected;