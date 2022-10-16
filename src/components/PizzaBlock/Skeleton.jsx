import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="116" cy="110" r="108" />
    <rect x="41" y="234" rx="0" ry="0" width="149" height="28" />
    <rect x="9" y="387" rx="0" ry="0" width="86" height="26" />
    <rect x="122" y="387" rx="19" ry="19" width="102" height="27" />
    <rect x="7" y="283" rx="0" ry="0" width="214" height="80" />
  </ContentLoader>
);

export default Skeleton;
