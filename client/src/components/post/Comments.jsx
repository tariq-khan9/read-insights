import React from 'react';
import { BiLike, BiDislike } from "react-icons/bi";


const Comments = ({comment}) => {

  return (
    <div className='text-white flex flex-col  bg-slate-300 bg-opacity-40 p-4 rounded-lg'>
        <div  className="flex flex-row justify-between">
          <h3 className='text-white uppercase text-[14px] font-montserrat'>{comment.name}</h3>
          <small className='text-white font-extralight font-barlow'>Posted on: {new Date(comment.createdAt).toLocaleString()}</small>
        </div>

        <p className='py-4 font-montserrat text-[14px] text-white'>{comment.comment}</p>
        <div className='flex flex-row justify-end px-6 space-x-6'>
          <BiLike className='text-sky-300 hover:text-sky-200 hover:cursor-pointer'/>
          <BiDislike className='text-orange-300 hover:text-orange-200 hover:cursor-pointer'/>
        </div>

    </div>
  );
};

export default Comments;
