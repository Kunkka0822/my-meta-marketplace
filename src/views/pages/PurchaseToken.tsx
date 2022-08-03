import MButton from "../components/MButton";
import CoinImg from '../../assets/pngs/mmc.png';
import { useCallback, useEffect, useState } from "react";
import tokenProductApi from "../../modules/api/tokenProduct";
import { TokenProduct } from "../../types/models/tokenProduct";
import useApi from "../../hooks/useApi";

const PurchaseToken = () => {
    const [tokenProducts, setTokenProducts] = useState<TokenProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [initial, setInitial] = useState(true);

    const { apiErrorHandler } = useApi();

    const fetchData = useCallback(() => {
        if (loading) return;
        tokenProductApi.get()
        .then((response: TokenProduct[]) => {
            setTokenProducts(response);
        })
        .catch(apiErrorHandler)
        .finally(() => {
            setLoading(false);
        })
    }, [apiErrorHandler, loading]);

    

    useEffect(() => {
        if (initial) {
            setInitial(false);
            fetchData();
        }
    }, [fetchData, initial])

    return (
        <div className="w-full flex justify-center">
            <section className="mt-32 w-full max-w-screen-lg px-2 flex items-center flex-col gap-y-4">
                {tokenProducts.map(tokenProduct => (
                    <div className="flex items-center justify-between p-6 w-full max-w-xl bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                        <div className="flex space-x-5 items-center">
                            <img src={CoinImg} className="w-16" alt="MMC token" />
                            <div className="text-xl">{tokenProduct.amount.toLocaleString()} MMC</div>
                        </div>
                        <div>
                            <MButton className="px-[16px] py-[6px] rounded-[8px] w-24 bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg">
                                $ {tokenProduct.price}
                            </MButton>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}
export default PurchaseToken;