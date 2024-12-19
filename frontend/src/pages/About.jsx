import React from 'react'
import Title from '../components/Title.jsx';
import NewsLetter from '../components/NewsLetter.jsx'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center pt-8 border-t text-2xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-16 my-10">
        <img src={assets.about_img} alt="img" className='w-full md:max-w-[450px] object-cover' />
        <div className="flex flex-col justify-center md:w-2/4 gap-6 text-gray-600">
        <p>Vestivo fashion has great options if you are looking for hoodies, neck sweaters, and jackets. Looking at the recent fashion evolution around the globe around casuals, our clothing’s vision is simple, contemporary designs that add value to the customers closet by boosting their confidence.

We aim to set trends with our high-end casual wear by keeping the focus on the fabric and quality of stitching. Our catalog consists of high-end jackets, hoodies, neck sweaters, and sweatshirts that can go along in every season. Designed for unparalleled comfort, they keep you fully covered and provide good ventilation, so you can wear them to any occasion whether you are at home, at the gym or hanging out with your friends!

There’s no compromising on detail at Vestivo, we have a collection of all sizes and fits in various colors and cuts to appease everyone. Oversized and snug – we offer it all. This allows customers to personalize their sweatshirts, and hoodies so that they can stand out whenever they wear them.
</p>
        <p>With a growing presence in all major cities of Pakistan, Ventivo is gaining an attractive fanbase of people who are insane about casual wear and are always hunting for something of high quality. We look forward to continuing our mission of bringing in every piece, the best combination of style, comfort, and quality.

Check out the variety of versatile and fashionable Premium Hoodies, sweatshirts, and neck sweaters today that makes Vestivo the best option for anyone interested in simple style and comfort
</p>
        <b className="text-gray-800">Our Mission</b>
        <p><i>Vestivo</i> established its mission to change fashion by designing and selling high quality clothes that allow people to wear their self - expressed personality with confidence. The goal of the organization is to create stylish clothing that is comfortable as well, allowing clients to always maintain a pleasing look and feel.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="flex flex-col border flex-1 px-10 md:px-16 py-8 md:py-20 gap-5">
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>we prioritize Quality Assurance by using only the finest materials and ensuring each hoodie, sweatshirt, and neck sweater is crafted with precision and care for long-lasting durability and comfort. </p>
        </div>
        <div className="flex flex-col border flex-1 px-10 md:px-16 py-8 md:py-20 gap-5">
          <b>Convenience: </b>
          <p className='text-gray-600'>We offer convenience with an easy online shopping experience, fast delivery, and hassle-free returns, making it simple for our customers to find and enjoy their perfect fit. </p>
        </div>
        <div className="flex flex-col border flex-1 px-10 md:px-16 py-8 md:py-20 gap-5">
          <b>Exceptional Customer Service: </b>
          <p className='text-gray-600'>Our Exceptional Customer Service is always ready to assist, ensuring that every shopping experience is seamless, from product inquiries to post-purchase support, because we value our customers and strive to exceed their expectations at every step.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default About