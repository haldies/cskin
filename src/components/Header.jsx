import { useState, useRef, useEffect } from 'react';
import LogoImage from '../assets/logo.png';
import IconScan from '../assets/icon-scan.svg';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu when pressing Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
            <nav className="flex justify-between items-center container mx-auto px-4 sm:px-6 py-3">
                {/* Logo */}
                <a href="/" className="flex items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px]">
                    <img src={LogoImage} alt="Logo" className="w-full h-auto object-contain" />
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 lg:gap-8 text-secondary text-sm font-medium">
                    <li><a href="/" className="hover:text-primary transition">Home</a></li>
                    <li><a href="#about-section" className="hover:text-primary transition">About</a></li>
                    <li><a href="/skintype" className="hover:text-primary transition">Skin Type</a></li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-secondary focus:outline-none"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Scan Skin Button - Hidden on small mobile, shown otherwise */}
                <div className="hidden sm:flex items-center bg-[#2C9D8F] rounded-xl px-4 py-2 hover:opacity-90 transition ml-4">
                    <a href="#" className="text-white text-sm font-semibold">Daftar</a>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden animate-fade-in"
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={toggleMenu}
                                className="text-secondary p-2 focus:outline-none"
                                aria-label="Close menu"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <ul className="flex flex-col gap-6 text-secondary text-lg font-medium">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-primary transition block py-2 border-b border-gray-100"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about-section"
                                    className="hover:text-primary transition block py-2 border-b border-gray-100"
                                    onClick={toggleMenu}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/skintype"
                                    className="hover:text-primary transition block py-2 border-b border-gray-100"
                                    onClick={toggleMenu}
                                >
                                    Skin Type
                                </a>
                            </li>
                        </ul>

                        {/* Mobile Scan Button */}
                        <div className="flex items-center bg-[#2C9D8F] rounded-xl px-5 py-3 hover:opacity-90 transition mt-8 w-full justify-center">
                        <span className='text-white text-sm font-semibold'>Daftar</span>
                        </div>
                    </div>
                )}
            </nav>

            {/* Animation styles */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
        </header>
    );
};

export default Header;