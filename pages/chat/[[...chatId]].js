import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Chat() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  if (status === "loading") {
    return (
      <>
        <div className="bg-gray-800 h-screen w-screen fixed top-0 flex flex-col justify-center items-center">
          <img
            src="/Dual Ring-1s-200px.svg"
            className="h-16"
            alt="Italian Trulli"
          ></img>
        </div>
      </>
    );
  }

  if (!session) {
    signIn();
    return null;
  }
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b-2 border-gray-100 border-dashed bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-2 py-3">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="flex space-x-3">
              <div className="text-3xl p-1 pt-2">🔒</div>
              <span className="text-2xl font-mono font-semibold pt-3 text-white">
                Next-Auth
              </span>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gray-800 text-center">
          <div className="bg-white md:py-14 py-10 md:px-8 px-3 rounded-md">
            {/* <div className="text-4xl flex justify-center"><img
          src={session.user.image}
          alt="Profile Picture"
          className="w-24 rounded-full"
        /></div> */}
            <h1 className="md:text-4xl text-3xl font-medium">
              {session.user.name}
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Welcome to Next-Auth Login Demo
            </p>
            <div className="flex flex-col space-y-4 p-2 mt-5">
              <button className="group h-12 px-6 border-2 border-gray-300 rounded-xl transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                <div className="relative flex items-center space-x-4 justify-center">
                  <div className="text-lg">✉️</div>

                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                    {session.user.email}
                  </span>
                </div>
              </button>
              <button
                className="group h-12 px-6 border-2 border-gray-400 rounded-xl transition duration-300 bg-red-400 hover:border-gray-700 text-white"
                onClick={handleSignOut}
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 sm:text-base">
                    Log out
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
