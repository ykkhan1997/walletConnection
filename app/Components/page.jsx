'use client'
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Image from "next/image";
import { ethereumLogo, nftmonkey } from "@/assets";

const WalletConnection = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const FailMessage = "Please Install Metamask and Connect";
  const SuccessMessage = "You have Successfully Connected with metamask";
  const [balance, setBalance] = useState("");
  let provider;
  let showBalance;
    const checkIfWalletConnect = async () => {
        if (window.ethereum === null) {
          return FailMessage;
        } else {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
            console.log(currentAccount);
            provider = new ethers.BrowserProvider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            showBalance = ethers.formatEther(getBalance);
            setBalance(showBalance);
            console.log(showBalance);
          }
        }
      };
      const CWallet = async () => {
        if (window.ethereum == null) {
          alert(FailMessage);
        } else {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
          provider = new ethers.BrowserProvider(window.ethereum);
          const getBalance = await provider.getBalance(accounts[0]);
          showBalance = ethers.formatEther(getBalance);
          setBalance(showBalance);
          console.log(showBalance);
          window.location.reload();
        }
      };
      useEffect(() => {
        if(window.ethereum==null){
          alert(FailMessage);
        }else{
          async function accountChanged() {
            window.ethereum.on("accountsChanged", async function () {
              const accounts = await window.ethereum.request({
                method: "eth_accounts",
              });
              if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
                provider = new ethers.BrowserProvider(window.ethereum);
                const getBalance = await provider.getBalance(accounts[0]);
                showBalance = ethers.formatEther(getBalance);
                setBalance(showBalance);
                console.log(showBalance);
              } else {
                window.location.reload();
              }
            });
          }
          accountChanged();
          if (window.ethereum === null) {
            alert(FailMessage);
          } else {
            const chainId = window.ethereum.request({ method: "eth_chainId" });
            window.ethereum.on("chainChanged", handleChainChanged);
            function handleChainChanged(chainId) {
              window.location.reload();
            }
          }
        }
      }, []);

      useEffect(()=>{
        if(window.ethereum==null){
          alert(FailMessage)
        }else{
          checkIfWalletConnect();
        }
      });
      return (
        
        <div className="flex justify-center items-center bg-[#2d0036] bg-gradient-to-tr from-[#730283] to-[#9a02ac] w-full h-[100vh]">
          
          <div className="bg-[#231e39] min-h-[320px] max-h-[100%] flex justify-center items-center rounded-xl text-[#b3b8cd] p-5 pb-10">
            {balance == "" && currentAccount == "" ? (
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-[24px] leading-[30px] p-5 mt-5 font-bold">
                  Welcome to Web3 Wallet Connection
                </h1>
                <Image
                  height={150}
                  width={300}
                  alt="ethereum-logo"
                  src={ethereumLogo}
                />
                <p>Please Click the button below to connect with metamask</p>
                <button
                  onClick={CWallet}
                  className="mt-10 mb-10 bg-slate-500 p-5 rounded-xl font-bold hover:bg-sky-500"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="p-3 mt-5">
                <span className=" bg-orange-500 p-2 pr-5 pl-5 font-bold rounded-xl">
                  Pro
                </span>
                <div className="flex justify-center items-center flex-col">
                  <Image
                    height={100}
                    width={150}
                    alt="nft-monkey"
                    src={nftmonkey}
                    className="rounded-xl"
                  />
                  <h2 className="text-[18px] mt-1 font-bold">Check Your Balance</h2>
                  <h2 className="text-[15px] font-semibold">Verified</h2>
                  <p className="font-normal leading-[30.8px] mt-5 mb-5 ">
                    {SuccessMessage}
                  </p>
                  <p className="font-normal leading-[30.8px]">
                    Your Address: {currentAccount.slice(0, 15)}...
                    {currentAccount.slice(39)}
                  </p>
                  <p className="font-normal leading-[30.8px]">
                    Your Balance:{balance.slice(0, 4)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
  };

export default WalletConnection;
