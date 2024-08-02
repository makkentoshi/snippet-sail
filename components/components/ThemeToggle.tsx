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
      className="p-2 rounded-full  duration-300 focus:outline-none transition-all px-3"
    >
      <FontAwesomeIcon
        icon={theme === 'light' ? faMoon : faSun}
        className={classNames('icon-transition', {
          'text-gray-900': theme === 'light',
          'text-yellow-500': theme === 'dark',
        })}
      />
    </button>
  );
};

export default ThemeToggle;