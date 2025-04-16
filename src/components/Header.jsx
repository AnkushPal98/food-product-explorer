// components/Header.js
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-blue-600 dark:bg-gray-700 shadow-sm">
      <div className="px-4 flex justify-between items-center">
      <div className="flex items-center space-x-1">
      <Link to={"/"}>      
          <img 
            src="/food-explorer.png"
            alt="Food Explorer Logo"
            className="h-18 w-20" // Adjust size as needed
          />
      </Link>
          <h1 className="text-2xl font-bold text-white">
            Food Product Explorer
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
export default Header;