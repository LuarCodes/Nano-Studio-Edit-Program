
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageEditor } from './components/ImageEditor';
import { ImageGenerator } from './components/ImageGenerator';

type AppMode = 'editor' | 'generator';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('editor');

  const TabButton: React.FC<{
    label: string;
    targetMode: AppMode;
  }> = ({ label, targetMode }) => {
    const isActive = mode === targetMode;
    return (
      <button
        onClick={() => setMode(targetMode)}
        className={`px-6 py-3 font-semibold text-lg rounded-t-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          ${isActive 
            ? 'bg-surface text-text-main' 
            : 'bg-transparent text-text-secondary hover:bg-surface/50 hover:text-text-main'
          }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg text-text-main font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      
      <div className="w-full max-w-7xl mt-8">
        <div role="tablist" aria-label="App modes" className="flex border-b-2 border-surface">
          <TabButton label="Image Editor" targetMode="editor" />
          <TabButton label="Image Generator" targetMode="generator" />
        </div>
        
        <main role="tabpanel" className="w-full mt-[-2px] border-t-2 border-surface pt-8">
          {mode === 'editor' && <ImageEditor />}
          {mode === 'generator' && <ImageGenerator />}
        </main>
      </div>
      
       <footer className="w-full max-w-7xl text-center text-text-secondary mt-12 pb-4">
        <p>Powered by Google Gemini & React. Designed for creative exploration.</p>
      </footer>
    </div>
  );
};

export default App;
