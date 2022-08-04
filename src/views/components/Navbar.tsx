import React, { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import Logo from "../../assets/pngs/logo.png";
import { useAppDispatch, useAppSelector } from "../../store";
import { BeatLoader } from "react-spinners";
import { ContractNames, getContract } from "../../modules/web3/wallet";
// import { walletSelector } from '../../store/selectors/wallet';
// import { setWalletAddress, setWalletLoading } from '../../store/reducers/wallet';
import { truncateAddress } from "../../helpers/web3";
import { toast } from "react-toastify";
import { setMMCBalance } from "../../store/reducers/mymeta";

import { Web3Context } from "../../store/providers/Web3Provider";
import MButton from "./MButton";
import { sessionSelector } from "../../store/selectors/session";
import { SessionState } from "../../store/reducers/session";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isBurgerVisible, setBurgerVisible] = useState(false);

  const { data: session } = useAppSelector<SessionState>(sessionSelector);


  return (
    <div className="flex items-center justify-between w-full h-[64px] px-[24px] bg-white shadow-lg fixed z-10">
      {/* <p className='font-black text-2xl'>MetaStore</p>     */}
      <img
        src={Logo}
        alt=""
        className="h-[64px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div
        className={`sm:flex sm:flex-row sm:static sm:bg-transparent bg-white/50 items-center sm:gap-[24px] absolute flex flex-col top-0 left-0 sm:w-auto sm:h-auto sm:backdrop-blur-none sm:p-0 pt-[100px] w-screen h-screen backdrop-blur-md ${
          isBurgerVisible ? "block" : "hidden"
        }`}
      >
        {session && (
          <div className="text-md">
            Balance:{" "}
            <strong>
              {session.balances.mmcSpendable.toLocaleString()} MMC
            </strong>
          </div>
        )}
        <button
          onClick={() => {
            setBurgerVisible(false);
          }}
          className="hover:bg-gray-100 text-gray-600 sm:hidden block rounded-full p-1 absolute top-[10px] right-[24px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Button>
          <p>Property</p>
        </Button>
        <Button>
          <p>Items</p>
        </Button>
        {/* <ConnectWalletButton onClick={handleConnect}>
          {walletConnectStatus === "loading" && (
            <BeatLoader size={10} color="#eee" loading={walletLoading} />
          )}
          {walletConnectStatus === "not_connected" && "Connect Wallet"}
          {walletConnectStatus === "connected" &&
            truncateAddress(walletAddress)}
        </ConnectWalletButton> */}

        <MButton
          className="px-[16px] py-[6px] rounded-[8px] bg-green hover:bg-darkgreen text-white font-bold shadow-green-200 shadow-lg"
          onClick={() => {
            setBurgerVisible(false);
            navigate('/token_purchase');
          }}
        >
          Get MMC
        </MButton>
      </div>
      <button
        className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75 sm:hidden block"
        onClick={() => {
          setBurgerVisible(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export const Button = tw.button`
    px-[8px]
    py-[6px]
    rounded-[8px]
    hover:bg-green/10
    sm:w-auto
    w-[150px]
    text-green
    font-bold
`;

export const ConnectWalletButton = tw.button`
    px-[16px]
    py-[6px]
    rounded-[8px]
    bg-green
    hover:bg-darkgreen
    text-white
    font-bold
    shadow-green-200
    sm:shadow-lg
    shadow-none
    sm:w-auto
    w-[150px]
`;

export default Navbar;
