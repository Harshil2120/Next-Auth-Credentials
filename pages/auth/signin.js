import Layout from "@/layout/layout";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Username or password");
        setIsLoading(false);
        return;
      }

      router.replace("/chat");
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.log(error);
    }
  };
  return (
    <Layout>
      <p className="text-lg text-slate-300">
        Log in with your account to continue
      </p>
      <div className="bg-white md:py-6 py-6 md:px-8 px-3 rounded-md">
        <div className="p-3 rounded-lg border-2 border-dashed ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className=" w-72 bg-stone-100 px-4 py-2 rounded-lg"
            />

            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-72 bg-stone-100 px-4 p-2 rounded-lg"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute right-3 top-1/2 w-5 -translate-y-1/2 text-stone-500 text-lg cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <button
              className={`bg-blue-500 rounded-md flex justify-center text-white font-bold cursor-pointer px-6 py-2 ${
                isloading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isloading}
            >
              {isloading ? (
                <img
                  src="/Dual Ring-1s-200px.svg"
                  className="h-8"
                  alt="Italian Trulli"
                ></img>
              ) : (
                <p>Login</p>
              )}
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </form>
          <div className="flex flex-row justify-end mt-3 space-x-2 items-end text-sm">
            <p>Don't have an account?</p>
            <Link className="text-sm underline" href={"/auth/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignInPage;
