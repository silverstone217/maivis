"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  options: {
    title: string;
    value: string;
  }[];
  defaultValue: string;
  label: string;
  onChange: (value: string) => void;
  loading: boolean;
  placeholder: string;
  required: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

import React from "react";

const SelectUpdateOptions = ({
  options,
  defaultValue,
  onChange,
  loading,
  placeholder,
  setLoading,
  label,
  required,
}: Props) => {
  return (
    <Select
      disabled={loading}
      required={required}
      defaultValue={defaultValue}
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

export default SelectUpdateOptions;
