import React from 'react';
import Image from 'next/image';
import logo from '../public/images/logo.png'
import { useRouter } from 'next/navigation'
// import LandingPage from "./landing/page";

const Navbar = () => {
  const navbarStyle = {
    display: 'flex',
    backgroundColor: '#333',
    padding: '0px',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32vw',
    borderRadius : 30
  };

  const navLogo = {
    width: '14vw',
    height: 'auto'
  };

  const navLinks = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '70px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '10px',
    fontSize: '1.1vw',
    fontWeight: '550',
  };
  const router = useRouter()

  return (
    <div style={navbarStyle}>

      <div>
        <Image
        style={navLogo}
        src={logo}
        alt="Picture of the author"
        />
      </div>
      
      <div style={navLinks}>
        <h3 onClick={() => 
          router.push(`/`)
          } 
        style={linkStyle}>Phishing</h3>

        <h3 onClick={() => window.open('https://api.whatsapp.com/send/?phone=%2B14155238886&text&type=phone_number&app_absent=0','_blank')  } 
        
        style={linkStyle}>
          Whatsapp
        
        </h3>

        <h3 style={linkStyle}>Extension</h3>
        <h3 onClick={() => router.push('/report') } style={linkStyle}>Report</h3>
      </div>


    </div>
  );
};

export default Navbar;
