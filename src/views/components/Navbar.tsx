import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Logo from '../../assets/pngs/logo.png';
import { useAppDispatch } from '../../store';
import { BeatLoader } from 'react-spinners';
import { ContractNames, getContract } from '../../modules/web3/wallet';
// import { walletSelector } from '../../store/selectors/wallet';
// import { setWalletAddress, setWalletLoading } from '../../store/reducers/wallet';
import { truncateAddress } from '../../helpers/web3';
import { toast } from 'react-toastify';
import { setMMCBalance } from '../../store/reducers/mymeta';

import { Web3Context } from '../../store/providers/Web3Provider';
import MButton from './MButton';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const { walletAddress, walletLoading, connectWallet, disconnectWallet } = useContext(Web3Context);

    const walletConnectStatus = useMemo(() => {
        if (walletLoading) return 'loading';
        if (!walletAddress) return 'not_connected';
        return 'connected'
    }, [walletAddress, walletLoading])

    const handleConnect = useCallback(() => {
        if (walletConnectStatus ==='connected') {
            disconnectWallet();
            navigator.clipboard.writeText(walletAddress);
            toast.info('Address copied');
            return;
        };

        if (walletLoading) return;
        connectWallet()
            .then((response) => {
                if (response) {
                    const mmcContract = getContract(response.provider, ContractNames.MMC);
                    console.log(response);

                    // please check here,  error is occurred.
                    mmcContract.balanceOf(response.address)
                        .then((response1: any) => {
                            console.log(response1);
                            dispatch(setMMCBalance(Number(response1)));
                        })
                }
            })
            .catch(console.error)
            .finally(() => {

            })
    }, [connectWallet, disconnectWallet, dispatch, walletAddress, walletConnectStatus, walletLoading])
    
    return (
        <div className='flex items-center justify-between w-full h-[64px] px-[24px] bg-white shadow-lg fixed z-10'>
            {/* <p className='font-black text-2xl'>MetaStore</p>     */}
            <img src={Logo} alt="" className='h-[64px] cursor-pointer' onClick={() => navigate('/')}/>
            <div className='flex items-center gap-[24px]'>
                <Button>
                    <p>Property</p>
                </Button>
                <Button>
                    <p>Items</p>
                </Button>
                {/* <ConnectWalletButton onClick={handleConnect}>
                    {walletConnectStatus === 'loading' && 
                        <BeatLoader size={10} color='#eee' loading={walletLoading} />
                    }
                    {walletConnectStatus === 'not_connected' && 'Connect Wallet'}
                    {walletConnectStatus === 'connected' && truncateAddress(walletAddress)}
                </ConnectWalletButton>  */}
                <MButton to='/purchase_token'>
                    Get MMC
                </MButton>
            </div>
      </div>
    );
};

export const Button = tw.button`
    px-[8px]
    py-[6px]
    rounded-[8px]
    bg-white
    hover:bg-green/10
    text-green
    font-bold
`

export const ConnectWalletButton = tw.button`
    px-[16px]
    py-[6px]
    rounded-[8px]
    bg-green
    hover:bg-darkgreen
    text-white
    font-bold
    shadow-green-200
    shadow-lg
`

export default Navbar;