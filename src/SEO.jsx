import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = "Bluestone International Preschool";
  
  // Prevent duplicate siteTitle if it's already in the passed title
  const cleanTitle = title?.includes(siteTitle) ? title.split(` | ${siteTitle}`)[0] : title;
  const fullTitle = cleanTitle === siteTitle ? siteTitle : (cleanTitle ? `${cleanTitle} | ${siteTitle}` : siteTitle);

  const metaDescription = description || "Experience world-class early childhood education with a holistic curriculum at Bluestone International Preschool.";
  const siteUrl = "https://bluestoneinternationalpreschool.com";
  const canonicalUrl = `${siteUrl}${url || ""}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
