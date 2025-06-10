import LogoImage from '../assets/logo.png';
import IconScan from '../assets//icon-scan.svg';
const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
            <nav className="flex justify-between items-center container mx-auto px-6 py-3">
                {/* Logo */}
                <a href="/" className="flex items-center w-[60px] h-[60px]">
                    <img src={LogoImage} alt="Logo" className="w-full h-auto object-contain" />

                </a>

                {/* Menu */}
                <ul className="hidden md:flex gap-8 text-secondary text-sm font-medium">
                    <li><a href="/" className="hover:text-primary transition">Home</a></li>
                    <li><a href="#about-section" className="hover:text-primary transition">About</a></li>
                    <li><a href="/skintype" className="hover:text-primary transition">Skin Type</a></li>
                </ul>

                {/* Scan Skin Button */}
                <div className="flex items-center bg-[#2C9D8F] rounded-xl px-5 py-2 hover:opacity-90 transition">
                    <a href="#" className="text-white text-sm font-semibold">Scan Skin</a>
                    <img src={IconScan} alt="Scan Icon" className="w-6 h-6 ml-2" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
