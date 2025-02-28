import { createContext, useContext, useState, useEffect } from 'react';
import data from '../../utils/data.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [contextData, setContextData] = useState(data); // Initialize with data directly
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        // We already have the data, just need to simulate a small delay
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log('Data initialized:', data); // Debug log
      } catch (err) {
        setError(err);
        console.error('Error initializing data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <DataContext.Provider value={{ data: contextData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
