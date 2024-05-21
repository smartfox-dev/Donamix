import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Collapsible from './Collapsible'

export const Chat = () => {
    return (
        <div className='w-full flex flex-col gap-5'>
            <Collapsible title='Donamix Chat Rules and Regulations'>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>By entering The Chat Cafe chat, you agree to be at least 13 years of age.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>You can join the chat rooms for conversations without any cost.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>There are subscription options available for Moderator, Admin, and VIP privileges.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>No phone numbers, emails or instant messaging IDs are allowed to be posted in public.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Report any suspicious activities involving chat users to a moderator or admin right away.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Do not flood the chat room or disrupt other users in any way. You will be banned if you do.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>This is a chatroom, not a place for vulgar and/or tasteless chatter so please keep things clean.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Although we do staff moderators in this chat room, they cannot be on every minute of the day.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Exercise caution. Refrain from sharing personal information, even if you trust someone.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>Hacking or exploiting the chat is illegal and will be reported to ISP/Police with our logs.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>PERMANENT server bans will be placed to users who attempt to exploit/hack our chat rooms.</p>
                </div>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>If this conversation isn't suitable for you, please join another one from the conversations page.</p>
                </div>
            </Collapsible>
            <Collapsible title={''}>
                <p className='font-sans font-normal text-base leading-8'>At The Coffee Corner, we are dedicated to celebrating the love and artistry of coffee. Whether you're a seasoned coffee connoisseur or a casual coffee drinker, this is your ultimate destination for all things coffee-related.

Discover the Best Coffee Beans: Dive into the world of coffee beans and explore a wide variety of flavors and origins. From rich and bold to smooth and delicate, we'll guide you through the different types of coffee beans and help you find your perfect cup.

Master Brewing Techniques: Unlock the secrets to brewing the perfect cup of coffee. Our expert guides will walk you through various brewing methods, such as pour-over, French press, espresso, and more. Learn the art of extraction, ratios, and brewing times to elevate your coffee game.

Cozy Café Recommendations: Explore our curated list of cozy cafés around the world. Whether you're looking for a local hidden gem or a trendy coffee shop, we've got you covered. Discover unique atmospheres, specialty brews, and friendly baristas who are passionate about their craft.

Connect with a Community of Coffee Lovers: Join our vibrant community of coffee enthusiasts from around the globe. Share your love for coffee, exchange brewing tips, and connect with like-minded individuals who appreciate the beauty of a perfectly brewed cup.

Stay Updated with the Latest Trends: From latte art to cold brew innovations, we'll keep you in the loop with the latest coffee trends. Discover new recipes, equipment, and techniques that will take your coffee experience to the next level.

We believe that coffee is more than just a beverage—it's a way of life. So, grab your favorite mug, sit back, and embark on a journey of discovery and appreciation for the world's most beloved drink. Join us today and become part of a passionate community that shares your love for coffee.</p>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-sans font-bold text-[25px] py-3'>Chat Features</h3>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Connect with people nearby, whether they're in your community or city.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Engage through comments, messages, and notifications.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Discover captivating photos and news from amazing individuals.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Elevate your experience by upgrading to VIP status.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Expand your social circle and forge new connections.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Engage in lively conversations and meet interesting people.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Enjoy chatting while listening to music simultaneously.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Share YouTube videos and images through messages.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Express yourself with stickers, emojis, and GIFs in chats.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Access your contacts directly within the chatroom.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Connect effortlessly with online users.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Personalize your profile and showcase your interests.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Surprise your contacts or members with virtual gifts.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Stay informed with a smart community message board.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Enjoy unlimited private chats.</p>
                    </div>
                    <div className='flex flex-row w-full gap-3 items-center'>
                        <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                        <p className='font-sans font-normal text-base'>Experience free video and audio chats.</p>
                    </div>
                </div>
            </Collapsible>
        </div>
    )
}
