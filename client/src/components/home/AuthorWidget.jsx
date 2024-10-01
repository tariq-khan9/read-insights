
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'


const AuthorWidget = () => {
  
  const [authors, setAuthors]= useState([]);

  

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/users?populate=userImage`);
        setAuthors(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors(); 
  }, []);

  return (

    <div className='bg-white text-black py-2 rounded-md w-full pb-4 shadow-sky-700 shadow-inner'>
      <div className='flex w-full justify-center'>
      <h1 className='flex text-center font-barlow text-[20px] font-meduim text-sky-700 tracking-[1px] mb-2'>Posts by Author</h1>
      </div>
          <ul className=" pl-8 items-center">
              {authors.map((author) => (
                <li key={author.id} className="mb-2 text-[20px] text-sky-700"> {/* Each item is now a proper <li> */}
                  <div className="flex flex-row border-b border-sky-600 py-1 w-[70%]">
                           <img src={`${process.env.REACT_APP_STRAPI_URL}${author.userImage.url}`} className='w-9 h-9 rounded-full' alt='author'/>
                            <Link href={`/author/${author.documentId}`} className={` mt-2 ml-2 text-[14px]  hover:tracking-[1px] transition-all duration-500  font-montserrat text-gray-700 hover:text-sky-500 hover:font-semibold font-normal}`}>
                            {author.authorName}
                            </Link>
                  </div>
                </li>
              ))}
          </ul>
    </div>
  )
}

export default AuthorWidget
