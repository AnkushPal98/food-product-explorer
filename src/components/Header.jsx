// components/Header.js
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="bg-blue-600 dark:bg-gray-700 shadow-sm">
      <div className="px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Food Product Explorer
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
};
export default Header;