import React from 'react';
import GreenhouseImg from '../assets/svgs/green_house.png';

const Card: React.FC = () => {
    return (
        <div className='w-[244px] h-[394px] py-[16px] border rounded-[16px] shadow-gray-200 shadow-2xl'>
            <div className='flex flex-row items-center px-[16px]'>
                <div className='flex-1'>
                    <p>1123 W 5th St.</p>
                    <p className='text-[11px]'>Southampton, New Your, 11968</p>
                    <p className='text-[11px]'>United States</p>
                </div>
                <img src={GreenhouseImg} width={30} />
            </div>
            <div className='w-full h-[2px] bg-green'></div>
            <div></div>
        </div>
    );
};

export default Card;