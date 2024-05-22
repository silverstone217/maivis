"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

type Props = {
  service: User;
};

const HireEmployee = ({ service }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  //   data

  const [address, setAddress] = useState("");
  //   const [phone, setPhone] = useState(user?.tel || "");
  const [description, setDescription] = useState("");
  const [reservationDate, setReservationDate] = useState("");

  if (!service || !service.jobber || !user) {
    return null;
  }

  const jobber = service.jobber;

  const handleSubmit = async () => {
    const formData = {
      description,
      address,
      //   phone,
      reservationDate: new Date(reservationDate),
      jobberId: jobber.id,
      userId: user.id,
      fees: jobber.salary,
    };

    try {
      setLoading(true);

      const response = await fetch("/api/reservation/add", {
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
      setDescription("");
      setAddress("");
      setReservationDate("");

      setTimeout(() => setLoading(false), 1500);
      setTimeout(() => router.refresh, 800);
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="box-border px-4 py-3 rounded shadow-sm border-[0.5px] flex gap-1
         items-center justify-center"
        >
          <UserPlus className="size-5" />
          <div className="flex flex-wrap box-border gap-1 ">
            <span className="font-semibold capitalize line-clamp-1 text-center">
              Engager
            </span>
            {/* <span>/</span> */}
            <span className="text-sm opacity-85"></span>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Engager cet employee</AlertDialogTitle>
          <div>
            <div className="space-x-2 capitalize">
              <span className="text-sm opacity-85">noms:</span>
              <span className="text-sm font-medium capitalize">
                {service.name}
              </span>
            </div>
            <div className="space-x-2 capitalize">
              <span className="text-sm opacity-85">poste:</span>
              <span className="text-sm text-primary font-medium capitalize">
                {jobber.job}
              </span>
            </div>
          </div>
          <AlertDialogDescription>
            Remplire correctement tous les champs ci-dessous avant de continuer
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* forms */}

        <form className="w-full flex flex-col items-center justify-start gap-4">
          <div className="grid w-full max-w-xl items-center gap-1.5">
            <Label htmlFor="address">Adresse ou lieu de travail</Label>
            <Input
              type="text"
              id="address"
              placeholder="Avenue Nu Commune Ville"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              minLength={5}
              maxLength={100}
              required
              disabled={loading}
              autoCapitalize="off"
            />
          </div>

          {/* phone */}
          {/* <div className="grid w-full max-w-xl items-center gap-1.5">
            <Label htmlFor="phone" className="">
              Téléphone
            </Label>
            <Input
              type="number"
              id="phone"
              placeholder="999888777"
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
              minLength={9}
              maxLength={9}
              required
              disabled={loading}
            />
          </div> */}

          {/* desc */}
          <div className="grid w-full gap-1.5 box-border">
            <Label htmlFor="description">Description</Label>
            <Textarea
              placeholder="Parlez du probleme et de de ce que vous souhaitez et autres exigences etc."
              id="description"
              required={true}
              disabled={loading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
              maxLength={500}
              className="h-32"
            />
          </div>

          {/* phone */}
          <div className="grid w-full max-w-xl items-center gap-1.5">
            <Label htmlFor="date" className="">
              Date du debut ou reservation
            </Label>
            <Input
              type="datetime-local"
              id="date"
              placeholder="999888777"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              minLength={9}
              maxLength={9}
              required
              disabled={loading}
            />
          </div>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"outline"} type="button" disabled={loading}>
              Annuler
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              type="button"
              variant={"default"}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              disabled={
                loading ||
                address.replace(/ /g, "") === "" ||
                // phone.replace(/ /g, "") === "" ||
                description.replace(/ /g, "") === "" ||
                reservationDate.replace(/ /g, "") === ""
              }
            >
              {loading ? "en cours..." : "Engager"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HireEmployee;
