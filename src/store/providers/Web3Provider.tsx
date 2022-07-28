import { providers } from "ethers";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { createContext, useEffect, useState } from "react";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: process.env.REACT_APP_INFURA_ID,
        }
    },
};

const contextDefaultValues = {
    walletLoading: false,
    walletAddress: '',
    provider: null,
    isReady: false,
    ethersProvider: null,
    connectWallet: async (): Promise<any | undefined> => { return; },
    disconnectWallet: () => {},
};

const web3Modal = new Web3Modal({
    cacheProvider: true, 
    network: "mainnet",
    providerOptions,
});

export const Web3Context = createContext(contextDefaultValues);

export default function Web3Provider({ children }: { children: any }) {
    const [walletLoading, setWalletLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState(contextDefaultValues.walletAddress);
    const [provider, setProvider] = useState(contextDefaultValues.provider);
    const [ethersProvider, setEthersProvider] = useState(contextDefaultValues.ethersProvider);
    const [isReady, setIsReady] = useState(contextDefaultValues.isReady);

    function initializeWeb3() {
        setWalletLoading(contextDefaultValues.walletLoading);
        setWalletAddress(contextDefaultValues.walletAddress);
        setProvider(contextDefaultValues.provider);
        setIsReady(contextDefaultValues.isReady);
        setEthersProvider(null);
    }

    async function connectWallet () {
        if (! web3Modal) return;
        setWalletLoading(true);

        const provider = await web3Modal.connect();

        addListeners(provider);

        const ethersProvider = new providers.Web3Provider(provider);
        const userAddress = await ethersProvider.getSigner().getAddress()

        setProvider(provider);
        setEthersProvider(ethersProvider as any);
        setWalletAddress(userAddress);
        setWalletLoading(false);

        return {address: userAddress, provider: ethersProvider};
    }

    async function addListeners(web3ModalProvider: any) {

        web3ModalProvider.on("accountsChanged", (accounts: string[]) => {
          window.location.reload()
        });
        
        web3ModalProvider.on("chainChanged", (chainId: number) => {
          window.location.reload()
        });

        web3ModalProvider.on("networkChanged", (networkId: number) => {
            window.location.reload()
        });
    }

    function disconnectWallet() {
        web3Modal.clearCachedProvider();
        initializeWeb3();
    }

    useEffect(() => {
        (async () => {
            if(web3Modal && web3Modal.cachedProvider){
                await connectWallet()
            }
            else initializeWeb3();
        })(); 
    }, [web3Modal])

    return (
        <Web3Context.Provider value={{
            walletLoading,
            walletAddress,
            provider,
            isReady,
            ethersProvider,
            connectWallet,
            disconnectWallet,
        }}>
            { children }
        </Web3Context.Provider>
    )
}