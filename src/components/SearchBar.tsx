import React from 'react';

const SearchBar: React.FC = () => {
    return (
        <div className='flex flex-col gap-[32px] min-w-[280px] h-screen mt-[64px] p-[24px] border-r fixed invisible sm:visible'>
            <div className='flex justify-between'>
                <p className='font-bold text-[20px] text-black'>Filter</p>
                <button className='px-[8px] py-[6px] bg-white hover:bg-green/10 rounded-[8px]'>
                    <p className='font-bold text-green'>Clear</p>
                </button>
            </div>
            <div className='flex flex-col gap-[12px]'>
                <p className='text-[24px]'>Lot Preference</p>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Land Only</p>
                </div>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Structure (s)</p>
                </div>
            </div>
            <div className='flex flex-col gap-[12px]'>
                <p className='text-[24px]'>Structure Type</p>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Residential</p>
                </div>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Multi - Unit</p>
                </div>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Apartment</p>
                </div>
                <div className='flex gap-[8px]'>
                    <input type='checkbox' className='w-[24px] h-[24px] accent-green' />
                    <p className='text-[18px]'>Commercial</p>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;