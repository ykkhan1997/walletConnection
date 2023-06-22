'use client'
import React,{useEffect, useState} from 'react'
import { ethers} from 'ethers';
import Web3Modal from 'web3modal';
import { ethereumLogo,nftmonkey } from '@/assets';
import Image from 'next/image';

const WalletConnection = () => {
  const [currentAccount,setCurrentAccount]=useState("");
  const [connect,setConnect]=useState(false);
  const [balance,setBalance]=useState('');
  const FailMessage="Please Install metamask and connect";
  const successMessage="Your Account successfully connect to metamask";
  const provider=new ethers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/qf9npJaz3pDn7cOG4grAQlilUN88hOd4"
  );
  const checkIfwalletConnected=async()=>{
    if(window.ethereum===null){
      console.log("MetaMask not installed; using read-only defaults");
      return FailMessage;
    }else{
      const accounts=await window.ethereum.request({method:"eth_accounts"});
      if(accounts.length>0){

        setCurrentAccount(accounts[0]);
      }
    }
    const address="0x9C9ADCEC87EC70dfAd405582185f204D37597DB7";
    const getBalance=await provider.getBalance(address);
    const showBalance=ethers.formatEther(getBalance);
    console.log(balance);
    setBalance(showBalance);
  };
  const CWallet=async()=>{
    if(!window.ethereum)return console.log(FailMessage);
    const accounts=await window.ethereum.request({method:"eth_requestAccounts"});
    setCurrentAccount(accounts[0]);
    window.location.reload();
  }
  useEffect(()=>{
    checkIfwalletConnected();
  },[]);
  useEffect(()=>{

    async function accountChanged(){
      window.ethereum.on("accountsChanged",async function(){

        const accounts=await window.ethereum.request({method:"eth_accounts"});

        if(accounts.length){
          setCurrentAccount(accounts[0]);
        }else{
          window.location.reload();
        }
      })
    }
    accountChanged();
  },[]);
  return (
    <div className='flex justify-center items-center flex-col bg-[#2d0036] bg-gradient-to-tr from-[#730283] to-[#9a02ac] min-h-[100vh]'>
    <div className='justify-center items-center p-10 bg-[#231e39] rounded-[25px] text-[#b3b8cd]'>
      {!currentAccount?"":<span className='ml-[-10px] mt-10 bg-orange-500 pt-1 pb-1 pr-3 pl-3 rounded-xl'>Pro</span>}
      <Image src={nftmonkey} alt='nft-monkey' width={80} height={80} className='flex justify-center items-center'/>
      <h3 className='text-[16px] leading-[30px]'>Check Ether</h3>
      {
        !currentAccount?(
          <div>
            <div className='message'>
              <p>{FailMessage}</p>
            </div>
            <Image src={ethereumLogo} alt='ether-logo' width={100} height={100}/>
            <p className="p">Welcome to ether account balance checker</p>
          </div>
        ):(
          <div>
            <h6 className='h6'>Verified <span className='tick'>&#100004</span></h6>
            <p>Ether account and balance checker<br/>find account details</p>
            <div className='buttons'>
              <button className='primary ghost' onClick={()=>{}}>Enter account details</button>
            </div>
          </div>
        )
      }
      {
        !currentAccount && ! connect?(
          <div className='buttons'>
            <button className='primary' onClick={CWallet}>Connect Wallet</button>
          </div>
        ):(
          <div className='skills'>
            <h6 className='h6'>Your Ether</h6>
            <ul>
              <li>Account</li>
              <li>{currentAccount}</li>
              <li>Balance</li>
              <li>{balance}</li>
            </ul>
          </div>
        )

      }
    </div>
    </div>
  )
}

export default WalletConnection;