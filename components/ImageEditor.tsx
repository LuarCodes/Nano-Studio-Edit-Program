
import React, { useState, useCallback } from 'react';
import { ImageUpload } from './ImageUpload';
import { PromptControls } from './PromptControls';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { editImage } from '../services/geminiService';
import type { UploadedImage, EditedImageResult } from '../types';

export const ImageEditor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [editedImageResult, setEditedImageResult] = useState<EditedImageResult | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (image: UploadedImage) => {
    setOriginalImage(image);
    setEditedImageResult(null);
    setError(null);
  };
  
  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageResult(null);

    try {
      const result = await editImage(originalImage.base64, originalImage.file.type, prompt);
      setEditedImageResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="flex flex-col space-y-6">
        <div className="bg-surface p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-text-main">1. Upload Your Photo</h2>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        <div className="bg-surface p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-text-main">2. Describe Your Edit</h2>
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isDisabled={!originalImage || isLoading}
            isLoading={isLoading}
            buttonText="Edit Image"
            placeholder="e.g., 'Make the sky a vibrant sunset', 'Add a cat wearing a tiny hat'..."
          />
        </div>
      </div>
      
      <div className="bg-surface p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[400px] lg:min-h-0">
        <h2 className="text-xl font-semibold mb-4 text-text-main w-full">3. See the Magic</h2>
        {isLoading && <Loader />}
        {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</div>}
        
        {!isLoading && !error && (
          <ResultDisplay
            originalImage={originalImage}
            editedImageResult={editedImageResult}
            mode="editor"
          />
        )}
      </div>
    </div>
  );
};
