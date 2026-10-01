'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SecretJourneyContextType {
  currentStep: string;
  unlockedSteps: string[];
  discoveredClues: Record<string, boolean>;
  isDoorUnlocked: boolean;
  setStep: (stepId: string) => void;
  markStepComplete: (stepId: string) => void;
  unlockClue: (clueId: string) => void;
  unlockDoor: () => void;
  resetProgress: () => void;
}

const STORAGE_KEY = '_hidden_chapter_progress_v1';

const SecretJourneyContext = createContext<SecretJourneyContextType | undefined>(undefined);

export function SecretJourneyProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<string>('intro');
  const [unlockedSteps, setUnlockedSteps] = useState<string[]>(['intro']);
  const [discoveredClues, setDiscoveredClues] = useState<Record<string, boolean>>({});
  const [isDoorUnlocked, setIsDoorUnlocked] = useState<boolean>(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedSteps) setUnlockedSteps(parsed.unlockedSteps);
        if (parsed.discoveredClues) setDiscoveredClues(parsed.discoveredClues);
        if (parsed.isDoorUnlocked) setIsDoorUnlocked(parsed.isDoorUnlocked);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save state to localStorage on updates
  useEffect(() => {
    try {
      const stateToSave = {
        currentStep,
        unlockedSteps,
        discoveredClues,
        isDoorUnlocked,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore storage errors
    }
  }, [currentStep, unlockedSteps, discoveredClues, isDoorUnlocked]);

  const setStep = (stepId: string) => {
    setCurrentStep(stepId);
  };

  const markStepComplete = (stepId: string) => {
    if (!unlockedSteps.includes(stepId)) {
      setUnlockedSteps((prev) => [...prev, stepId]);
    }
  };

  const unlockClue = (clueId: string) => {
    setDiscoveredClues((prev) => ({ ...prev, [clueId]: true }));
  };

  const unlockDoor = () => {
    setIsDoorUnlocked(true);
    markStepComplete('letter');
  };

  const resetProgress = () => {
    setCurrentStep('intro');
    setUnlockedSteps(['intro']);
    setDiscoveredClues({});
    setIsDoorUnlocked(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SecretJourneyContext.Provider
      value={{
        currentStep,
        unlockedSteps,
        discoveredClues,
        isDoorUnlocked,
        setStep,
        markStepComplete,
        unlockClue,
        unlockDoor,
        resetProgress,
      }}
    >
      {children}
    </SecretJourneyContext.Provider>
  );
}

export function useSecretJourney() {
  const context = useContext(SecretJourneyContext);
  if (!context) {
    throw new Error('useSecretJourney must be used within a SecretJourneyProvider');
  }
  return context;
}
