import BackgroundComponent from "@/components/auth/BackgroundComponent";
import LoginForm from "@/components/forms/LoginForm";
import LogoComponent from "@/components/LogoComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="w-full h-full  overflow-x-hidden overflow-y-auto">
      <div className="w-full max-w-7xl grid  lg:grid-cols-2 grid-cols-1 h-full mx-auto transition-all duration-300 ease-in-out">
        {/* greetings and images */}

        <section className="w-full lg:flex hidden text-white  space-y-6 tracking-wide h-full relative flex-col *:transition-all duration-300 ease-in-out">
          <div className="absolute w-full -z-10 h-full">
            <BackgroundComponent />
          </div>
          <div className="pl-4">
            <LogoComponent />
          </div>
          <div className="flex w-full items-center flex-col gap-2 z-20">
            <h1 className="text-3xl lg:text-4xl font-extrabold capitalize">
              Bienvenue sur <strong className="text-primary">Maivis</strong>
            </h1>
            <p className="text-sm lg:text-[16px] opacity-90">
              Accedes à ton compte et trouves ce dont tu recherche.
            </p>
          </div>
        </section>

        {/* forms */}
        <section className="w-full z-20 mx-auto flex flex-col items-center justify-between h-full transition-all duration-300 ease-in-out">
          <div
            className=" w-full flex 
            flex-1 flex-col items-center justify-center gap-4 py-2 relative"
          >
            <div className="xl:mt-5 lg:hidden ">
              <LogoComponent />
            </div>
            <h2 className="lg:text-2xl text-xl font-bold tracking-wide text-center text-balance lg:p-2">
              Connection au compte
            </h2>
            {/* form */}
            <LoginForm />
          </div>
          {/* footer */}
          <AuthFooter />
        </section>
      </div>
    </main>
  );
};

const AuthFooter = () => (
  <footer className="w-full text-center py-2 lg:py-4 ">
    <p className="text-xs md:text-sm">
      Copyright &copy; 2024 <strong>Maivis</strong>. Tous droits réservés.
    </p>
  </footer>
);

export default page;
