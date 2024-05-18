"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { v4 } from "uuid";
import { storage } from "@/lib/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const ChangeProfilePicture = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  if (!user) return null;

  const handleUploadImage = async () => {
    if (!image) return;
    try {
      setLoading(true);

      let urlImg = "";
      const IdImg = v4().toString().replace(/-/g, "");
      const currRef = user.image ? user.image : `/maivis/images/${IdImg}`;
      const imageRef = ref(storage, currRef);

      await uploadBytes(imageRef, image).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          urlImg = downloadURL;
          // user.image = downloadURL;
        });
      });

      const formData = {
        image: urlImg,
        userId: user.id,
      };

      const response = await fetch("/api/profile/image", {
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

        await deleteObject(imageRef);

        setTimeout(() => setLoading(false), 1500);
        return;
      }

      setImage(null);

      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
      });
      if (!user?.image) {
        toast({
          description: "Reconnectez-vous pour appliquer la modification...",
          variant: "default",
          duration: 2000,
        });

        setTimeout(async () => {
          await signOut({
            redirect: true,
            callbackUrl: "/sign-in",
          });
        }, 1500);
      }

      setTimeout(() => setLoading(false), 1500);
      setImage(null);
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"}>Modifier</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Changer votre photo de profile</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="w-full flex items-center justify-center flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const prevImg = e.target.files;
              if (prevImg) {
                setImage(prevImg[0]);
              }
            }}
            placeholder="Choisissez une image..."
            className="p-2 border-[0.5px]"
            disabled={loading}
          />
          {image && (
            <div className="w-full flex items-center justify-center flex-col gap-2">
              <Image
                src={URL.createObjectURL(image)}
                alt="pp"
                width={2000}
                height={2000}
                priority
                className="w-28 h-36 object-cover border shadow-sm"
              />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => setImage(null)}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={image === null || loading}
            onClick={() => handleUploadImage()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeProfilePicture;
