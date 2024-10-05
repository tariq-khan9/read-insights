import React from 'react'
import moment from 'moment';
import {Link} from 'react-router-dom'
import { CgCalendarDates } from "react-icons/cg";



const PostCard = ({post}) => {

 console.log(post.featuredImage.url)

  const profileImage = post?.user.userImage.url;


  return (
    <div className='border bg-slate-100 mt-1 rounded-md border-gray-500 w-full p-4  flex flex-col items-center '>
    
    <img src={`${process.env.REACT_APP_STRAPI_URL}${post.featuredImage.url}`} alt='image' className='h-[400px] w-full rounded-md'/>


       <h1 className='font-barlow tracking-[1px] font-normal text-black text-[20px] uppercase w-full text-center mt-3'>{post.postTitle}</h1>

       <div className='flex flex-row justify-center items-center'>
          {post.categories.map((cate, index) => (
            <React.Fragment key={index}>
              <h1 className='text-[12px]'>{cate.categoryName}</h1>
              {index < post.categories.length - 1 && (
                <span className='mx-2 text-gray-500'>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      
      

       <div className='flex flex-row w-full justify-between my-2'>
          <div className='flex flex-row space-x-2 items-center'>
            <img src={`${process.env.REACT_APP_STRAPI_URL}${post.user.userImage.url}`} alt='author' className='w-[25px] h-[25px] border-2 border-primary rounded-full'/>
            <h1 className='text-slate-600 text-[12px] font-montserrat font-medium tracking-[2px]'>{post.user?.authorName}</h1>
          </div>

          <div className='flex items-center space-x-2'>
            <CgCalendarDates size={16} className='text-slate-700'/>
            <h1 className='text-[11px] text-slate-600'>{moment(post.createdAt).format('MMM DD, YYYY')}</h1>
          </div>
       </div>
 
       <h1 className=' font-barlow font-light tracking-[1px] text-[14px] text-black w-[90%] text-center mt-6'>{post.postExcerpt}</h1>

       <Link to={`/post/${post.documentId}`} className='text-[13px] p-2 px-6 font-jakarta bg-sky-800 rounded-full text-white my-8 transition duration-500 transform hover:-translate-y-1 hover:translate-x-2 pb-[8px]'>Continue Reading</Link>
    
    </div>
  )
}

export default PostCard
