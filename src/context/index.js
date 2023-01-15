import { createContext, useContext } from 'react';

export const AppContext = createContext();

export const useUser = () => useContext(AppContext);

/*
export const UserProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [modal, setModal] = useState({ show: false, img: '', imgAlt: '' });
  return (
    <MyContext.Provider
      value={{
        searchTerm,
        pictures,
        isLoading,
        totalPages,
        page,
        perPage,
        modal,
      }}
    >
      {children}
    </MyContext.Provider>
)}*/
