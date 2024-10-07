
import React from 'react'
import { useState, useEffect } from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_AUTHOR_POSTS } from '../../services/graphql/queryMutations';


const AuthorPostsWidget = ({authorId, excludePostId}) => {

  const { data, loading, error } = useQuery(GET_AUTHOR_POSTS, {
    variables: { authorId, excludeId: excludePostId },
  });


 
 if(loading) return <h1>loading...</h1>

  return (
    
    <div className='bg-slate-100 mt-12 p-2 pb-4 space-y-4 rounded-md w-full pr-6 shadow-sky-700 shadow-inner'>
    <div className='flex justify-center items-center w-full my-1 mb-4'>
    <h1 className='flex text-center text-sky-700 tracking-[1px] font-barlow text-[20px]'> Author's Posts</h1>
    </div>
    <div className='w-full max-h-[440px] overflow-y-auto'>
    {
      data.posts?.map((post)=>(
        <div className='flex flex-row space-x-2'>
            <div className='flex flex-col w-[30%] items-center'>
              <img src={`${process.env.REACT_APP_STRAPI_URL}${post.featuredImage.url}`}  className='h-16 w-16 rounded-xl'/>
              <h1 className='text-[9px] font-barlow'>{moment(post.createdAt).format('MMM DD, YYYY')}</h1>
            </div>
            <div className='flex flex-col w-[70%]'>
                 <Link className='font-roboto text-[11px] uppercase text-black hover:tracking-[0.3px] transition-all duration-500 hover:text-sky-500 hover:font-semibold ' to={`/post/${post.documentId}`}>{post.postTitle}</Link>
                 <h1 className='text-[9px] font-montserrat text-justify'> {post.postExcerpt.length > 90 
                    ? `${post.postExcerpt.substring(0, 70)}...` 
                    : post.postExcerpt}</h1>
            </div>

            </div>
      
    

        ))
      }
    </div>
  


    
  </div>
  )
}

export default AuthorPostsWidget
