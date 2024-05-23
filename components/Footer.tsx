"use client";
import { usePathname } from "next/navigation";
import React from "react";
import LogoComponent from "./LogoComponent";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoLogoInstagram } from "react-icons/io";
import {
  AiOutlineFacebook,
  AiOutlineX,
  AiOutlineYoutube,
} from "react-icons/ai";

const Footer = () => {
  const pathName = usePathname();

  if (pathName.includes("sign")) return null;

  return (
    <footer className="w-full bg-secondary">
      <div
        className="w-full mx-auto max-w-7xl min-h-[85vh] md:min-h-[60vh]
         pb-2 pt-6 px-4 flex flex-col gap-6 md:gap-10 items-start justify-between 
        transition-all duration-300 ease-in-out
        "
      >
        {/* form and logo */}
        <section
          className="w-full flex flex-col items-center justify-center gap-8 md:gap-6 mt-2
        transition-all duration-300 ease-in-out
        "
        >
          <LogoComponent />

          <div className="lg:text-3xl text-2xl font-black text-balance text-center">
            <p>Ne ratez pas nos news et</p>
            <p
              className="bg-gradient-to-r from-green-700 via-green-600 
              to-green-400 inline-block text-transparent bg-clip-text "
            >
              profitez de nos meilleures offres.
            </p>
          </div>

          <div className="flex w-full max-w-xl items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">{"S'abonner"}</Button>
          </div>
        </section>

        {/* links and rules sections */}

        <section
          className="w-full grid capitalize grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 items-start justify-start gap-4  lg:place-items-center
        transition-all duration-300 ease-in-out"
        >
          <div>
            <h2 className="font-bold">Plateforme</h2>
            <div className="text-sm">
              <p>Accueil</p>
              <p>services</p>
              <p>activites</p>
              <p>notifications</p>
            </div>
          </div>

          <div>
            <h2 className="font-bold">Ressources</h2>
            <div className="text-sm">
              <p>Blog</p>
              <p>news</p>
              <p>learn With Us</p>
              <p>soutien</p>
            </div>
          </div>

          <div>
            <h2 className="font-bold">Companie</h2>
            <div className="text-sm">
              <p>Developpeurs</p>
              <p>Embauche</p>
              <p>carriere</p>
              <p>confidentialités</p>
            </div>
          </div>

          <div className="">
            <h2 className="font-bold">Suivez-nous</h2>
            <div className="text-sm flex items-center justify-start gap-1 flex-wrap">
              <AiOutlineYoutube size={30} />
              <AiOutlineFacebook size={30} />
              <IoLogoInstagram size={30} />
              <AiOutlineX size={30} />
            </div>
          </div>
        </section>

        <section className="text-center w-full text-sm transition-all duration-300 ease-in-out">
          <p className="space-x-2">
            <span>&copy; 2024</span>
            <span>All right reserved</span>
            <strong
              className="bg-gradient-to-r from-green-700 via-green-600 
              to-green-400 inline-block text-transparent bg-clip-text "
            >
              Maivis
            </strong>
            <span>inc</span>
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
