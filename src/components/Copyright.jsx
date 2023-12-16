// components/CopyrightFooter.js
const CopyrightFooter = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="text-center mt-8">
        <hr className="border-t border-gray-300 my-4" />
        <p className="text-sm text-gray-600">
          &copy; {currentYear} Quantum Exchange. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default CopyrightFooter;
  