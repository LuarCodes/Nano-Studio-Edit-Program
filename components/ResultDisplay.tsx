
import React from 'react';
import type { UploadedImage, EditedImageResult } from '../types';

interface ResultDisplayProps {
  originalImage: UploadedImage | null;
  editedImageResult: EditedImageResult | null;
  mode: 'editor' | 'generator';
}

const ImageCard: React.FC<{ label: string; src: string; alt: string }> = ({ label, src, alt }) => (
  <div className="flex flex-col items-center w-full">
    <h3 className="text-lg font-medium text-text-secondary mb-2">{label}</h3>
    <div className="w-full aspect-square bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
    </div>
  </div>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImageResult, mode }) => {
  const handleDownload = () => {
    if (!editedImageResult?.imageBase64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${editedImageResult.imageBase64}`;
    link.download = `nano-studio-${mode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!originalImage && !editedImageResult) {
    const placeholderText = mode === 'editor' 
      ? "Your images will appear here once you upload a photo and generate an edit."
      : "Your generated image will appear here.";
    return (
      <div className="text-center text-text-secondary h-full flex items-center justify-center">
        <p>{placeholderText}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {originalImage && (
            <ImageCard label="Original" src={`data:${originalImage.file.type};base64,${originalImage.base64}`} alt="Original user upload" />
        )}
        
        {editedImageResult?.imageBase64 ? (
          <div className={`flex flex-col items-center w-full space-y-4 ${!originalImage ? 'md:col-span-2' : ''}`}>
            <ImageCard 
              label={mode === 'editor' ? "Edited" : "Generated"} 
              src={`data:image/png;base64,${editedImageResult.imageBase64}`} 
              alt="AI edited result" 
            />
            <button
              onClick={handleDownload}
              className="w-full max-w-xs flex items-center justify-center px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary transition-all duration-300 ease-in-out"
              aria-label="Download generated image"
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download Image
            </button>
          </div>
        ) : (
          originalImage && (
            <div className="flex flex-col items-center w-full">
              <h3 className="text-lg font-medium text-text-secondary mb-2">Edited</h3>
              <div className="w-full aspect-square bg-black/30 rounded-lg flex items-center justify-center text-text-secondary text-center p-4">
                <p>Your AI-generated image will be displayed here.</p>
              </div>
            </div>
          )
        )}
      </div>
      {editedImageResult?.text && (
          <div className="w-full bg-gray-900/50 p-4 rounded-lg mt-4">
              <p className="text-sm text-text-secondary italic"><span className="font-bold not-italic text-text-main">AI says:</span> "{editedImageResult.text}"</p>
          </div>
      )}
    </div>
  );
};
