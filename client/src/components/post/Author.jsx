import React from 'react'

const Author = ({author}) => {
  
  if (!author) {
    return <h1>Nothing to display</h1>;
  }

  console.log("author is here", author)
  return (
    <div>

<div className=' bg-slate-300  bg-opacity-40 w-full my-16 relative rounded-xl'>
       <div className=' text-white absolute -top-10 left-[44%] rounded-xl'>
          <img src={`${process.env.REACT_APP_STRAPI_URL}${author.userImage.url}`}  className='w-[80px] h-[80px] rounded-full bg-slate-500  bg-opacity-70 p-2'/>
       </div>
       <div className='p-10 flex flex-col justify-center items-center space-y-2'>
         <h1 className='text-[20px] font-jakarta uppercase tracking-wider text-slate-50'>{author.authorName}</h1>
         <h1 className='text-[14px] text-white font-montserrat font-light'>{author.userBio}</h1>
       
       </div>

      
    </div>

    </div>
  
  )
}

export default Author
