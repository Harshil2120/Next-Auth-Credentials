import Layout from "@/layout/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password || !cpassword) {
      setError("All fields are necessary");
      setIsLoading(false);
      return;
    }

    if (password !== cpassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const resUserExists = await fetch(
        `${process.env.NEXT_PUBLIC_MY_URL}/api/userExists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        setIsLoading(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MY_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (res.ok) {
        const form = e.target;
        form.reset();

        router.push("/auth/signin");
      } else {
        setError("User registration failed");
        setIsLoading(false);
        console.log("User registration failed");
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.log("Error during registration: ", error);
    }
  };
  return (
    <Layout>
      <p className="text-lg text-slate-300">
        Sign up to continue using Next-Auth
      </p>
      <div className="bg-white md:py-6 py-6 md:px-8 px-3 rounded-md">
        <div className="p-3 bg-white rounded-lg border-2 border-dashed">
          <h1 className="text-xl font-bold my-4">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className=" w-72 bg-stone-100 px-4 py-2 rounded-lg"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Password"
              className=" w-72 bg-stone-100 px-4 py-2 rounded-lg"
            />
            <input
              onChange={(e) => setCPassword(e.target.value)}
              type="text"
              placeholder="Confirm Password"
              className=" w-72 bg-stone-100 px-4 py-2 rounded-lg"
            />
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
                <p>Register</p>
              )}
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </form>
          <div className="flex flex-row justify-end mt-3 space-x-2 items-end text-sm">
            <p>Already have an account?</p>
            <Link className="text-sm underline" href={"/auth/signin"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
