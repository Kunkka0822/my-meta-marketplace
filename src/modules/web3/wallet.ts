import Onboard from 'bnc-onboard';
import { ethers } from 'ethers';
import { WalletAddress } from '../../types/models/wallet';
import MMCAbi from './abis/MMC.json';
import MMLandAbi from  './abis/MMLand.json';
import MMMarketAbi  from './abis/MMMarket.json';

export enum ContractNames {
    MMC = 'MMC',
    MMLand = 'MMLand',
    MMMarket = 'MMMarket'
} 

const wallets = [
    { walletName: "metamask"}
];

let walletProvider: any;

const onboard = Onboard({
    networkId: parseInt(process.env.REACT_APP_CHAINID!),
    hideBranding: true,
    walletSelect: {
        wallets
    },
    subscriptions: {
        wallet: (wallet) => {
            walletProvider = wallet.provider;
            console.log(`${wallet.name} is now connected`);
        }
    }
});

export const connectWallet =  async (): Promise<WalletAddress> => {
    const currentState = onboard.getState();
    if(currentState["address"] != null) {
        return {
            address: currentState["address"],
            status: "👆🏽 Mint your GG Now.",
        }
    }
    const walletSelected = await onboard.walletSelect();
    if (walletSelected !== false) {
        const walletCheck = await onboard.walletCheck();
        if (walletCheck === true) {
            const currentState = onboard.getState();
            return {
                address: currentState["address"],
                status: "",
            }
        } else {
            return {
                address: "",
                status: "Connect your wallet account to the site.",
            }
        }
    }
    return {
        address: '',
        status: 'Wallet not selected'
    }
}

export const disConnectWallet = (): WalletAddress => {
    onboard.walletReset()
    return {
        address: "",
        status: "Connect your wallet account to the site.",
    }
}

export const getCurrentWalletConnected = async (): Promise<WalletAddress> => {
    const currentState = onboard.getState();
    console.log('onboard state', currentState);

    if(currentState["address"] != null) {
        return {
            address: currentState["address"],
            status: "",
        }
    } else {
        return {
            address: "",
            status: "",
        }
    }
}

export const getContract = (contractName: ContractNames) => {
    let abi;
    switch (contractName) {
        case ContractNames.MMC:
            abi = MMCAbi; break;
        case ContractNames.MMLand:
            abi = MMLandAbi; break;
        case ContractNames.MMMarket:
            abi = MMMarketAbi; break;
    }
    const provider = new ethers.providers.Web3Provider(walletProvider);
    const signer = provider.getSigner();
    return new ethers.Contract(abi.address, abi.abi, signer)
}
