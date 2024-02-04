import LoginScreen from "../../../login/_layout";
import SignupScreen from "../../../signup/_layout";
import { useState } from "react";

const LoginAndRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen setIsLogin={setIsLogin} />
  ) : (
    <SignupScreen setIsLogin={setIsLogin} />
  );
};

export default LoginAndRegister;
