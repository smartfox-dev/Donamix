import React from 'react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type AppContextType = {
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  isLeftSidebarOpen: true,
  setIsLeftSidebarOpen: () => {},
});

interface IAppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);

  return (
    <AppContext.Provider value={{ isLeftSidebarOpen, setIsLeftSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
