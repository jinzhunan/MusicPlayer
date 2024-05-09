// DataContext.js

import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [musicSingle, setMusicSingle] = useState(null);

  return (
    <DataContext.Provider value={{ musicSingle, setMusicSingle }}>
      {children}
    </DataContext.Provider>
  );
};
