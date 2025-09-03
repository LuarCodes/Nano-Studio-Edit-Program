
import React, { useState, useRef, useCallback } from 'react';
import type { UploadedImage } from '../types';

interface ImageUploadProps {
  onImageUpload: (image: UploadedImage) => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onImageUpload({ file, base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAreaClick = useCallback(() => {
    fileInputRef.current?.click();
  },[]);

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <div
        onClick={handleAreaClick}
        className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-black/20"
      >
        {preview ? (
          <img src={preview} alt="Image preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-text-secondary">
            <UploadIcon className="w-10 h-10 mx-auto mb-2" />
            <p className="font-semibold">Click to upload an image</p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};
