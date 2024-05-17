import React, { ChangeEvent, Suspense, useState } from "react";
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
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Jobber } from "@prisma/client";
import SelectUpdateOptions from "../SelectUpdateOptions";

type Props = {
  myJob: Jobber | null;
  setIndexTab: React.Dispatch<React.SetStateAction<IndexTabValue>>;
};

const MyUpdateProfileComp = ({ myJob, setIndexTab }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();
  const router = useRouter();

  //   forms variables
  const [job, setJob] = useState(myJob?.job || "");
  const [description, setDescription] = useState(myJob?.description || "");
  const [salary, setSalary] = useState(myJob?.salary || "");
  const [address, setAddress] = useState(myJob?.address || "");
  const [images, setImages] = useState<string[]>(myJob?.images || []);
  const [image, setImage] = useState<File | null>(null);
  const [typeSalary, setTypeSalary] = useState(myJob?.typeSalary || "");
  const [paimentOption, setPaimentOption] = useState(
    myJob?.paimentOption || ""
  );
  const [paimentMoment, setPaimentMoment] = useState(
    myJob?.paimentMoment || ""
  );
  const [transportFees, setTransportFees] = useState(
    myJob?.transportFees || "0"
  );

  if (!user || !myJob) return null;

  //   modify paiment properties
  const handleSubmitPaiment = async () => {
    try {
      setLoading(true);
      const formData = {
        userId: user.id,
        paimentMoment,
        paimentOption,
        transportFees,
        typeSalary,
      };

      const response = await fetch("/api/job/modify/paiment", {
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
      setIndexTab("infos");
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

  //   modify job, salary and description
  const handleSubmitJob = async () => {
    try {
      setLoading(true);
      const formData = {
        job,
        description,
        salary,
        address,
        userId: user.id,
      };

      const response = await fetch("/api/job/modify/job", {
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
      setIndexTab("infos");
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

  //   delete images
  const handleDeleteImage = async (urlImg: string) => {
    try {
      setLoading(true);
      const formData = {
        urlImg: urlImg,
        userId: user.id,
      };

      const response = await fetch("/api/job/modify/image/delete", {
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

      const imgs = myJob.images.filter((ig) => ig !== urlImg);
      setImages(imgs);

      const imageRef = ref(storage, urlImg);
      await deleteObject(imageRef);

      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
      });

      setTimeout(() => setLoading(false), 1500);
      router.refresh();
      setIndexTab("infos");
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

  //   add image
  const handleUploadImage = async () => {
    if (!image) return;
    try {
      setLoading(true);

      let urlImg = "";
      const IdImg = v4().toString().replace(/-/g, "");
      const imageRef = ref(storage, `/maivis/images/${IdImg}`);

      await uploadBytes(imageRef, image).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((downloadURL) => {
          urlImg = downloadURL;
        });
        setImages([...images, urlImg]);
      });

      const formData = {
        urlImg: urlImg,
        userId: user.id,
      };

      const response = await fetch("/api/job/modify/image/add", {
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

      setImage(null);

      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
      });

      setTimeout(() => setLoading(false), 1500);
      router.refresh();
      setIndexTab("infos");
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
    <div className="w-full flex flex-col items-center gap-8 justify-start mt-4 relative">
      {loading && <div className="w-full h-full absolute z-10 bg-overlay1" />}
      <h1 className="text-xl font-bold mt-4">Mon Resumé(CV)</h1>

      {/* Post, addres, salary and description */}
      <section
        className="flex flex-col  gap-4 items-start justify-start w-full 
      lg:w-11/12 border-[0.5px] p-4 rounded shadow"
      >
        {/* job */}
        <div className="grid w-full  items-center gap-1.5 box-border flex-shrink-0">
          <Label htmlFor="job" className="">
            Votre poste
          </Label>
          <SelectUpdateOptions
            options={options}
            defaultValue={job}
            onChange={(value) => setJob(value)}
            label={"Votre poste"}
            placeholder={"Choisir le poste que vous allez occuper"}
            loading={loading}
            setLoading={setLoading}
            required={true}
          />
        </div>

        {/* address */}
        <div className="grid w-full  items-center gap-1.5 box-border flex-shrink-0">
          <Label htmlFor="address">Avenue № Commune Ville</Label>
          <Input
            type="text"
            id="address"
            placeholder="mengo 12 bandalungwa kinshasa "
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            minLength={5}
            maxLength={100}
            required
            disabled={loading}
            className="capitalize"
          />
        </div>

        {/* desc */}
        <div className="grid w-full  items-center gap-1.5 box-border flex-shrink-0">
          <Label htmlFor="description" className="">
            Votre description
          </Label>
          <Textarea
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="parler de vous, votre facon de faire un travail, votre attitude, votre salaire et ce dont vous avez besoins pour travailler."
            id="description"
            required={true}
            disabled={loading}
            minLength={10}
            maxLength={500}
            className="min-h-44"
          />
        </div>

        {/* salary */}
        <div className="grid w-full  items-center gap-1.5 box-border flex-shrink-0">
          <Label htmlFor="salary" className="">
            Votre salaire en $ USD
          </Label>
          <Input
            type="number"
            id="salary"
            placeholder="150"
            defaultValue={salary}
            onChange={(e) => setSalary(e.target.value)}
            minLength={1}
            maxLength={4}
            min={1}
            max={2000}
            required
            disabled={loading}
          />
        </div>
        <Button
          type="button"
          disabled={
            loading ||
            job.replace(/ /g, "") === "" ||
            description.replace(/ /g, "") === "" ||
            address.replace(/ /g, "") === "" ||
            salary.replace(/ /g, "") === "" ||
            (job === myJob.job &&
              description === myJob.description &&
              address === myJob.address &&
              salary === myJob.salary)
          }
          className="grid w-full  items-center gap-1.5 box-border"
          onClick={() => handleSubmitJob()}
        >
          {loading ? "en cours..." : "Modifier "}
        </Button>
      </section>

      {/* Paiment options */}
      <section
        className="flex flex-col  gap-4 items-start justify-start w-full 
      lg:w-11/12 border-[0.5px] p-4 rounded shadow"
      >
        {/* Paiment options */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="paimentOption" className="">
            Votre option de paiement
          </Label>
          <SelectUpdateOptions
            options={paimentOptionData}
            defaultValue={paimentOption}
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

        {/* Salary type */}
        <div className="grid w-full items-center gap-1.5 box-border">
          <Label htmlFor="salaryType" className="">
            Votre option de salaire*
          </Label>
          <SelectUpdateOptions
            options={salaryTypeData}
            defaultValue={typeSalary}
            onChange={(value) => setTypeSalary(value)}
            label={"Votre option salaire"}
            placeholder={"Choisir le type de salaire adapter a votre travail"}
            loading={loading}
            setLoading={setLoading}
            required={true}
          />
        </div>
        {/* Paiment moments */}
        <div className="grid w-full  items-center gap-1.5 box-border">
          <Label htmlFor="paimentOption" className="">
            Votre moment de paiement
          </Label>
          <SelectUpdateOptions
            options={paimentMomentData}
            defaultValue={paimentMoment}
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
            defaultValue={transportFees}
            onChange={(e) => setTransportFees(e.target.value)}
            minLength={1}
            maxLength={4}
            min={0}
            max={100}
            disabled={loading}
          />
        </div>

        {/* sub btn */}
        <Button
          type="button"
          disabled={
            loading ||
            paimentMoment.replace(/ /g, "") === "" ||
            typeSalary.replace(/ /g, "") === "" ||
            paimentOption.replace(/ /g, "") === "" ||
            transportFees.replace(/ /g, "") === "" ||
            (paimentMoment === myJob.paimentMoment &&
              typeSalary === myJob.typeSalary &&
              paimentOption === myJob.paimentOption &&
              transportFees === myJob.transportFees)
          }
          className="grid w-full  items-center gap-1.5 box-border"
          onClick={() => handleSubmitPaiment()}
        >
          {loading ? "en cours..." : "Modifier "}
        </Button>
      </section>

      {/* images */}
      <section
        className="flex flex-col  gap-4 items-start justify-start w-full 
      lg:w-11/12 border-[0.5px] p-4 rounded shadow"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4">
          {/* add image */}
          {images.length < 4 && image === null ? (
            <div className="grid w-full  items-center gap-1.5 box-border">
              <Input
                type="file"
                id="image"
                placeholder="Ajouter une image"
                onChange={(e) => {
                  const prevImg = e.target.files;
                  if (prevImg) {
                    setImage(prevImg[0]);
                  }
                }}
                minLength={5}
                maxLength={100}
                required
                disabled={loading}
                className="capitalize w-full"
              />
            </div>
          ) : images.length < 4 && image ? (
            <div className="grid w-full items-center gap-1.5 box-border">
              <Image
                src={URL.createObjectURL(image)}
                alt="image"
                className="w-full h-auto max-h-20 rounded object-cover brightness-75"
                width={2000}
                height={2000}
                priority
              />
              <Button
                type="button"
                onClick={() => handleUploadImage()}
                className="grid w-full  items-center box-border h-8"
              >
                Ajouter
              </Button>
            </div>
          ) : null}

          {/* image */}
          {images.map((img, index) => (
            <div key={index} className="w-full relative">
              <X
                onClick={() => {
                  //   let imgs = images.filter((img1) => img1 !== img);
                  //   setImages(imgs);
                  handleDeleteImage(img);
                }}
                className="absolute z-10 top-[0.5px] right-1 size-5 cursor-pointer 
                       duration-300 ease-in-out transition-all text-destructive"
              />
              <Suspense>
                <Image
                  src={img}
                  alt="image"
                  className="w-full h-auto max-h-28 rounded object-cover brightness-90"
                  width={2000}
                  height={2000}
                  priority
                />
              </Suspense>
            </div>
          ))}
        </div>
      </section>

      {/* danger section */}
      <section
        className="flex flex-col  gap-4 items-start justify-start w-full 
      lg:w-11/12 border-[0.5px] p-4 rounded shadow"
      >
        <h1 className="font-bold">Zone dangereuse</h1>
        <Button className="w-full" variant={"destructive"}>
          Supprimer mon Resumé
        </Button>
      </section>
    </div>
  );
};

export default MyUpdateProfileComp;
