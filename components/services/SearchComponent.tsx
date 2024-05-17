import { Search, X } from "lucide-react";
import React from "react";
import { jobOptions } from "@/utils/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  job: string;
  searchText: string;
  setJob: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchComponent = ({ job, searchText, setJob, setSearchText }: Props) => {
  const router = useRouter();
  return (
    <section className="w-full flex flex-col md:flex-row flex-wrap gap-4 items-center justify-start ">
      <div
        className="relative flex-1  w-full  flex items-center justify-start gap-2 border-[1.5px]
       rounded p-2 py-2 bg-transparent"
      >
        <Search className="flex-shrink-0 size-4" />
        <input
          type="search"
          placeholder="Rechercher..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoCapitalize="off"
          className=" flex-1 border-none rounded h-full outline-none flex-shrink-0 bg-transparent"
        />
      </div>
      <div className="flex-1 w-full">
        <SelectUpdateOptions
          options={jobOptions}
          defaultValue={job}
          onChange={(value) => {
            setJob(value);
            router.replace(`/services?job=${value}`);
          }}
          label={"Le poste"}
          placeholder={"Selectionner un poste"}
          required={true}
        />
      </div>
      <Button
        variant={"ghost"}
        className="size-10 rounded-full border flex items-center justify-center"
        onClick={() => {
          setJob("");
          setSearchText("");
          router.replace(`/services`);
        }}
      >
        <X className="flex-shrink-0 size-6" />
      </Button>
    </section>
  );
};

type PropJob = {
  options: {
    title: string;
    value: string;
  }[];
  defaultValue: string;
  label: string;
  onChange: (value: string) => void;
  loading?: boolean;
  placeholder: string;
  required: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectUpdateOptions = ({
  options,
  defaultValue,
  onChange,
  loading,
  placeholder,
  setLoading,
  label,
  required,
}: PropJob) => {
  return (
    <Select
      disabled={loading}
      required={required}
      value={defaultValue}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option, i) => (
            <SelectItem key={i} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SearchComponent;
