import MButton from "../components/MButton";
import CoinImg from '../../assets/pngs/mmc.png';
import { useCallback, useEffect, useMemo, useState } from "react";
import tokenProductApi from "../../modules/api/tokenProduct";
import { TokenProduct } from "../../types/models/tokenProduct";
import useApi from "../../hooks/useApi";
import tokenPurchaseApi from "../../modules/api/tokenPurchaseApi";
import { URLSearchParamsInit, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../store";
import { getSession } from "../../store/reducers/session";
import { GridLoader } from "react-spinners";
import { useCookies } from "react-cookie";

const PurchaseToken = () => {
    const [tokenProducts, setTokenProducts] = useState<TokenProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState(true);
    const [purchaseLoading, setPurchaseLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { apiErrorHandler } = useApi();

    const fromUrl = useMemo(() => searchParams.get('fromUrl'), [searchParams]);
    const [cookies, setCookie] = useCookies(['mm_from_url']);

    const fetchData = useCallback(() => {
        if (loading) return;
        setLoading(true);
        tokenProductApi.get()
        .then((response: TokenProduct[]) => {
            setTokenProducts(response);
        })
        .catch(apiErrorHandler)
        .finally(() => {
            setLoading(false);
        })
    }, [apiErrorHandler, loading]);

    const tokenPurchaseStep1 = useCallback((tokenProductId: string) => {
        if (purchaseLoading) return;
        setPurchaseLoading(true);
        tokenPurchaseApi.step1(tokenProductId)
        .then(response => {
            const { tokenPurchaseId, redirect } = response;
            let returnUrl = window.location.origin + `/token_purchase?tokenPurchaseId=${tokenPurchaseId}`
            const redirectUrl = redirect + '?flow=purchase&returnurl=' + returnUrl;
            if (fromUrl) {
                setCookie('mm_from_url', fromUrl);
            }
            window.location.href = redirectUrl;
        })
        .catch(e => {
            setPurchaseLoading(false);
            apiErrorHandler(e);
        });
    }, [apiErrorHandler, fromUrl, purchaseLoading, setCookie]);

    const tokenPurchaseStep2 = useCallback((tokenPurchaseId: string, paymentMethodId: string) => {
        tokenPurchaseApi.step2(tokenPurchaseId, paymentMethodId)
        .then(() => {
            toast.success('Successfully bought MMC');
            dispatch(getSession());
        })
        .catch(apiErrorHandler)
        .finally(() => {
            setPurchaseLoading(false);
        });
    }, [apiErrorHandler, dispatch]);

    const handleBack = useCallback(() => {
        if (fromUrl) {
            navigate(fromUrl);
        } else {
            return navigate('/');
        }
    }, [fromUrl, navigate])

    useEffect(() => {
        if (initial) {
            setInitial(false);
            fetchData();
        }
    }, [fetchData, initial, purchaseLoading, searchParams, setSearchParams, tokenPurchaseStep2])

    useEffect(() => {
        if (purchaseLoading) return;
        const returnedPurchaseId = searchParams.get('tokenPurchaseId');
        if (returnedPurchaseId && !purchaseLoading) {
            const state = searchParams.get('state');
            const paymentMethodId = searchParams.get('id');
            let queryParams: URLSearchParamsInit = {};
            if (cookies.mm_from_url) {
                queryParams.fromUrl = cookies.mm_from_url;
                setCookie('mm_from_url', null);
            }
            setSearchParams(queryParams);
            if (state !== 'complete' || !paymentMethodId) {
                toast.error('Tilia payment failed');
                return;
            }

            setPurchaseLoading(true);
            tokenPurchaseStep2(returnedPurchaseId, paymentMethodId!);
        }
    }, [cookies.mm_from_url, fromUrl, purchaseLoading, searchParams, setCookie, setSearchParams, tokenPurchaseStep2])

    return (
        <div className="w-full flex justify-center mb-28">
            <section className="mt-16 md:mt-32 w-full max-w-screen-lg px-2 flex items-center flex-col gap-y-4">
                <div className="w-full max-w-xl">
                    <button 
                        className="inline-flex items-center w-fit py-2 px-4 text-sm font-bold text-green bg-white border-green border-[1px] rounded-lg mb-1"
                        onClick={handleBack}
                    >
                        <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                        Back
                    </button>
                </div>
                {tokenProducts.map(tokenProduct => (
                    <div key={tokenProduct.id} className="flex items-center justify-between p-6 w-full max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                        <div className="flex space-x-5 items-center">
                            <img src={CoinImg} className="w-16" alt="MMC token" />
                            <div className="text-xl">{tokenProduct.amount.toLocaleString()} MMC</div>
                        </div>
                        <div>
                            <MButton className="px-[16px] py-[6px] rounded-[8px] w-24 bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg"
                                onClick={() => tokenPurchaseStep1(tokenProduct.id)}
                            >
                                $ {tokenProduct.price}
                            </MButton>
                        </div>
                    </div>
                ))}
            </section>
            {purchaseLoading &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center">
                    <GridLoader size={30} color="#007b55" />
                </div>
            }
        </div>
    )
}
export default PurchaseToken;