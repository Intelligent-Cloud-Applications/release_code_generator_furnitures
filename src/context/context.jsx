import { createContext, useContext, useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import initialData from '../../utils/data.json';
import '../aws-config';

const DataContext = createContext();

// Flag to control data source
const localData = true;

export const DataProvider = ({ children }) => {
  const [contextData, setContextData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (localData) {
          // Use local data with a small delay to simulate loading
          await new Promise(resolve => setTimeout(resolve, 100));
          setContextData(initialData);
          // console.log('Local data initialized:', initialData);
        } else {
          // Fetch data from API
          const response = await API.get('main', 
            `/any/get-institution-data/${initialData.InstitutionId}`
          );
          
          // Merge API data with initial data as fallback
          setContextData({
            ...initialData,
            ...response
          });
          // console.log('API data fetched:', response);
        }
      } catch (err) {
        console.error('Error initializing data:', err);
        setError(err);
        setContextData(initialData); // Use initial data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
