import { isArray } from "lodash";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getParcelById, ParcelState, reset } from "../../../store/reducers/parcel";
import { ID } from "../../../types/common";
import LandImg from '../../../assets/svgs/product.png';
import MMC from '../../../assets/svgs/coin.png';
import { ConnectWalletButton } from "../../components/Navbar";

const ParcelDetail = () => {
    const { id } = useParams();
    const { data: parcel, loading, initial } = useAppSelector<ParcelState>(state => state.parcel);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isArray(parcel)) {
            dispatch(reset());
        } else if (!loading && !parcel) {
            dispatch(getParcelById(id as ID));
        }
    }, [parcel]);

    return (
        <div className="grid grid-cols-2 gap-1 mt-[100px] max-w-[900px] mx-auto">
            {parcel && !isArray(parcel) && 
                <>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col gap-1">
                            <button 
                                className="inline-flex items-center w-fit py-2 px-4 text-sm font-bold text-green bg-white border-green border-[1px] rounded-lg mb-1"
                                onClick={() => navigate('/')}
                            >
                                <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                Back
                            </button>
                            <p className="text-[18px]">{parcel.address}</p>
                            <p className="text-gray-500 text-[16px]"># {parcel.id}</p>
                        </div>
                        <img src={LandImg} alt="" className="w-full py-5" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <img src={MMC} alt="" className="w-6 h-6" />
                                    <p className="text-[22px] font-[600]">{parcel.price} MMC</p>
                                </div>
                                <p className="text-[18px]">≈ {parcel.price * 0.001} USD</p>
                            </div>
                            <div className="flex my-auto mx-4">
                                <ConnectWalletButton>Buy Now</ConnectWalletButton>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-[1px] border-gray-200 p-8 m-3 rounded-lg">
                            <div className="flex flex-col">
                                <p className="text-gray-500">generation</p>
                                <p className="text-[12px] text-darkgreen rounded-full border-green border-[1px] py-1 px-2 w-fit">alpha</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">type</p>
                                <p className="text-[17px]">Land</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">owner</p>
                                <p className="text-[17px] overflow-hidden">{parcel.ownerAddress}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">square</p>
                                <p className="text-[17px] overflow-hidden">{parcel.square}ms<sup>2</sup></p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default ParcelDetail;