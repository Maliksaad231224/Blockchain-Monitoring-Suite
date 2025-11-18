import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 ${
        hover ? 'hover:shadow-lg hover:border-gray-600' : ''
      } transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-white ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-700 flex gap-3 justify-end ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
