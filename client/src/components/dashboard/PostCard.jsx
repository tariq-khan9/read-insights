import React, { useState } from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../services/AuthContext';
import RichEditor from '../others/RichEditor';
import { DELETE_POST, GET_ALL_POSTS_BY_AUTHOR, GET_POSTS } from '../../services/graphql/queryMutations';

const PostCard = ({ post }) => {
  const { auth } = useAuth();
  const authorId = auth.user.documentId;

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      documentId: post.documentId,
    },
    update: (cache, { data: { deletePost } }) => {
      try {
        // Remove the post from GET_ALL_POSTS_BY_AUTHOR cache
        const { posts: authorPosts } = cache.readQuery({
          query: GET_ALL_POSTS_BY_AUTHOR,
          variables: { authorId },
        });

        cache.writeQuery({
          query: GET_ALL_POSTS_BY_AUTHOR,
          variables: { authorId },
          data: {
            posts: authorPosts.filter((p) => p.documentId !== post.documentId),
          },
        });

        // Remove the post from GET_POSTS cache
        const { posts: allPosts } = cache.readQuery({ query: GET_POSTS });

        cache.writeQuery({
          query: GET_POSTS,
          data: {
            posts: allPosts.filter((p) => p.documentId !== post.documentId),
          },
        });
      } catch (e) {
        console.error("Error updating cache:", e);
      }
    },
  });

  const [showFull, setShowFull] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost();
        setSuccessMessage('Post deleted successfully!');
        console.log('Post deleted');
      } catch (error) {
        console.error('Error deleting post:', error);
        setSuccessMessage('Something went wrong!');
      }
    }
  };

  if (!post || Object.keys(post).length === 0) {
    return <h1 className='text-[20px] text-fuchsia-300 font-barlow w-full text-center mt-20'>No post to display!</h1>;
  }

 

  return (
    <div className='rounded-t-xl w-full flex flex-col items-center mt-[50px]'>
      <div className='w-full bg-slate-100 rounded-xl'>
        <img src={`${process.env.REACT_APP_STRAPI_URL}${post.featuredImage.url}`} alt='image' className='w-full h-full bg-center rounded-t-xl' />
        <div className='w-full px-4'>
          <div className='flex flex-row justify-between w-full my-4'>
           

            <div className='flex justify-center items-baseline space-x-2'>
              <h1 className='font-roboto text-slate-700 text-[13px]'>Published: </h1>
              <h1 className='font-roboto text-slate-600 text-[13px]'>{moment(post.createdAt).format('MMM DD, YYYY')}</h1>
            </div>
          </div>

          <h1 className='font-barlow font-semibold tracking-[1px] text-gray-800 uppercase text-[25px] w-full text-start mt-10'>{post.postTitle}</h1>

          <div className='flex my-4 mb-8 flex-row justify-center items-center space-x-4'>
            <div className='w-[150px] flex justify-end'>
              <button onClick={() => setShowFull(!showFull)} className='text-[14px] font-montserrat font-normal text-white bg-sky-600 p-1 px-8 rounded-full hover:tracking-widest transition-all duration-500'>
                {showFull ? 'Show Less' : 'Show Full'}
              </button>
            </div>

            <span className='pb-[6px] text-[24px] text-gray-400'>|</span>
            <div className='w-[155px]'>
              <button onClick={() => handleDeletePost()} className='text-[14px] font-montserrat font-normal text-white bg-red-500 p-1 px-7 rounded-full hover:tracking-widest transition-all duration-500'>
                Delete Post
              </button>
            </div>
          </div>

          {showFull && (
            <div className='mb-8 text-[14px] font-montserrat text-justify leading-7'>
              <RichEditor content={post.postContent} editable={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
