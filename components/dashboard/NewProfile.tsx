import React, { ChangeEvent, useState } from "react";
import { IndexTabValue } from "./MainDashBoardComp";
import { useSession } from "next-auth/react";
import {
  jobOptions as options,
  salaryTypeData,
  paimentOptionData,
  paimentMomentData,
} from "@/utils/data";
import SelectOptions from "../SelectOptions";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { Info, X } from "lucide-react";
import { Button } from "../ui/button";
import { v4 } from "uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const NewProfile = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  const router = useRouter();

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
  const [transportFees, setTransportFees] = useState("0");

  if (!user) return null;

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

  //   upload images tp firebase
  const handleUploadImagesCompany = async () => {
    try {
      if (!user || images.length < 1) {
        return;
      }

      let urls: string[] = [];
      const allImages = [...images];
      const promises: Promise<void>[] = [];

      if (allImages.length > 0) {
        for (let i = 0; i < allImages.length; i++) {
          const imageId = v4().toString().replaceAll("-", "");
          const imgStorageRef = ref(storage, `/maivis/images/${imageId}`);

          const uploadTask = uploadBytesResumable(imgStorageRef, allImages[i]);

          // Handle upload
          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log({ image: i, progress: progress });
              },
              (err) => {
                console.log("Upload error: " + err.message);
                setTimeout(() => setLoading(false), 1000);
                reject(err);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  // console.log("File available at", downloadURL);
                  urls.push(downloadURL);
                  resolve();
                });
              }
            );
          });
        }
        await Promise.all(promises);
        console.log({ data: urls, size: urls.length });

        return urls;
      }
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      setTimeout(() => setLoading(false), 1000);
    }
  };

  //   submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      let intSalary = parseInt(salary);
      let intTransportFees = parseInt(transportFees);

      if (typeof intSalary !== "number") {
        toast({
          title: "Oh! Une erreur s'est produite!",
          description: "Le salaire doit être un nombre.",
          variant: "destructive",
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }

      if (typeof intTransportFees !== "number") {
        toast({
          title: "Oh! Une erreur s'est produite!",
          description: "Les frais de transport doivent être un nombre.",
          variant: "destructive",
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }

      const urls = await handleUploadImagesCompany();

      if (!urls) {
        toast({
          title: "Oh! Une erreur s'est produite!",
          description: "Lors de l'ajout d'images.",
          variant: "destructive",
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }

      const formData = {
        job,
        description,
        salary: intSalary.toString(),
        address,
        images: urls,
        typeSalary,
        paimentOption,
        transportFees: intTransportFees.toString(),
        paimentMoment,
        userId: user.id,
      };

      const response = await fetch("/api/job/add", {
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
      setJob("");
      setDescription("");
      setSalary("");
      setAddress("");
      setImages([]);
      setTypeSalary("");
      setPaimentOption("");
      setPaimentMoment("");
      setTransportFees("0");
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
    <main
      className={`grid place-items-center overflow-x-hidden relative transition-all duration-300 ease-in-out`}
    >
      {loading && <div className="w-full h-full absolute z-10 bg-overlay1" />}
      <div
        className="flex items-start text-sm justify-center overflow-x-hidden
       box-border gap-2 mx-auto bg-secondary my-4 p-2 rounded transition-all duration-300 ease-in-out"
      >
        <Info className="flex-shrink-0" />
        <p>
          Tous les champs ayant un <strong>*</strong> sont requis pour créer
          votre profile.
        </p>
      </div>

      <h2 className="p-2 text-balance text-center font-bold tracking-wide  box-border">
        Créer maintenant votre profile
      </h2>

      {/* forms */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex items-start flex-col gap-8 overflow-x-hidden box-border transition-all duration-300 ease-in-out"
      >
        {/* job */}
        <div className="grid w-full items-center gap-1.5 box-border">
          <Label htmlFor="job" className="">
            Votre poste*
          </Label>
          <SelectOptions
            options={options}
            value={job}
            onChange={(value) => setJob(value)}
            label={"Votre poste"}
            placeholder={"Choisir le poste que vous allez occuper"}
            loading={loading}
            setLoading={setLoading}
            required={true}
          />
        </div>

        {/* desc */}
        <div className="grid w-full gap-1.5 box-border">
          <Label htmlFor="description">Decrivez-vous*</Label>
          <Textarea
            placeholder="parler de vous, votre facon de faire un travail, votre attitude, votre salaire et ce dont vous avez besoins pour travailler."
            id="description"
            required={true}
            disabled={loading}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={10}
            maxLength={500}
            className="min-h-44"
          />
        </div>

        {/* address */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="address">Avenue № Commune Ville*</Label>
          <Input
            type="text"
            id="address"
            placeholder="mengo 12 bandalungwa kinshasa "
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            minLength={5}
            maxLength={100}
            required
            disabled={loading}
          />
        </div>

        {/* images */}
        <div className="grid w-full  items-center gap-1.5 text-balance text-sm box-border">
          <Label htmlFor="image">
            Des images de vous ou de votre travail ou materiel*
          </Label>
          <div className="grid grid-cols-2 lg:grid-cols-4 p-2 gap-2 border box-border">
            {images.length < 4 && (
              <Input
                type="file"
                id="image"
                disabled={loading}
                className="w-full h-auto rounded flex items-center justify-center bg-secondary cursor-pointer"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            )}
            {images.length > 0 &&
              images.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center relative w-full h-auto rounded gap-2 box-border"
                >
                  <X
                    onClick={() => {
                      let imgs = images.filter((img1) => img1 !== image);
                      setImages(imgs);
                    }}
                    className="absolute z-10 top-[0.5px] right-[0.5px] size-5 cursor-pointer 
                       duration-300 ease-in-out transition-all text-destructive"
                  />
                  <div className="absolute z-10 top-[0.5px] left-[0.5px] bg-green-600 font-semibold p-1  rounded">
                    <span>{index + 1}</span>
                  </div>
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="image"
                    className="w-full h-auto rounded max-h-32 object-cover"
                    priority
                    width={2000}
                    height={2000}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* salary */}
        <div className="grid w-full items-center gap-1.5 box-border">
          <Label htmlFor="salary" className="">
            Votre salaire en $ USD*
          </Label>
          <Input
            type="number"
            id="salary"
            placeholder="150"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            minLength={1}
            maxLength={4}
            min={1}
            max={2000}
            required
            disabled={loading}
          />
        </div>

        {/* Salary type */}
        <div className="grid w-full items-center gap-1.5 box-border">
          <Label htmlFor="salaryType" className="">
            Votre option de salaire*
          </Label>
          <SelectOptions
            options={salaryTypeData}
            value={typeSalary}
            onChange={(value) => setTypeSalary(value)}
            label={"Votre option salaire"}
            placeholder={"Choisir le type de salaire adapter a votre travail"}
            loading={loading}
            setLoading={setLoading}
            required={true}
          />
        </div>

        {/* Paiment options */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="paimentOption" className="">
            Votre option de paiement*
          </Label>
          <SelectOptions
            options={paimentOptionData}
            value={paimentOption}
            onChange={(value) => setPaimentOption(value)}
            label={"Votre option de paiement"}
            placeholder={
              "Choisir une option de paiement adapter à votre travail"
            }
            loading={loading}
            setLoading={setLoading}
            required={false}
          />
        </div>

        {/* Paiment moments */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="paimentOption" className="">
            Votre moment de paiement*
          </Label>
          <SelectOptions
            options={paimentMomentData}
            value={paimentMoment}
            onChange={(value) => setPaimentMoment(value)}
            label={"Votre moment de paiement"}
            placeholder={
              "Choisir un moment de paiement adapter à votre travail"
            }
            loading={loading}
            setLoading={setLoading}
            required={true}
          />
        </div>
        {/* transport fees */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="transportFee" className="">
            Votre frais de transport en $ USD
          </Label>
          <Input
            type="number"
            id="transportFee"
            placeholder="15"
            value={transportFees}
            onChange={(e) => setTransportFees(e.target.value)}
            minLength={1}
            maxLength={4}
            min={0}
            max={100}
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || images.length < 1}
          className="grid w-full  items-center gap-1.5 box-border"
        >
          {loading ? "en cours..." : "Confirmer la création"}
        </Button>
      </form>
    </main>
  );
};

export default NewProfile;
