import { createContext, useContext, useState, type ReactNode } from 'react';

interface HeroWeatherContextType {
  heroVisible: boolean;
  setHeroVisible: (v: boolean) => void;
}

const HeroWeatherContext = createContext<HeroWeatherContextType>({
  heroVisible: true,
  setHeroVisible: () => {},
});

export function HeroWeatherProvider({ children }: { children: ReactNode }) {
  const [heroVisible, setHeroVisible] = useState(true);
  return (
    <HeroWeatherContext.Provider value={{ heroVisible, setHeroVisible }}>
      {children}
    </HeroWeatherContext.Provider>
  );
}

export function useHeroWeather() {
  return useContext(HeroWeatherContext);
}
