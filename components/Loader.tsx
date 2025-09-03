
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-primary border-r-primary border-b-primary/20 border-l-primary/20 rounded-full animate-spin"></div>
      </div>
      <h3 className="text-xl font-semibold text-text-main mt-6">Conjuring pixels...</h3>
      <p className="text-text-secondary mt-2">The AI is working its magic. This can take a moment.</p>
    </div>
  );
};
