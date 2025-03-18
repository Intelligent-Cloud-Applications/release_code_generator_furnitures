import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API } from 'aws-amplify';
import initialData from '../../Operations/data.json';
import '../../aws-config';

const DataContext = createContext();

// Flag to control data source
const localData = import.meta.env.VITE_LOCAL_DATA === 'true';

// Default empty structure that matches your data shape
const defaultData = {
  institutionid: '',
  index: '',
  aboutUs: {
    hero: {
      title: '',
      backgroundImage: ''
    },
    story: {
      title: '',
      content: ''
    },
    mission: {
      title: '',
      content: ''
    },
    benefits: {
      title: '',
      items: []
    },
    cta: {
      text: ''
    }
  },
  faq: {
    hero: {
      title: '',
      subtitle: ''
    },
    items: [],
    contact: {
      text: '',
      linkText: ''
    }
  },
  footer: {
    quickLinks: {
      title: '',
      items: []
    },
    contact: {
      title: '',
      companyName: '',
      description: '',
      location: '',
      phone: ''
    },
    social: {
      title: '',
      description: '',
      links: []
    },
    copyright: {
      text: ''
    }
  },
  granite: {
    hero: {
      title: '',
      subtitle: ''
    },
    products: []
  },
  hero: {
    slides: [],
    settings: {
      slideInterval: 5000
    },
    button: {
      text: '',
      url: ''
    }
  },
  marble: {
    hero: {
      title: '',
      subtitle: ''
    },
    products: []
  },
  services: {
    hero: {
      title: '',
      highlightedText: '',
      subtitle: ''
    },
    features: []
  },
  products: {
    hero: {
      title: '',
      subtitle: ''
    },
    categories: []
  },
  testimonials: {
    hero: {
      title: '',
      highlightedText: '',
      subtitle: ''
    },
    stats: {
      rating: {
        value: '',
        label: ''
      },
      clients: {
        value: '',
        label: ''
      },
      satisfaction: {
        value: '',
        label: ''
      }
    },
    reviews: []
  },
  tile: {
    hero: {
      title: '',
      subtitle: ''
    },
    products: []
  },
  whatsapp: {
    button: {
      text: '',
      phoneNumber: '',
      message: ''
    },
    tooltip: {
      text: ''
    }
  },
  contact: {
    hero: {
      title: '',
      subtitle: ''
    },
    info: {
      email: '',
      phone: '',
      address: '',
      hours: ''
    },
    form: {
      namePlaceholder: '',
      emailPlaceholder: '',
      subjectPlaceholder: '',
      messagePlaceholder: '',
      submitButton: '',
      loadingText: '',
      successMessage: '',
      errorMessage: ''
    }
  }
};

// Validate if a section has required data
const isValidSection = (section, sectionName) => {
  if (!section) return false;
  
  switch (sectionName) {
    case 'marble':
    case 'granite':
    case 'tile':
      return section.products && Array.isArray(section.products) && section.products.length > 0;
    case 'hero':
      return section.slides && Array.isArray(section.slides) && section.slides.length > 0;
    case 'testimonials':
      return section.reviews && Array.isArray(section.reviews) && section.reviews.length > 0;
    case 'products':
      return section.categories && Array.isArray(section.categories) && section.categories.length > 0;
    case 'services':
      return section.features && Array.isArray(section.features) && section.features.length > 0;
    case 'faq':
      return section.items && Array.isArray(section.items) && section.items.length > 0;
    case 'aboutUs':
      return section.story && section.story.content && section.mission && section.mission.content;
    case 'contact':
      return section.info && section.info.email && section.info.phone && section.info.address;
    case 'footer':
      return section.quickLinks && Array.isArray(section.quickLinks.items) && 
             section.contact && section.contact.companyName && 
             section.social && Array.isArray(section.social.links);
    default:
      return true;
  }
};

export const DataProvider = ({ children, onError }) => {
  const [contextData, setContextData] = useState(localData ? initialData : defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionErrors, setSectionErrors] = useState({});

  const validateData = useCallback((data) => {
    const errors = {};
    Object.keys(defaultData).forEach(section => {
      errors[section] = !isValidSection(data[section], section);
    });
    setSectionErrors(errors);
    return errors;
  }, []);

  const checkSectionAndNavigate = useCallback((sectionName) => {
    if (!contextData[sectionName] || sectionErrors[sectionName]) {
      if (onError) {
        onError({
          message: `No data available for ${sectionName}`,
          code: 404
        });
      }
      return false;
    }
    return true;
  }, [contextData, sectionErrors, onError]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSectionErrors({});
        
        if (localData) {
          await new Promise(resolve => setTimeout(resolve, 100));
          if (isMounted) {
            setContextData(initialData);
            validateData(initialData);
          }
        } else {
          const response = await API.get('main', 
            `/any/get-institution-data/${initialData.institutionid}`
          );
          
          // Ensure the response data has the correct structure
          const newData = {
            ...defaultData,  // Start with default structure
            ...response,     // Overlay API response data
            institutionid: response.institutionid || initialData.institutionid,
            // Ensure critical sections have proper structure
            marble: {
              hero: response.marble?.hero || defaultData.marble.hero,
              products: Array.isArray(response.marble?.products) ? response.marble.products : []
            },
            granite: {
              hero: response.granite?.hero || defaultData.granite.hero,
              products: Array.isArray(response.granite?.products) ? response.granite.products : []
            },
            tile: {
              hero: response.tile?.hero || defaultData.tile.hero,
              products: Array.isArray(response.tile?.products) ? response.tile.products : []
            },
            products: {
              hero: response.products?.hero || defaultData.products.hero,
              categories: Array.isArray(response.products?.categories) ? response.products.categories : []
            }
          };
          
          if (isMounted) {
            setContextData(newData);
            validateData(newData);
          }
        }
      } catch (err) {
        console.error('Error initializing data:', err);
        if (isMounted) {
          setError(err);
          const fallbackData = localData ? initialData : defaultData;
          setContextData(fallbackData);
          validateData(fallbackData);
          if (onError) {
            onError({
              message: 'Failed to load data',
              code: 500,
              error: err.message
            });
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DataContext.Provider value={{ 
      data: contextData, 
      loading, 
      error,
      sectionErrors,
      isValidSection: (sectionName) => !sectionErrors[sectionName],
      checkSectionAndNavigate
    }}>
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
