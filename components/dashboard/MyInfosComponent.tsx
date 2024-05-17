import { Jobber } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import { IndexTabValue } from "./MainDashBoardComp";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import NewProfile from "./NewProfile";
import MyUpdateProfileComp from "./MyUpdateProfileComp";

type Props = {
  myJob: Jobber | null;
  setIndexTab: React.Dispatch<React.SetStateAction<IndexTabValue>>;
};

const MyInfosComponent = ({ myJob, setIndexTab }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  //   forms variables
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  //   const [image, setImage] = useState<File | null>(null);
  const [typeSalary, setTypeSalary] = useState("");
  const [paimentOption, setPaimentOption] = useState("");
  const [paimentMoment, setPaimentMoment] = useState("");
  const [transportFees, setTransportFees] = useState("");

  if (!user) return null;

  //   get images
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages = Array.from(files);

      const totalImages = images
        ? images.length + newImages.length
        : newImages.length;

      if (totalImages > 4) {
        toast({
          title: "Uh! Une erreur est survenue!",
          description: "Impossible d'ajouter plus de 4 images.",
          variant: "destructive",
        });
        return;
      }

      const filteredNewImages = newImages.filter(
        (file) => file.type !== "image/gif"
      );

      if (images !== null) {
        const imgs = images;
        setImages([...imgs, ...filteredNewImages]);
        return;
      }
      setImages(filteredNewImages);
    }
  };

  if (!myJob) {
    return <NewProfile />;
  }

  return (
    <div>
      <MyUpdateProfileComp myJob={myJob} setIndexTab={setIndexTab} />
    </div>
  );
};

export default MyInfosComponent;
