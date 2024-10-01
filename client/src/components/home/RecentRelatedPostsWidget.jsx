
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import {Link} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES_POSTS, GET_RECENT_POSTS } from '../../services/graphql/queryMutations';


const RecentRelatedPostsWidget = ({categories, excludedPostId}) => {

  // Map to get an array of category names
  const categoryProp = categories?.map(element => element.categoryName) || [];
  console.log("Categories in recent comp: ", categoryProp);

  // Choose the query based on whether categories are present
  const query = categories ? GET_CATEGORIES_POSTS : GET_RECENT_POSTS;

  // Set variables for the query; use directly without nesting
  const variables = categories ? { categoryNames: categoryProp, excludeId: excludedPostId  } : {};

  const { data, loading, error } = useQuery(query, { variables });
  
  
  if(!loading) console.log(data)
 
  if(error) return (
     <div className='bg-slate-100 p-2 pb-4 space-y-4 rounded-md w-full pr-6'>

     <div className='flex justify-center items-center w-full my-1 mb-4'>
      <h1 className='flex text-center text-sky-700 tracking-[1px] font-barlow text-[24px]'>{categories? 'Similar Posts' : 'Recent Posts'}</h1>
      </div>
         <h1>no post here</h1>
     </div>
  )

  return (
    
    <div className='bg-slate-100 p-2 pb-4 space-y-4 rounded-md w-full pr-6 shadow-sky-700 shadow-inner'>

    
      <div className='flex justify-center items-center w-full my-1 mb-4'>
      <h1 className='flex text-center text-sky-700 tracking-[1px] font-barlow text-[20px]'>{categories? 'Similar Posts': 'Recent Posts'}</h1>
      </div>
    
      {
        !loading &&
        data.posts?.map((post)=>(
          <div className='flex flex-row space-x-2'>
              <div className='flex flex-col w-[30%] items-center'>
                <img src={`${process.env.REACT_APP_STRAPI_URL}${post.featuredImage.url}`} className='h-16 w-16 rounded-xl'/>
                <h1 className='text-[9px] font-barlow'>{moment(post.createdAt).format('MMM DD, YYYY')}</h1>
              </div>
              <div className='flex flex-col w-[70%]'>
                   <Link className='font-roboto uppercase text-black hover:tracking-[0.3px] transition-all duration-500 hover:text-sky-500 hover:font-semibold text-[11px] ' to={`/post/${post.documentId}`}>{post.postTitle}</Link>
                   <h1 className=' font-montserrat text-justify text-[9px]'> {post.postExcerpt.length > 90 
                      ? `${post.postExcerpt.substring(0, 70)}...` 
                      : post.postExcerpt}</h1>
              </div>

              </div>
        
      

          ))
        }

  
      
    </div>
  )
}

export default RecentRelatedPostsWidget
