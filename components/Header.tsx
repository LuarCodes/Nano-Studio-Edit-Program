
import React from 'react';

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" />
        <path d="M4.5 4.5l1 1" />
        <path d="M18.5 4.5l-1 1" />
        <path d="M4.5 19.5l1-1" />
        <path d="M18.5 19.5l-1-1" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center w-full max-w-4xl">
      <div className="flex items-center justify-center gap-4">
        <SparkleIcon className="w-10 h-10 text-primary" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            Nano Studio AI
        </h1>
      </div>
      <p className="mt-4 text-lg text-text-secondary">
        Transform or create images with a simple description. Powered by Google's Nano Banana model.
      </p>
    </header>
  );
};
