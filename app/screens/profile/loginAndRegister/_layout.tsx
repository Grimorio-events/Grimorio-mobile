import { useState } from "react";
import LoginScreen from "./login/_layout";
import SignupScreen from "./signup/_layout";

const LoginAndRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen setIsLogin={setIsLogin} />
  ) : (
    <>
      <SignupScreen setIsLogin={setIsLogin} />
    </>
  );
};

export default LoginAndRegister;
