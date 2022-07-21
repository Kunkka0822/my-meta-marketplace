import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import ChartImg from '../../assets/svgs/chart.svg';
import CoinImg from '../../assets/pngs/mmc.png';
import EarthImg from '../../assets/svgs/earth.png';

const StoreInfo: React.FC = () => {
    const [is24h, setIs24h] = useState(true);
    const [is7d, setIs7d] = useState(false);
    const [is30d, setIs30d] = useState(false);
    
    const focus24hTab = () => {
        setIs24h(true);
        setIs7d(false);
        setIs30d(false);
    }

    const focus7dTab = () => {
        setIs24h(false);
        setIs7d(true);
        setIs30d(false);
    }

    const focus30dTab = () => {
        setIs24h(false);
        setIs7d(false);
        setIs30d(true);
    }

    return (
        <div className=''>
            <div className='border rounded-t-lg'>
                <Tab $focus={is24h} onClick={focus24hTab}>Last 24h</Tab>
                <Tab $focus={is7d} onClick={focus7dTab}>7 Days</Tab>
                <Tab $focus={is30d} onClick={focus30dTab}>30 Days</Tab>
            </div>
            <div className='border rounded-b-lg pl-[72px] pr-[32px] pt-[10px] pb-[8px] shadow-xl shadow-gray-200'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='flex-1 flex items-center gap-[4px] pt-[16px] pb-[8px]'>
                        <img src={ChartImg} width={48} />
                        <div className='flex flex-col font-bold'>
                            <p className='text-[10px] text-[#6d7079]'>TOTAL SALES</p>
                            <p className='text-[28px] text-[#212b36]'>574</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center gap-[4px] pt-[16px] pb-[8px]'>
                        <img src={CoinImg} width={48} />
                        <div className='flex flex-col font-bold'>
                            <p className='text-[10px] text-[#6d7079]'>TOTAL MMC VOLUME</p>
                            <p className='text-[28px] text-[#212b36]'>3.52M</p>
                        </div>
                    </div>
                    <div className='flex-1 flex items-center gap-[4px] pt-[16px] pb-[8px]'>
                        <img src={EarthImg} width={48} />
                        <div className='flex-col font-bold'>
                            <p className='text-[10px] text-[#6d7079]'>LAND PARCELS SOLD</p>
                            <p className='text-[28px] text-[#212b36]'>412</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tab = tw.button`
    ${(p: any) => (p.$focus
        ? 'border-b-darkgreen text-black'
        : 'border-b-white text-[#8f929c]'
    )}
    px-[16px]
    py-[8px]
    border-b-[2px]
`

export default StoreInfo;