import BackgroundComponent from "@/components/auth/BackgroundComponent";
import SignUpForm from "@/components/forms/SignUpForm";
import LogoComponent from "@/components/LogoComponent";
import React from "react";

const page = () => {
  return (
    <main className="w-dvw h-dvh overflow-hidden">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 grid-cols-1 h-full mx-auto transition-all duration-300 ease-in-out">
        {/* design and images */}
        {/* <section className="absolute w-full h-96 ">
          <BackgroundComponent />
        </section> */}

        {/* greetings */}
        <section className="w-full lg:flex hidden text-white space-y-6 tracking-wide h-full relative flex-col *:transition-all duration-300 ease-in-out">
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
        <section className="w-full z-20 mx-auto flex flex-col items-center h-full transition-all duration-300 ease-in-out">
          <div
            className=" w-full flex border-[0.5px] 
            h-full flex-col items-center gap-4 py-2 relative"
          >
            <div className="lg:mt-5 lg:hidden ">
              <LogoComponent />
            </div>
            <h2 className="text-2xl font-bold tracking-wide text-center text-balance  p-2">
              Créer un compte
            </h2>
            {/* form */}
            <SignUpForm />

            {/* footer */}
            <AuthFooter />
          </div>
        </section>
      </div>
    </main>
  );
};
const AuthFooter = () => (
  <footer className="w-full text-center py-2 lg:py-4 absolute bottom-2 lg:bottom-10 z-10 left-2/4 translate-x-[-50%]">
    <p className="text-xs md:text-sm">
      Copyright &copy; 2024 <strong>Maivis</strong>. Tous droits réservés.
    </p>
  </footer>
);
export default page;
