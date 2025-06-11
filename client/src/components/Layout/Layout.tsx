import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#E94B3C] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img
                src="/assets/chef_face.png"
                alt="Red Chef"
                className="h-10 w-10 object-contain"
              />
              <span className="ml-2 text-xl font-bold">RedChef</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-[#d23e2e] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    toggleSidebar();
                  }}
                  className="text-gray-700 hover:text-[#E94B3C] font-medium"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/MenuMuze');
                    toggleSidebar();
                  }}
                  className="text-gray-700 hover:text-[#E94B3C] font-medium"
                >
                  MenuMuze
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[rgba(233,75,60,0.9)] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} RedChef. Created by Shon Barkan. MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 