import React, { useState, useEffect } from 'react'
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';
import { Select, Option } from "@material-tailwind/react";
import type { SelectOptionProps } from "@material-tailwind/react";
import CreateMarket from './CreateMarket';
import ImageLoader from '@/components/custom/skeleton/ImageLoader';
import { CountryDropdown } from 'react-country-region-selector';
import ImageGrid from './ImageGrid';
import { getMarketAll } from '@/api/market';
import { useAuthContext } from '@/context/AuthContext';

import { FiPlusCircle } from "react-icons/fi";

export default function MyMarketHome({ isSelectedButton, selectButton, selectMarket }) {
    const {user} = useAuthContext();
    const [allmarket, setAll] = useState([])
    const [markets, setMarket] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')

    const updateStateButton = (val) => {
        selectButton(val);
    }
    const updateMarket = (val) => {
        selectMarket(val)
    }
    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
    const [isOpenCreateMarket, setIsOpenCreateMarket] = useState<boolean>(false)

    const onOpenCreate = () => {
        setIsOpenCreateMarket(true);
    }
    const onCloseCreate = () => {
        setIsOpenCreateMarket(false);
    }

    const [productDetail, setProductDetail] = useState(0)
    const productSelect = (number) => {
        setProductDetail(number)
    }

    const load = () => {
        getMarketAll()
            .then((res: any) => {
                setAll(res)
                setMarket(res);

            })
    }

    useEffect(() => {
        if(user)
            load();
    }, [user])

    useEffect(() => {
        if(user) {
            setLocation(user.country)
        }
    }, [user])

    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="font-sans font-extrabold text-[23px]">Marketplace</h3>
                <Button variant="default" className="gap-5 rounded-full" onClick={onOpenCreate}>
                    <FiPlusCircle className="scale-150" />
                    Create
                </Button>
                <CreateMarket open={isOpenCreateMarket} onClose={onCloseCreate} />
            </div>
            {isLoading ? <ImageGrid numbers={markets} updateStateButton={updateStateButton} updateMarket={updateMarket} /> : <ImageGrid numbers={markets.slice(0, 5)} updateStateButton={updateStateButton} updateMarket={updateMarket} />}
            {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {numbers.map((number) => (
                    <div key={number} className="relative col-span-1 items-center" onClick={() => updateStateButton(number)}>
                    <img src={`/images/marketplace/image${number}.png`} className="w-full h-auto rounded-lg" alt=""/>
                    <div className="absolute rounded-sm py-2 px-4 top-3 text-white left-5 bg-[#ED1F24] font-poppins font-bold text-xs">Sold</div>
                    <div className="absolute rounded-sm py-2 px-4 top-3 text-[#E8E8E8] right-5 bg-black font-poppins font-medium text-xs">$18,000</div>
                    <div className="absolute bottom-3 left-5 flex flex-col gap-3">
                        <h3 className="font-popins font-bold text-xs text-white">Samsung A57</h3>
                        <p className="font-poppins font-normal text-xs text-[#E4E4E4] w-full pr-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                    </div>
                    </div>
                ))}
                </div> */}
            <div className="flex justify-center">
                {markets.length >= 6 && <Button
                    className="mt-3 rounded-full"
                    onClick={() => { setLoading(true) }}
                >
                    Load More
                </Button>}

            </div>
        </>
    )
}
