import { useEffect } from 'react';
import { getMetaTags } from '../utils/seo';

interface MetaManagerProps {
  language: 'tr' | 'en';
}

export const MetaManager: React.FC<MetaManagerProps> = ({ language }) => {
  useEffect(() => {
    const metaTags = getMetaTags(language);

    document.title = metaTags.title;

    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateMetaProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', metaTags.description);
    updateMetaTag('keywords', metaTags.keywords);
    updateMetaProperty('og:title', metaTags.title);
    updateMetaProperty('og:description', metaTags.description);
    updateMetaProperty('twitter:title', metaTags.title);
    updateMetaProperty('twitter:description', metaTags.description);
  }, [language]);

  return null;
};
