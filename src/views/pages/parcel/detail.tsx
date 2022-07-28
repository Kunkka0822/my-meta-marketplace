import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ParamType } from "../../../types/common";
import MMC from '../../../assets/pngs/mmc.png';
import { ParcelData, PropertyStatus } from "../../../types/models/parcel";
import parcelApi from "../../../modules/api/parcel";
import useApi from "../../../hooks/useApi";
import { BeatLoader } from "react-spinners";
import MButton from "../../components/MButton";

const ParcelDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<ParamType>();
    const [data, setData] = useState<ParcelData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [init, setInit] = useState(true);
    
    const { apiErrorHandler } = useApi();

    const handleLoad = useCallback(() => {
        if (!id || loading) return;
        setLoading(true);
        parcelApi.retrieve(id)
        .then(async response => {
            setData(response);
        })
        .catch(apiErrorHandler)
        .finally(() => setLoading(false));
    }, [apiErrorHandler, id, loading]);

    useEffect(() => {
        if (init) {
            setInit(false);
            handleLoad();
        }
    }, [handleLoad, init])
    
    const handleBuy = useCallback(async () => {
        if (!data || !data.tokenId || buyLoading) return;
        setBuyLoading(true);
        parcelApi.buy(data.id, )
        setBuyLoading(false);
    }, [buyLoading, data]);


    return (
        <div className="grid grid-cols-2 gap-1 mt-[100px] max-w-[900px] mx-auto">
            {data && 
                <>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col gap-1">
                            <button 
                                className="inline-flex items-center w-fit py-2 px-4 text-sm font-bold text-green bg-white border-green border-[1px] rounded-lg mb-1"
                                onClick={() => navigate(-1)}
                            >
                                <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                                Back
                            </button>
                            <p className="text-[18px]">{data.address}</p>
                            <p className="text-gray-500 text-[16px]"># {data.id}</p>
                        </div>
                        <img src={data.image} alt="" className="w-full py-5" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <img src={MMC} alt="" className="w-6 h-6" />
                                    <p className="text-[22px] font-[600]">{data.price} MMC</p>
                                </div>
                                <p className="text-[18px]">≈ {data.price * 0.001} USD</p>
                            </div>
                            <div className="flex my-auto mx-4">
                                {data && data.status === PropertyStatus.ONSALE &&
                                    <MButton onClick={handleBuy} className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                        {buyLoading &&
                                            <BeatLoader size={10} color='#eee' loading={buyLoading} />
                                        }
                                        {!buyLoading &&
                                            'Buy Now'
                                        }
                                    </MButton>
                                }
                                {data && data.status === PropertyStatus.UNMINTED &&
                                    <MButton onClick={handleBuy} className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                        {buyLoading &&
                                            <BeatLoader size={10} color='#eee' loading={buyLoading} />
                                        }
                                        {!buyLoading &&
                                            'Mint Now'
                                        }
                                    </MButton>
                                }
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
                                <p className="text-[17px] overflow-hidden">
                                    {data && data.owner &&
                                        data.owner.name
                                    }
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">Parcel Size</p>
                                <p className="text-[17px] overflow-hidden">{data.square}ms<sup>2</sup></p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default ParcelDetail;