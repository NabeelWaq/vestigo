import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { images } from '../assets/real_images/images'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
{/* Hero Left Side */}
{/* <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
<div className="text-[#414141]">
    <div className="flex items-center gap-2">
        <p className="w-8 sm:w-11 h-[2px] bg-[#414141]"></p>
        <p className='font-medium text-sm sm:text-base'>OUR BESTSELLERS</p>
    </div>
    <h1 className="prata-regular text-3xl lg:text-5xl sm:py-3 leading-relaxed">Latest Arrivals</h1>
    <div className="flex items-center gap-2">
    <p className='font-medium text-sm sm:text-base'>SHOP NOW</p>
    <p className="w-8 sm:w-11 h-[1px] bg-[#414141]"></p>
    </div>
</div>
</div> */}
{/* Hero Right Side */}
<img src={images.banner} className='w-full' alt="hero" />
    </div>
  )
}

export default Hero