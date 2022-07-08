import React from 'react';
import GreenhouseImg from '../assets/svgs/green_house.png';

interface CardParams{
    data: any;
}

const Card: React.FC<CardParams> = ({data}) => {
    return (
        <div className='w-[244px] h-[394px] py-[16px] border rounded-[16px] shadow-gray-200 shadow-2xl'>
            <div className='flex flex-row items-center px-[16px]'>
                <div className='flex-1'>
                    <p>{data?.building_name}</p>
                    <p className='text-[11px]'>DownTown, Los Angeles</p>
                    <p className='text-[11px]'>United States</p>
                </div>
                <img src={GreenhouseImg} width={30} alt="" />
            </div>
            <div className='w-full h-[2px] bg-green'></div>
            <div className='text-[11px] px-[16px] py-1'>
                #{data?.building_id}
            </div>
            <div className='flex justify-center bg-gray-100'>
                <img src={require(`../assets/final/${data.image_url}`)} className="h-[200px]" alt="" />
            </div>
        </div>
    );
};

export default Card;