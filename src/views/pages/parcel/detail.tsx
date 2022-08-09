import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParamType } from "../../../types/common";
import MMC from "../../../assets/pngs/mmc.png";
import { ParcelData, PropertyStatus } from "../../../types/models/parcel";
import parcelApi from "../../../modules/api/parcel";
import useApi from "../../../hooks/useApi";
import { BeatLoader, CircleLoader } from "react-spinners";
import MButton from "../../components/MButton";
import { getSession, SessionState } from "../../../store/reducers/session";
import { useAppDispatch, useAppSelector } from "../../../store";
import { sessionSelector } from "../../../store/selectors/session";

const ParcelDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<ParamType>();
    const [data, setData] = useState<ParcelData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [init, setInit] = useState(true);
    const [timer, setTimer] = useState<NodeJS.Timer>();
    const { data: session } = useAppSelector<SessionState>(sessionSelector);
    const location = useLocation();

    const lackOfBalance = useMemo(() => {
        if (!session || !data) return false;
        return session.balances.mmcSpendable < data.price;
    }, [data, session])

    const { apiErrorHandler } = useApi();

    const handleLoad = useCallback(() => {
        if (!id || loading) return;
        setLoading(true);
        parcelApi
        .retrieve(id)
        .then(async (response) => {
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
        if (data && data.status === PropertyStatus.SECURING) {
            if (!timer) {
                const timer = setInterval(handleLoad, 2000);
                setTimer(timer);
            }
        }
        return () => {
            if (timer) {
                clearInterval(timer);
                setTimer(undefined);
            }
        }
    }, [data, handleLoad, init, timer])

    
    const handleBuy = useCallback(async () => {
        if (!data || buyLoading) return;
        setBuyLoading(true);
        parcelApi.buy(data.id)
        .then(response => {
            setData(response);
            dispatch(getSession());
        })
        .catch(apiErrorHandler)
        .finally(() => {
            setBuyLoading(false);
        })
    }, [apiErrorHandler, buyLoading, data, dispatch]);

    useEffect(() => {
        if (init) {
            setInit(false);
            handleLoad();
        }
    }, [handleLoad, init]);

    return (
        <div className="flex md:flex-row flex-col justify-between gap-x-10 mt-[100px] md:max-w-4xl max-w-[344px] px-[20px] mx-auto">
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
                            <p className="md:text-[18px] text-[16px]">{data.address}</p>
                            <p className="text-gray-500 md:text-[16px] text-[14px]"># {data.id}</p>
                        </div>
                        <img src={data.image} alt="" className="w-full max-w-xs py-5" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <div className="flex flex-col">
                                <div className="flex gap-2 items-center">
                                    <img src={MMC} alt="" className="w-6 h-6" />
                                    <p className="md:text-[22px] text-[18px] font-[600]">{data.price} MMC</p>
                                </div>
                                <p className="md:text-[18px] text-[16px]">≈ {data.price * 0.001} USD</p>
                            </div>
                            <div className="flex my-auto mx-4">
                                {!session &&
                                    <MButton to="/login" className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                        Go To Login
                                    </MButton>
                                }
                                {session && lackOfBalance &&
                                    <MButton to={"/token_purchase?fromUrl=" + location.pathname} className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                        Get MMC
                                    </MButton>
                                }
                                {session && !lackOfBalance && data && data.status === PropertyStatus.ONSALE &&
                                    <MButton onClick={handleBuy} className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                        {buyLoading &&
                                            <BeatLoader size={10} color='#eee' loading={buyLoading} />
                                        }
                                        {!buyLoading &&
                                            'Buy Now'
                                        }
                                    </MButton>
                                }
                                {session && !lackOfBalance && data && data.status === PropertyStatus.UNMINTED &&
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
                        <div className="grid grid-cols-3 gap-4 border-[1px] border-gray-200 p-4 md:m-3 m-0 mb-[20px] rounded-lg">
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
                                <p className="text-[17px]">
                                    {data && data.owner &&
                                        data.owner.name
                                    }
                                    {data && data.status === PropertyStatus.SECURING &&
                                        <CircleLoader size={20} color="#007b55" />
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
