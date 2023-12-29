"use client";

import { useAuth } from "@/context/auth";
import { loginValidation } from "@/utils/validation";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";

export const LoginForm = () => {
  const { handleAuth } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { confirmPassword, password, email } = form;
    await loginValidation
      .validate({ email, password, confirmPassword, isSignUp })
      .then(() => {
        setError([]);
        handleAuth();
      })
      .catch((r) => setError(r.errors));
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));
  };
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
  };
  const handleSignUpChange: MouseEventHandler<HTMLButtonElement>  = (e) => {
    e.preventDefault();
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
    })
    setIsSignUp((prev) => !prev);
  };

  return (
    <form className="p-12 md:p-24" onSubmit={handleSubmit}>
      {!!error.length && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>
            <strong className="font-bold">Error!</strong>
          </p>
          <p className="block sm:inline">{error.map((v) => v)}</p>
        </div>
      )}
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
        </svg>
        <input
          type="text"
          id="username"
          value={form.email}
          onChange={handleEmailChange}
          className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
          placeholder="Username"
        />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
        </svg>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={handlePasswordChange}
          className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
          placeholder="Password"
        />
      </div>
      {isSignUp && (
        <div className="flex items-center text-lg mb-6 md:mb-8">
          <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
            <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
          </svg>
          <input
            type="password"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
            placeholder="Confirm Password"
          />
        </div>
      )}
      <button
        onClick={handleSignUpChange}
        className="mr-6 font-semibold text-[15px] border-none outline-none text-[#007bff] hover:underlin"
      >
        {!isSignUp ? "Don't have an account? Create new one" : "Already have account? Sign in using exising one"}
      </button>
      <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">
        {isSignUp ? 'Sign up' : 'Login'}
      </button>
    </form>
  );
};
