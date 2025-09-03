
import React from 'react';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  isLoading: boolean;
  buttonText?: string;
  placeholder?: string;
}

const GenerateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" />
    </svg>
);


export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onSubmit, isDisabled, isLoading, buttonText = 'Generate Image', placeholder }) => {
  const defaultPlaceholder = "e.g., 'Make the sky a vibrant sunset', 'Add a cat wearing a tiny hat'...";
  return (
    <div className="flex flex-col space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder || defaultPlaceholder}
        className="w-full h-28 p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-text-main placeholder-text-secondary resize-none"
        disabled={isDisabled}
      />
      <button
        onClick={onSubmit}
        disabled={isDisabled || !prompt.trim()}
        className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <GenerateIcon className="w-5 h-5 mr-2"/>
            {buttonText}
          </>
        )}
      </button>
    </div>
  );
};
