import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Collapsible from './Collapsible'

export const Travel = () => {
    return (
        <div className='w-full flex flex-col gap-5'>
            <Collapsible title='Donamix Chat Rules and Regulations'>
                <div className='flex flex-row gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>By entering The Travel Adventure Club chat, you agree to be at least 13 years of age.</p>
                </div>
                <div className='flex flex-row gap-3 items-center'>
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
            <Collapsible title={'The Travel Adventure Club! Connect with Travelers Worldwide'}>
                <p className='font-sans font-normal text-base leading-8'>Welcome to The Travel Adventure Club, the ultimate club for explorers and seekers of thrilling adventures. If you have a passion for travel and a thirst for new experiences, you've come to the right place.

                    Embark on Unforgettable Journeys: Join us as we venture to breathtaking destinations around the world. From hiking through lush rainforests to exploring ancient ruins, our carefully curated travel experiences will take you off the beaten path and create memories that will last a lifetime.

                    Discover Hidden Gems: Get ready to uncover hidden gems and secret treasures that only true adventurers know about. Our team of travel experts scours the globe to find the most unique and authentic experiences, ensuring that you have an adventure like no other.

                    Connect with Fellow Travel Enthusiasts: Share your love for travel and connect with like-minded individuals who share your passion for exploration. The Travel Adventure Club is a community of travel enthusiasts from all walks of life. Whether you're a solo traveler or prefer group adventures, you'll find a welcoming and supportive community here.

                    Expand Your Horizons: Traveling is not just about visiting new places; it's about expanding your horizons and gaining a deeper understanding of the world. Immerse yourself in different cultures, try new cuisines, and learn from the locals. The Travel Adventure Club will take you on a journey of self-discovery and personal growth.

                    Join The Travel Adventure Club today and unlock a world of thrilling adventures, hidden gems, and meaningful connections. Your next travel adventure awaits. Pack your bags, embrace the unknown, and let the journey begin!</p>
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
