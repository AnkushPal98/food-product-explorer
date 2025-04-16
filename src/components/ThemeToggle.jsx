// components/ThemeToggle.js
import { useTheme } from '../context/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-black" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;