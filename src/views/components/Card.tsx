import React from 'react';
import GreenhouseImg from '../../assets/svgs/green_house.png';
import { ParcelData } from '../../types/models/parcel';
import { useNavigate } from 'react-router-dom';
import Address from './Address';

export type CardParams = {
    data?: ParcelData;
}

const Card: React.FC<CardParams> = ({data}) => {
    const navigate = useNavigate();
    return (
        <div 
            className='w-[244px] h-[394px] py-[16px] border rounded-[16px] shadow-gray-200 shadow-2xl hover:scale-[1.01] transition-all ease-linear hover:drop-shadow-sm cursor-pointer'
            onClick={() => navigate('/parcels/' + data?.id)}
        >
            <div className='flex flex-row items-center px-[16px]'>
                <div className='flex-1'>
                    <p>
                        <Address address={data?.address} />
                    </p>
                </div>
                <img src={GreenhouseImg} width={30} alt="" />
            </div>
            <div className='w-full h-[2px] bg-green'></div>
            <div className='text-[11px] px-[16px] py-1'>
                #{data?.id}
            </div>
            <div className='flex justify-center bg-gray-100'>
                <img src={data?.image} className="h-[200px]" alt="" />
            </div>
        </div>
    );
};

export default Card;