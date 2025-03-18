import { useEffect } from 'react';
import { useData } from '../context/context';

const DocumentHead = () => {
  const { data } = useData();
  const { metadata } = data;

  useEffect(() => {
    if (metadata) {
      // Update title
      document.title = metadata.title;

      // Update meta tags
      const metaTags = [
        { name: 'description', content: metadata.description },
        { name: 'keywords', content: metadata.keywords },
        { name: 'author', content: metadata.author },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: metadata.ogTitle },
        { property: 'og:description', content: metadata.ogDescription },
        { property: 'og:image', content: metadata.ogImage },
        { name: 'twitter:card', content: metadata.twitterCard },
        { name: 'twitter:title', content: metadata.twitterTitle },
        { name: 'twitter:description', content: metadata.twitterDescription },
        { name: 'twitter:image', content: metadata.twitterImage },
        { name: 'theme-color', content: metadata.themeColor }
      ];

      // Update or create meta tags
      metaTags.forEach(tag => {
        const selector = tag.property 
          ? `meta[property="${tag.property}"]` 
          : `meta[name="${tag.name}"]`;
        
        let metaTag = document.querySelector(selector);
        
        if (!metaTag) {
          metaTag = document.createElement('meta');
          document.head.appendChild(metaTag);
        }

        if (tag.property) {
          metaTag.setAttribute('property', tag.property);
          metaTag.setAttribute('content', tag.content);
        } else {
          metaTag.setAttribute('name', tag.name);
          metaTag.setAttribute('content', tag.content);
        }
      });

      // Update favicon
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
        favicon.href = metadata.favicon;
      }
    }
  }, [metadata]);

  return null;
};

export default DocumentHead; 