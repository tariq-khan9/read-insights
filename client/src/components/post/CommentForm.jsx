import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../services/graphql/queryMutations';

const CommentForm = ({ post, handleNewComment, showComments, setShowComments, comments }) => {
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const commentRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  // Define the mutation hook
  const [createComment] = useMutation(CREATE_COMMENT);

  console.log("are there comments in ", comments)

  const handleCommentSubmit = async () => {
    const comment = commentRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    // Clear error if inputs are filled
    setError(false);

    const commentObj = { comment, name, email, post };
    console.log("comment data", commentObj)
    try {
      // Call the mutation function
      const {data} = await createComment({
        variables: {
          data: commentObj,
        },
      });

      handleNewComment(data.createComment)
      setSuccessMessage('Comment posted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

     
      commentRef.current.value = '';
      nameRef.current.value = '';
      emailRef.current.value = '';
    } catch (e) {
      console.error('Error creating comment:', e);
      setSuccessMessage('Something went wrong!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000);
    
    }
  };

  return (
    <div className='bg-slate-100 w-full rounded-xl p-2 px-8'>
       <div className='flex flex-row justify-between'>
       <h1 className='text-[18px] font-barlow text-slate-600 font-semibold my-2'>Leave a comment</h1>
       {
         comments &&   <button className='text-gray-600 pb-1 pr-1 hover:text-sky-600 font-barlow text-[13px]' onClick={()=>setShowComments(!showComments)}>{showComments? 'Hide Comments' : 'Show Comments'}</button>
       }
      
       </div>
                  
      <div className='w-full flex flex-col justify-center items-center space-y-5 font-montserrat'>
        <textarea ref={commentRef} className='w-full text-[13px] bg-slate-200 rounded-xl p-4' placeholder='comment' rows={2} />
        <input ref={nameRef} className='w-full text-[13px] bg-slate-200 rounded-xl p-4' placeholder='name' />
        <input ref={emailRef} className='w-full text-[13px] bg-slate-200 rounded-xl p-4' placeholder='email' />
      </div>
      <div className='flex flex-row items-center w-full'>
        <button
          onClick={handleCommentSubmit}
          className='p-3 px-8 bg-sky-800 font-barlow tracking-[1px] font-medium text-slate-50 rounded-full mt-8 mb-6 hover:tracking-[2px] text-[13px] transition-all duration-500'
        >
          Post comment
        </button>
        {/* {successMessage && <span className='text-green-800 text-[14px] font-montserrat ml-10 mt-2'>Comment has been posted successfully</span>}
        {error && <span className='text-red-600 text-[14px] font-montserrat ml-10 mt-2'>Please fill all fields</span>} */}

        <span className={`${successMessage.includes('successfully')? 'text-green-800':'text-red-700'} text-[14px] font-montserrat ml-10 mt-2`}>{successMessage}</span>
      </div>
    </div>
  );
};

export default CommentForm;
