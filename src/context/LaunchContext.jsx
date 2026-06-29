import React, { createContext, useContext, useState } from 'react';

const LaunchContext = createContext();

export const LaunchProvider = ({ children }) => {
  const [launchState, setLaunchState] = useState('preloader');

  const [progress, setProgress] = useState(0);

  const startLaunch = () => {
    if (launchState === 'initial') {
      setLaunchState('launching');
    }
  };

  const finishLaunch = () => {
    setLaunchState('open');
  };

  return (
    <LaunchContext.Provider value={{ launchState, setLaunchState, progress, setProgress, startLaunch, finishLaunch }}>
      {children}
    </LaunchContext.Provider>
  );
};

export const useLaunch = () => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error('useLaunch must be used within a LaunchProvider');
  }
  return context;
};
