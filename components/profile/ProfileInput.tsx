"use client";
import React from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  placeholder: string;
  name: string;
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  type: "text" | "password" | "number" | "email";
  loading: boolean;
  onHide: (() => void) | undefined;
};

const ProfileInput = ({
  label,
  placeholder,
  name,
  defaultValue,
  onChange,
  required,
  type,
  loading,
  onHide,
}: Props) => {
  return (
    <div className="w-full flex items-start justify-start gap-1.5 flex-col box-border">
      {/* {label.includes("mot de passe") ? (
        <div className="flex w-full items-center justify-between">
          <label htmlFor={name} className="text-sm font-bold">
            {label}
          </label>
          {type === "password" ? (
            <EyeOff className="cursor-pointer size-5" onClick={onHide} />
          ) : (
            <Eye className="cursor-pointer size-5" onClick={onHide} />
          )}
        </div>
      ) : ( */}
      <label htmlFor={name} className="text-sm font-bold">
        {label}
      </label>
      {/* )} */}
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        value={defaultValue}
        onChange={onChange}
        minLength={type === "password" ? 6 : 5}
        maxLength={type === "password" ? 12 : 40}
        required={required}
        disabled={loading}
        autoCapitalize="off"
      />
    </div>
  );
};

export default ProfileInput;
