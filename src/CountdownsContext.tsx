import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Countdown } from './types';
import { loadCountdowns, saveCountdowns } from './storage';

type NewCountdown = Pick<Countdown, 'title' | 'date' | 'color'>;

type CountdownsContextValue = {
  countdowns: Countdown[];
  loading: boolean;
  addCountdown: (input: NewCountdown) => Countdown;
  updateCountdown: (id: string, changes: Partial<Countdown>) => void;
  removeCountdown: (id: string) => void;
  setArchived: (id: string, archived: boolean) => void;
  getById: (id: string) => Countdown | undefined;
};

const CountdownsContext = createContext<CountdownsContextValue | undefined>(
  undefined
);

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function CountdownsProvider({ children }: { children: React.ReactNode }) {
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadCountdowns().then((data) => {
      if (active) {
        setCountdowns(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Persist whenever the list changes (after the initial load).
  useEffect(() => {
    if (!loading) {
      saveCountdowns(countdowns);
    }
  }, [countdowns, loading]);

  const value = useMemo<CountdownsContextValue>(() => {
    return {
      countdowns,
      loading,
      addCountdown: (input) => {
        const countdown: Countdown = {
          id: createId(),
          title: input.title,
          date: input.date,
          color: input.color,
          createdAt: new Date().toISOString(),
          archived: false,
        };
        setCountdowns((prev) => [...prev, countdown]);
        return countdown;
      },
      updateCountdown: (id, changes) => {
        setCountdowns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...changes } : c))
        );
      },
      removeCountdown: (id) => {
        setCountdowns((prev) => prev.filter((c) => c.id !== id));
      },
      setArchived: (id, archived) => {
        setCountdowns((prev) =>
          prev.map((c) => (c.id === id ? { ...c, archived } : c))
        );
      },
      getById: (id) => countdowns.find((c) => c.id === id),
    };
  }, [countdowns, loading]);

  return (
    <CountdownsContext.Provider value={value}>
      {children}
    </CountdownsContext.Provider>
  );
}

export function useCountdowns(): CountdownsContextValue {
  const ctx = useContext(CountdownsContext);
  if (!ctx) {
    throw new Error('useCountdowns must be used within a CountdownsProvider');
  }
  return ctx;
}
