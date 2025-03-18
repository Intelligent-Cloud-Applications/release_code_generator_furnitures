import { useEffect } from 'react';
import metadata from '../../Operations/meta.json';

const DocumentHead = () => {
  useEffect(() => {
    if (metadata.metadata) {
      // Update title
      document.title = metadata.metadata.title;

      // Update meta tags
      const metaTags = [
        { name: 'description', content: metadata.metadata.description },
        { name: 'keywords', content: metadata.metadata.keywords },
        { name: 'author', content: metadata.metadata.author },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: metadata.metadata.ogTitle },
        { property: 'og:description', content: metadata.metadata.ogDescription },
        { property: 'og:image', content: metadata.metadata.ogImage },
        { name: 'twitter:card', content: metadata.metadata.twitterCard },
        { name: 'twitter:title', content: metadata.metadata.twitterTitle },
        { name: 'twitter:description', content: metadata.metadata.twitterDescription },
        { name: 'twitter:image', content: metadata.metadata.twitterImage },
        { name: 'theme-color', content: metadata.metadata.themeColor }
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
        favicon.href = metadata.metadata.favicon;
      }
    }
  }, []); // Empty dependency array since we're using static data

  return null;
};

export default DocumentHead; 