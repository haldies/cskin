import LogoImage from '../assets/logo.png';
import IconScan from '../assets//icon-scan.svg';
const Footer = () => {
  return (
    <footer className="bg-[#EAF5F4] py-10 pt-16 mt-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Logo + Brand */}
        <div className="flex items-center mb-10 md:mb-0">
          <img src={LogoImage} alt="Logo" className="w-[80px] h-[80px]" />
          <span className="text-[32px] text-[#2C9D8F] font-bold ml-2">
            CS<span className="text-[#515151]">kin</span>
          </span>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4 text-[#515151] mb-10 md:mb-0">
          <h2 className="font-semibold">Menu</h2>
          <ul className="flex flex-col gap-4">
            <li><a href="/index.html" className="hover:text-[#2C9D8F]">Home</a></li>
            <li><a href="/about.html" className="hover:text-[#2C9D8F]">About</a></li>
            <li><a href="/skintype.html" className="hover:text-[#2C9D8F]">Skin Type</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4 text-[#515151] mb-10 md:mb-0">
          <h2 className="font-semibold">Kontak / Hubungi Kami</h2>
          <ul className="flex flex-col gap-4">
            <li>Email : cskin@gmail.com</li>
            <li>WhatsApp: +61 123-456-789</li>
            <li>Instagram: @cskin</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <a className="flex items-center gap-2 bg-[#2C9D8F] rounded-xl px-4 py-2 cursor-pointer hover:opacity-90">
            <span className="text-white text-base font-semibold">Scan Skin</span>
            <div className="w-[28px] h-[28px] bg-[#2C9D8F] rounded-full flex items-center justify-center">
              {/* SVG Icon */}
              <img src={IconScan} alt="" />
            </div>
          </a>
          <a className="bg-white rounded-xl px-4 py-2 border border-[#2C9D8F] text-center cursor-pointer hover:bg-[#2C9D8F]/10">
            <span className="text-[#2C9D8F] text-base font-semibold">Konsultasi</span>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-20 px-4">
        <hr />
        <div className="flex flex-col md:flex-row justify-between mt-5 text-center md:text-left text-[#515151] text-sm font-normal gap-2">
          <p>© 2023 CSKIN. All rights reserved.</p>
          <p>Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
