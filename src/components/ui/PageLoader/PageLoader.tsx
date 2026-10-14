import React from 'react';
import './PageLoader.css';

export const PageLoader: React.FC = () => {
  return (
    <div className="page-loader">
      <div className="loader-spinner" />
      <span className="loader-brand">JARDIN</span>
    </div>
  );
};
