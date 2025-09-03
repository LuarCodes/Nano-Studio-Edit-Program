
import React, { useState, useCallback } from 'react';
import { PromptControls } from './PromptControls';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { generateImage } from '../services/geminiService';
import type { EditedImageResult } from '../types';

export const ImageGenerator: React.FC = () => {
  const [generatedImageResult, setGeneratedImageResult] = useState<EditedImageResult | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = useCallback(async () => {
    if (!prompt) {
      setError('Please provide a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageResult(null);

    try {
      const result = await generateImage(prompt);
      setGeneratedImageResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface p-6 rounded-2xl shadow-lg lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-text-main">1. Describe the Image to Generate</h2>
            <PromptControls
                prompt={prompt}
                setPrompt={setPrompt}
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                isLoading={isLoading}
                buttonText="Generate Image"
                placeholder="e.g., 'A photorealistic image of an astronaut riding a horse on Mars', 'A cute watercolor illustration of a fox in a forest'..."
            />
        </div>
        
        <div className="bg-surface p-6 rounded-2xl shadow-lg lg:col-span-2 flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-semibold mb-4 text-text-main w-full">2. See the Magic</h2>
          {isLoading && <Loader />}
          {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</div>}
          
          {!isLoading && !error && (
            <ResultDisplay
              originalImage={null}
              editedImageResult={generatedImageResult}
              mode="generator"
            />
          )}
        </div>
    </div>
  );
};
