import { createContext, useContext } from 'react';

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const GalleryContext = createContext();
export const useGalleryContext = () => useContext(GalleryContext);
