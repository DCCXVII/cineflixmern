import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-curious-blue-950 h-80 border-curious-blue-50  p-4 font-blinker overflow-hidden ">
      <div className="container mx-auto text-center backdrop-blur-2xl text-white-50">
        <p>© 2023 CineFlix </p>
        <div className="flex justify-center mt-2">
          <a href="#" className="text-gray-400 hover:text-white mx-3">
            About
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-3">
            Contact
          </a>
          <a href="#" className="text-gray-400 hover:text-white mx-3">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
