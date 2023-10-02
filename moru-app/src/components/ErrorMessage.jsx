import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = () => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Ups!</strong>
      <span className="block sm:inline"> No te registraste.</span>

      
    </div>
  );
};

export default ErrorMessage;