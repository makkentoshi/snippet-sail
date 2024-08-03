'use client';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Transition } from '@headlessui/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-1/3 lg:w-1/3 bg-gray-800 text-white h-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen p-4">
        <span>Log In</span>
        <span>Log In</span>
        <span>Log In</span>
        <span>Log In</span>
      </div>

      {/* Mobile Burger Menu */}
      <div className="lg:hidden flex flex-col items-center justify-center">
        <button onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Dialog for Burger Menu */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50"
        >
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar Panel */}
          <Transition
            show={isOpen}
            enter="transition-transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 w-3/4 bg-white p-6">
              <div className="flex flex-col h-full">
                <span>Log In</span>
                <span>Log In</span>
                <span>Log In</span>
                <span>Log In</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="mt-4">Close</button>
            </Dialog.Panel>
          </Transition>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;