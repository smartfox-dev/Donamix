import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Collapsible from './Collapsible'

export const Movie = () => {
    return (
        <div className='w-full flex flex-col gap-5'>
            <Collapsible title='Donamix Chat Rules and Regulations'>
                <div className='flex flex-row w-full gap-3 items-center'>
                    <img src='/images/home/check.svg' className="lg:w-[20px] md:w-[30px] sm:w-[30px] w-[30px] lg:h-[20px] md:h-[30px] sm:h-[30px] h-[30px]" />
                    <p className='font-sans font-normal text-base'>By entering Movie Buffs chat, you agree to be at least 13 years of age.</p>
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
            <Collapsible title="The Movie Buffs Chat Room Connect with Friends Worldwide">
                <p className='font-sans font-normal text-base leading-8'>Welcome to The Movie Buffs, your ultimate destination for all things related to movies. Whether you're a casual moviegoer or a dedicated film aficionado, you've come to the right place to indulge in your love for cinema.

In-Depth Film Reviews: Our members of passionate movie buffs provides in-depth and insightful film reviews, covering a wide range of genres, styles, and eras. From the latest blockbusters to hidden gems, we'll help you navigate the vast world of movies and make informed choices about what to watch.

Personalized Recommendations: Looking for your next movie night pick? The Movie Buffs have got you covered. Our personalized recommendation takes into account your preferences, previous movie ratings, and viewing history to suggest films that match your taste. Discover new movies that you'll love and expand your cinematic horizons.

Engage in Lively Discussions: Join our community of movie enthusiasts and engage in lively discussions about your favorite films. Share your thoughts, opinions, and interpretations, and connect with fellow movie buffs who share your passion. From analyzing plot twists to debating the merits of different directors, our discussions are sure to spark your love for cinema.

Stay Updated with the Latest Movie News: The Movie Buffs keep you informed about the latest happenings in the world of movies. Stay ahead of the curve and be the first to know about upcoming releases, film festivals, and exciting developments in the film industry.

Join The Movie Buffs today and become part of a community that shares your love for movies. Discover in-depth film reviews, get personalized recommendations, and engage in lively discussions with fellow movie enthusiasts. Let's celebrate the magic of cinema together. Lights, camera, action!</p>
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
