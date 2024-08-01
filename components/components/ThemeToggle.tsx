'use client';

import { useTheme } from './context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-300 focus:outline-none"
    >
      <FontAwesomeIcon
        icon={theme === 'light' ? faMoon : faSun}
        className={classNames('transition-transform duration-300', {
          'text-yellow-500': theme === 'light',
          'text-gray-800': theme === 'dark',
        })}
      />
    </button>
  );
};

export default ThemeToggle;