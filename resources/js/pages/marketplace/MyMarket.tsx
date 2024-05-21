import React from 'react'
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';
import { Select, Option } from "@material-tailwind/react";
import { useState } from 'react';

import MyMarketHome from './MyMarketHome';
import MarketDetail from './MarketDetail';



export default function MyMarket() {
  const [isSelectedButton, setIsSelectedButton] = useState(0);
  const [market, setMarket] = useState({})
  const selectButton = (buttonIndex) => {
    console.log(buttonIndex, "////////////////////////////////");
    setIsSelectedButton(buttonIndex);
  }
  const selectMarket = (item) => {
    console.log(item)
    setMarket(item)
  }
  return (
    <div className="flex-1 bg-dashboard-background w-full mainBody">
      <div className="mt-10 sm:px-10 px-2 w-full h-full flex flex-col gap-8">
        <div className="rounded-t-full">
          <img src="/images/home/marketplace-ad.png" className="w-full h-auto rounded-tr-3xl rounded-tl-3xl cursor-pointer" alt="" onClick={() => window.open("http://971shop.com/", '_blank')}/>
        </div>
        {isSelectedButton == 0 ?
          <MyMarketHome isSelectedButton={isSelectedButton} selectButton={selectButton} selectMarket={selectMarket} /> : <MarketDetail isSelectedButton={isSelectedButton} selectButton={selectButton} market={market} />}

      </div>
    </div>
  )
}
