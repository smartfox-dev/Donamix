import React, { useState, useEffect } from 'react'
import { Button, buttonVariants, ButtonProps } from '@/components/ui/button';
import { Select, Option } from "@material-tailwind/react";
import type { SelectOptionProps } from "@material-tailwind/react";
import CreateMarket from './CreateMarket';
import ImageLoader from '@/components/custom/skeleton/ImageLoader';
import { CountryDropdown } from 'react-country-region-selector';
import ImageGrid from './ImageGrid';
import { getAll } from '@/api/market';
import { useAuthContext } from '@/context/AuthContext';

import { FiPlusCircle } from "react-icons/fi";

const categories = [
    'Apparel & Accessories',
    'Electronics & Gadgets',
    'Home & Garden',
    'Health & Beauty',
    'Books & Media',
    'Toys & Games',
    'Sports & Fitness',
    'Arts & Crafts',
    'Automotive',
    'Baby & Kids',
    'Collectibles & Antiques',
    'Food & Beverages',
    'Jewelry & Watches',
    'Pet Supplies',
    'Services & Freelancers',
];

export default function MarketHome({ isSelectedButton, selectButton, selectMarket }) {
    const { user } = useAuthContext();
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
        getAll()
            .then((res: any) => {
                setAll(res)
                const temp = []
                res.forEach(item => {
                    if (item.location === user.country) {
                        temp.push(item)
                    }
                });
                console.log(temp)
                setMarket(temp);

            })
    }

    useEffect(() => {
        if (user)
            load();
    }, [user])

    useEffect(() => {
        if (user) {
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
                <CreateMarket open={isOpenCreateMarket} onClose={onCloseCreate} categories={categories}/>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                <div className="col-span-1">
                    <CountryDropdown
                        value={location}
                        name="country"
                        onChange={(val) => {
                            setLocation(val);
                            const temp = []
                            allmarket.forEach(item => {
                                if (item.location == val) {
                                    temp.push(item)
                                }
                            });
                            console.log(temp)
                            setMarket(temp);
                        }}
                        classes="p-2 h-[42px] bg-secondary placeholder:text-sm rounded-lg border border-black-500 w-full"
                    />
                </div>
                <div className="col-span-1">
                    <Select variant="outlined" label="Choose Categories" className="p-5 rounded-lg bg-white font-bold text-[15px] min-w-0" value={category} onChange={(e) => {
                        setCategory(e);
                        const temp = []
                        allmarket.forEach(item => {
                            if (item.category == e && item.location == location) {
                                temp.push(item)
                            }
                        });
                        console.log(temp)
                        setMarket(temp);
                    }}>
                        {categories.map((item, index) => (
                            <Option key={index} value={item}>{item}</Option>
                        ))}
                    </Select>
                </div>
                <div className="col-span-1">
                    <Select variant="outlined" label="Price" className="p-5 rounded-lg bg-white font-bold text-[15px] min-w-0" value={price} onChange={(e) => {
                        setPrice(e);
                        const temp = []
                        allmarket.forEach(item => {
                            if (e == '50' && item.location == location) {
                                if (item.price >= 50 && item.price < 100)
                                    temp.push(item)
                            }
                            else if (e == '100' && item.location == location) {
                                if (item.price >= 100 && item.price < 1000)
                                    temp.push(item)
                            }
                            else if (e == '1000' && item.location == location) {
                                if (item.price >= 1000)
                                    temp.push(item)
                            }
                        });
                        console.log(temp)
                        setMarket(temp);
                    }}>
                        <Option value='50'>50 to 100$</Option>
                        <Option value='100'>100 to 1,000$</Option>
                        <Option value='1000'>more than 1,000$</Option>
                    </Select>
                </div>
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
