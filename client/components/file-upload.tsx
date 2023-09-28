"use client";

import React, { ChangeEvent, useState } from "react";
import { useToast } from "./ui/use-toast";

const FileUpload = () => {
  const { toast } = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);
      formData.append("filename", file.name);
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/source", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success === "true") {
          toast({
            title: "File uploaded successfully",
          });
        } else {
          toast({
            title: data.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: `Error: ${(error as Error).message}`,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center max-w-2xl mx-auto mt-10">
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-zinc-500 dark:text-zinc-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            PDF or Text files only
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
