"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MoodContextProps {
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <MoodContext.Provider value={{ selectedMood, setSelectedMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
