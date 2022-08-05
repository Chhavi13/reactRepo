import  React from 'react';
import { Helmet } from "react-helmet-async"

export const MetaDataTags = ({title, description, image, url}: any) => {
  return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:url" content={`https://tokuten.co/${url}`} />
        <meta name="description" content={description} />
        {image && <meta property="og:image" content={image} />}
      </Helmet>
  )
}