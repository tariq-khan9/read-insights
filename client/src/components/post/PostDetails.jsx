import React from 'react'
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { CgCalendarDates } from "react-icons/cg";

import {Link }from 'react-router-dom';
import RichEditor from '../others/RichEditor';

const PostDetails = ({post}) => {



 

  if (!post || Object.keys(post).length === 0) {
    return <h1 className='text-[20px]   text-fuchsia-300 font-barlow w-full text-center mt-20'>No post to display!</h1>;
  }
  
    const profileImage = post.author?.authorImage?.url ? post.author.authorImage.url : '/images/logoDefault.jpg';
    
 
  

  return (
    
   
    <div className='rounded-t-xl w-full flex flex-col items-center mt-[50px]'>
      <div className='w-full bg-slate-100 rounded-xl'>
         <img src={`${process.env.REACT_APP_STRAPI_URL}${post.featuredImage.url}`} alt='image' className='w-full  h-full bg-center rounded-t-xl'/>
          <div className='w-full px-4'>
              
                <div className='flex flex-row justify-between w-full my-4'>
                  <div className='flex flex-row space-x-2 items-center'>
                    <img src={`${process.env.REACT_APP_STRAPI_URL}${post.user.userImage.url}`} alt='author' className='w-[30px] h-[30px] border-2 border-primary rounded-full'/>
               
                    <h1 className='text-slate-600 font-montserrat font-medium tracking-[1px] text-[14px]'>{post.user.authorName}</h1>
                  </div>

                  <div className='flex justify-center items-baseline space-x-2'>
                    <h1 className='font-roboto text-slate-700 text-[13px]'>Published: </h1>
                    <h1 className='font-roboto text-slate-600 text-[13px]'>{moment(post.createdAt).format('MMM DD, YYYY')}</h1>
                  </div>
                </div>

                <h1 className='font-barlow font-semibold tracking-[1px] text-gray-800 uppercase text-[25px] w-full text-start mt-10'>{post.postTitle}</h1>

                <div className='my-8 text-[14px] font-montserrat text-justify leading-7'>
                    <RichEditor content={post.postContent} editable={false}/>
                </div>

               
          </div>
        
      </div>

      
 
   
    
    </div>
  )
}

export default PostDetails
