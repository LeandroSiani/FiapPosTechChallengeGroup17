import { FilePdf } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

interface FileUploadProps {
  label?: string;
  onFileChange?: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = "Diploma (upload de arquivo, se necessário)",
  onFileChange,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (onFileChange) onFileChange(selectedFile);
  };

  return (
    <label
      htmlFor="file-upload"
      className="flex flex-col items-center justify-center w-full h-32 bg-gray-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300 transition-all"
    >
      <FilePdf size={18} color="#8B8B8B" />
      <span className="text-gray-600 text-sm">{file ? file.name : label}</span>
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
};
