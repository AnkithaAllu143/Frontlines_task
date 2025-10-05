import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [view, setView] = useState('cards');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);

  return (
    <FiltersContext.Provider value={{
      search, setSearch, location, setLocation,
      industry, setIndustry, sortBy, setSortBy,
      view, setView, pageSize, setPageSize, page, setPage
    }}>
      {children}
    </FiltersContext.Provider>
  );
};
