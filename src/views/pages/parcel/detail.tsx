import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ParamType } from "../../../types/common";
import MMC from '../../../assets/pngs/mmc.png';
import { ConnectWalletButton } from "../../components/Navbar";
import { ParcelData } from "../../../types/models/parcel";
import parcelApi from "../../../modules/api/parcel";
import useApi from "../../../hooks/useApi";
import { ContractNames, getContract } from "../../../modules/web3/wallet";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setMMCBalance } from "../../../store/reducers/mymeta";
import { BeatLoader } from "react-spinners";
import { Web3Context } from "../../../store/providers/Web3Provider";

const ParcelDetail = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<ParamType>();
    const [data, setData] = useState<ParcelData>();
    const [loading, setLoading] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [init, setInit] = useState(true);
    const { walletAddress, ethersProvider } = useContext(Web3Context);

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
    }, [apiErrorHandler, id, loading])
    useEffect(() => {
        if (init) {
            setInit(false);
            handleLoad();
        }
    }, [handleLoad, init])
    const updateBalance = useCallback(async () => {
        if (!walletAddress) return;
        const mmcContract = getContract(ethersProvider, ContractNames.MMC);
        console.log(walletAddress);
        const response = await mmcContract.balanceOf(walletAddress);
        dispatch(setMMCBalance(Number(response)));
    }, [dispatch, walletAddress]);

    const handleBuy = useCallback(async () => {
        if (!walletAddress) return;
        if (!data || !data.tokenId || buyLoading) return;
        setBuyLoading(true);
        const mmMarket = getContract(ethersProvider, ContractNames.MMMarket);
        const mmLand = getContract(ethersProvider, ContractNames.MMLand);
        try {
            let tx = await mmMarket.buyItem(mmLand.address, data?.tokenId)
            let res = await tx.wait();
            if (res.transactionHash) {
                const response = await parcelApi.bought(data!.id, { ownerAddress: walletAddress, tokenId: data!.tokenId})
                toast.success(`Congrat!! You are the owner of ${data!.address}`);
                setData(response);
                updateBalance();
                return;
            } else {
                console.log('buy result', res);
            }
        } catch(e) {
            apiErrorHandler(e);
        }
        setBuyLoading(false);
    }, [apiErrorHandler, buyLoading, data, updateBalance, walletAddress]);


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
                                {walletAddress &&
                                    <ConnectWalletButton onClick={handleBuy}>
                                        {buyLoading &&
                                            <BeatLoader size={10} color='#eee' loading={buyLoading} />
                                        }
                                        {!buyLoading &&
                                            'Buy Now'
                                        }
                                    </ConnectWalletButton>
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
                                <p className="text-[17px] overflow-hidden">{data.ownerAddress}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-gray-500">square</p>
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