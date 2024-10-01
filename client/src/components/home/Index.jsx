import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PostCard from './PostCard';
import { GET_POSTS, GET_ALL_POSTS_BY_CATEGORY, GET_ALL_POSTS_BY_AUTHOR } from '../../services/graphql/queryMutations';
import CategoryWidget from './CategoryWidget';
import RecentRelatedPostsWidget from './RecentRelatedPostsWidget';
import AuthorWidget from './AuthorWidget';


const Index = () => {
 
  const param = useParams();
  const location = useLocation()

  const {id} = param;

  let queryToExecute;
  let variables = {};

  if (location.pathname.includes('/category/')) {
    queryToExecute = GET_ALL_POSTS_BY_CATEGORY;
    variables = { categoryId: id };
  } else if (location.pathname.includes('/author/')) {
    queryToExecute = GET_ALL_POSTS_BY_AUTHOR;
    variables = { authorId: id };
  } else {
    queryToExecute = GET_POSTS;
  }

  const { data, loading, error } = useQuery(queryToExecute, {variables});
 
  if(id) console.log("posts with params ", data)

  console.log("cateogyr id is here", data)

  if (loading)
    return (
      <div className='flex h-screen bg-transparent tracking-[3px] justify-center pt-60 font-barlow text-sky-400 text-[40px]'>
        <svg
          aria-hidden='true'
          className='w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
      </div>
    );
  if (error)
    return (
      <h1 className='flex h-screen bg-transparent justify-center pt-60 font-barlow text-orange-600 text-[40px]'>
        Something went wrong!
      </h1>
    );

  return (
    <div className=' flex relative flex-row justify-between mt-8 w-full'>
  
      {/* Left Sidebar */}
      <div className='w-[22%] fixed left-8'>
        <div className='flex flex-col space-y-8 '>
          <CategoryWidget />
          <AuthorWidget />
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-[45%] space-y-16 flex flex-col items-center justify-center'>
        {data?.posts?.length ? (
          data?.posts?.map((data) => <PostCard key={data.id} post={data} />)
        ) : (
          <div className='flex w-full justify-center'>
            <h1 className='mt-[200px] font-barlow font-extralight text-[30px] text-sky-300'>
              No post exists on this Subject!
            </h1>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className='w-[22%] fixed right-8 '>
        <div className='flex flex-col'>
          <RecentRelatedPostsWidget />
        </div>
      </div>
  </div>

    
  );
};

export default Index;
