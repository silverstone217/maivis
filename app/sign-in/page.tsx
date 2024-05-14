import BackgroundComponent from "@/components/auth/BackgroundComponent";
import LoginForm from "@/components/forms/LoginForm";
import LogoComponent from "@/components/LogoComponent";
import React from "react";

const page = () => {
  return (
    <main className="w-dvw h-dvh bg-slate-900 overflow-x-hidden overflow-y-auto">
      <div className="flex w-full relative flex-col gap-4 lg:gap-10 h-full">
        {/* design and images */}
        <section className="absolute w-full h-96 ">
          <BackgroundComponent />
        </section>

        {/* greetings */}
        <section className="w-full p-4 text-white space-y-6 tracking-wide  z-20">
          <LogoComponent />
          <div className="flex w-full items-center flex-col gap-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold capitalize">
              Bienvenue sur <strong className="text-primary">Maivis</strong>
            </h1>
            <p className="text-sm md:text-[16px] opacity-85">
              Accedes à ton compte et trouves ce dont tu recherche.
            </p>
          </div>
        </section>

        {/* forms */}
        <section className="w-full max-w-7xl z-20 mx-auto flex flex-col items-center  ">
          <div
            className="bg-slate-800 w-11/12 lg:w-3/5 flex border-[0.5px] 
        border-slate-800 shadow min-h-96 rounded flex-col items-center gap-4 py-2"
          >
            <h2 className="text-2xl font-bold tracking-wide text-center text-balance text-white p-2">
              Créer un compte
            </h2>
            {/* form */}
            <LoginForm />
          </div>
        </section>
        {/* footer */}
        <AuthFooter />
      </div>
    </main>
  );
};

const AuthFooter = () => (
  <footer className="w-full text-center py-4 text-white absolute bottom-10 z-10 left-2/4 translate-x-[-50%]">
    <p className="text-xs md:text-sm">
      Copyright &copy; 2024 <strong>Maivis</strong>. Tous droits réservés.
    </p>
  </footer>
);

export default page;
