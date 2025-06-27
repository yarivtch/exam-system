import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime = 0) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setStartTime(new Date());
  }, []);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setEndTime(new Date());
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setStartTime(null);
    setEndTime(null);
  }, []);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  return {
    time,
    isRunning,
    startTime,
    endTime,
    startTimer,
    stopTimer,
    resetTimer,
    formatTime: () => formatTime(time)
  };
}; 