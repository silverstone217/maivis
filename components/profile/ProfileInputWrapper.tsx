"use client";
import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import ProfileInput from "./ProfileInput";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { User } from "next-auth";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  myProfile: User;
};

export const NameComponent = ({ myProfile }: Props) => {
  const [name, setName] = useState(myProfile.name || "");

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  if (!user) return null;

  const handleUpdateName = async () => {
    try {
      setLoading(true);

      const formData = {
        name: name,
        userId: user.id,
      };
      const response = await fetch("/api/profile/name", {
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
      router.refresh();
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
    <ProfileSection>
      <ProfileInput
        label="Nom et Prenom"
        placeholder="Nom"
        name="name"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        required
        type="text"
        loading={loading}
        onHide={undefined}
      />
      <Button
        type="button"
        variant={"secondary"}
        disabled={
          loading || myProfile.name === name || name.replace(/ /g, "") === ""
        }
        onClick={() => handleUpdateName()}
      >
        Modifier
      </Button>
    </ProfileSection>
  );
};

export const EmailComponent = ({ myProfile }: Props) => {
  const [email, setEmail] = useState(myProfile.email || "");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState<"text" | "password">(
    "password"
  );

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  if (!user) return null;

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);

      const formData = {
        email: email,
        password: password,
        userId: user.id,
      };
      const response = await fetch("/api/profile/email", {
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
      router.refresh();
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
    <ProfileSection>
      <ProfileInput
        label="Email"
        placeholder="email@example.com"
        name="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="text"
        loading={loading}
        onHide={undefined}
      />
      <ProfileInput
        label="Actuel mot de passe"
        placeholder="*******"
        name="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type={hidePassword}
        loading={loading}
        onHide={undefined}
      />
      <Button
        type="button"
        variant={"secondary"}
        disabled={
          loading ||
          myProfile.email === email ||
          email.replace(/ /g, "") === "" ||
          password.replace(/ /g, "") === ""
        }
        onClick={() => handleUpdateEmail()}
      >
        Modifier
      </Button>
    </ProfileSection>
  );
};

export const PasswordComponent = ({ myProfile }: Props) => {
  const [NPassword, setNPassword] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState<"text" | "password">(
    "password"
  );
  const [hideNPassword, setHideNPassword] = useState<"text" | "password">(
    "password"
  );

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  if (!user) return null;

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);

      const formData = {
        nPassword: NPassword,
        password: password,
        userId: user.id,
      };
      const response = await fetch("/api/profile/password", {
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
      router.refresh();
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
    <ProfileSection>
      <ProfileInput
        label="Actuel mot de passe"
        placeholder="*******"
        name="aPassword"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type={hidePassword}
        loading={loading}
        onHide={() => {
          hidePassword === "text"
            ? setHidePassword("password")
            : setHidePassword("text");
        }}
      />
      <ProfileInput
        label="Nouveau mot de passe"
        placeholder="*******"
        name="nPassword"
        defaultValue={NPassword}
        onChange={(e) => setNPassword(e.target.value)}
        required
        type={hideNPassword}
        loading={loading}
        onHide={() => {
          hideNPassword === "text"
            ? setHideNPassword("password")
            : setHideNPassword("text");
        }}
      />
      <Button
        type="button"
        variant={"secondary"}
        disabled={
          loading ||
          NPassword.replace(/ /g, "") === "" ||
          password.replace(/ /g, "") === "" ||
          NPassword === password
        }
        onClick={() => handleUpdatePassword()}
      >
        Modifier
      </Button>
    </ProfileSection>
  );
};
