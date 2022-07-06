import React from 'react';
import tw from 'tailwind-styled-components';
import Logo from '../assets/pngs/logo.png';

const Navbar: React.FC = () => {
    return (
        <div className='flex items-center justify-between w-full h-[64px] px-[24px] bg-white shadow-lg fixed z-10'>
            {/* <p className='font-black text-2xl'>MetaStore</p>     */}
            <img src={Logo} alt="" className='h-[64px]'/>
            <div className='flex items-center gap-[24px]'>
                <Button>
                    <p>Property</p>
                </Button>
                <Button>
                    <p>Items</p>
                </Button>
                <ConnectWalletButton>
                    Connect Wallet
                </ConnectWalletButton>
            </div>
      </div>
    );
};

const Button = tw.button`
    px-[8px]
    py-[6px]
    rounded-[8px]
    bg-white
    hover:bg-green/10
    text-green
    font-bold
`

const ConnectWalletButton = tw.button`
    px-[16px]
    py-[6px]
    rounded-[8px]
    bg-green
    hover:bg-darkgreen
    text-white
    font-bold
    shadow-green-200
    shadow-lg
`

export default Navbar;