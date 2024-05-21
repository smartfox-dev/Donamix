import React from 'react'

export default function WaitList() {
    return (
        <div className="bg-white w-full h-full">
            <div className="max-w-[1280px] m-auto w-10/12">
                <header className="xl:py-4 lg:py-3 sm:py-2 py-1">
                    <div className="w-full xl:mt-20 lg:mt-10 md:mt-4 mt-10">
                        <p className="font-medium lg:text-4xl text-3xl">
                            Be The First To Try <br />Our New Mobile App!
                        </p>
                        <h5 className=" xl:pt-12 lg:pt-8 md:pt-10 sm:pt-5 pt-4 font-open-sans font-normal xl:text-xl lg:text-lg  text-md xl:leading-[35px] lg:leading-[30px]">
                            Get Early Access now for an exclusive preview of groundbreaking features and enhanced functionality. Sign up and stay ahead of the curve!
                        </h5>
                    </div>
                </header>
                <div className="md:flex justify-between gap-4 mt-3 items-center">
                    <div className="xl:w-7/12 w-full h-auto text-center border border-[#8e8888] mb-20 rounded-xl xl:p-10 lg:p-6 sm:p-5 p-4">
                        <h2 className="xl:pt-4 lg:pt-2 pt-1 text-black font-open-sans font-medium leading-3 text-2xl">
                            Join the WaitList!
                        </h2>
                        <form className="sm:flex justify-between gap-4 sm:pt-8 pt-4">
                            <div>
                                <input type="text" className="bg-[#f5f5f5] h-[50px] w-full round border-0 rounded-full shadow-md shadow-black/25 placeholder-black/70 outline-0 px-4 py-2 text-center mb-3 required:" id="name" placeholder="Enter Your Name" />
                                <input type="email" className="bg-[#f5f5f5] h-[50px] w-full round border-0 rounded-full shadow-md shadow-black/25 placeholder-black/70 outline-0 px-4 py-2 text-center required:" id="email" placeholder="Enter Your Email" />
                            </div>
                            <div>
                                <button type="submit" className="bg-black text-white sm:text-2xl text-xl sm:mt-0 mt-3 py-2 sm:w-[120px] w-full h-full rounded-lg curosr-pointer">
                                    Join
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="xl:w-5/12 w-full md:max-w-none max-w-[400px] m-auto">
                        <img src="images/waitlist/phone2.png" alt="phone2" />
                    </div>
                </div>
                <div className=" md:flex justify-center items-end xl:mt-10 lg:mt-4 gap-8">
                    <div className="xl:w-5/12 lg:max-w-none md:max-w-[200px] w-full md:mt-0 mt-10">
                        <div className="lg:flex md:block flex m-auto md:justify-right justify-center gap-4">
                            <img className="cursor-pointer lg:w-1/2 md:w-full w-1/2" src="/images/app_store.svg" alt="App store" />
                            <img className="cursor-pointer lg:w-1/2 md:w-full w-1/2 lg:mt-0 md:mt-4 mt-0" src="/images/google_play.svg" alt="Google play" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
