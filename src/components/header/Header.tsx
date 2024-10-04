import React from 'react';
import NavBar from './NavBar';
import Banner from '../banner/Banner';
import Services from './Services';

interface HeaderProps {
  showBanner?: boolean;
  showServices?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBanner = true, showServices = true }) => {
  return (
    <header className="flex flex-col bg-orange-400 text-white relative shadow-md">
      <NavBar />
      {showBanner && <Banner />}
      {showServices && <Services />}
    </header>
  );
};

export default Header;
