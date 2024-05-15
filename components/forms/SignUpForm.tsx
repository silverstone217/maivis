"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectOptions from "../SelectOptions";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const options = [
  {
    title: "Je suis venu engager",
    value: "user",
  },
  {
    title: "Je suis pour travailler",
    value: "jobber",
  },
];
const label = "role";
const placeholder = "choisies ta situation...";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [isSecure, setIsSecure] = useState<"password" | "text">("password");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = {
      email,
      password,
      name,
      phone,
      role,
    };

    try {
      setLoading(true);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.error === true) {
        toast({
          description: data.message,
          variant: "destructive",
          duration: 2000,
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }
      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
      });
      setTimeout(() => setLoading(false), 1500);
      setTimeout(() => router.push("/sign-in"), 1000);
    } catch (error) {
      const err = error as Error;
      const message = err.message;
      toast({
        description: message,
        variant: "destructive",
        duration: 2000,
      });
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full flex flex-col items-center gap-6 px-4"
    >
      {/* names */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="name" className="">
          Nom et Prenom
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Makese Sebastian"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={5}
          maxLength={40}
          required
          disabled={loading}
        />
      </div>

      {/* email */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="email" className="">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={5}
          maxLength={40}
          required
          disabled={loading}
        />
      </div>

      {/* phone */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="email" className="">
          Téléphone
        </Label>
        <Input
          type="text"
          id="phone"
          placeholder="999888777"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          minLength={9}
          maxLength={9}
          required
          disabled={loading}
        />
      </div>

      {/* role */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <SelectOptions
          options={options}
          value={role}
          onChange={(value) => setRole(value)}
          label={label}
          placeholder={placeholder}
          loading={loading}
          setLoading={setLoading}
          required={true}
        />
      </div>

      {/* password */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <div className="flex w-full items-center justify-between">
          <Label htmlFor="password" className="">
            Mot de passe
          </Label>

          {isSecure === "password" ? (
            <EyeOff
              className="cursor-pointer size-5"
              onClick={() => setIsSecure("text")}
            />
          ) : (
            <Eye
              className="cursor-pointer size-5"
              onClick={() => setIsSecure("password")}
            />
          )}
        </div>
        <Input
          type={isSecure}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={5}
          maxLength={40}
          required
          disabled={loading}
        />
      </div>

      {/* submit */}
      <Button
        type="submit"
        disabled={loading}
        className="grid w-full max-w-xl items-center gap-1.5"
      >
        {loading ? "en cours..." : "Continuer"}
      </Button>

      <Link href={"/sign-in"} className="text-sm">
        <span>Vous avez deja un compte?</span> <strong>Connectez-vous</strong>
      </Link>
    </form>
  );
};

export default SignUpForm;
