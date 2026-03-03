'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, openMenu: () => setIsOpen(true), closeMenu: () => setIsOpen(false) }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within MenuProvider');
  return context;
}
