import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { GET_CATEGORIES } from '../../services/graphql/queryMutations';


const CategoryWidget = () => {
  const param = useParams()
  const {id} = param;
  const {data, loading, error} = useQuery(GET_CATEGORIES)
  const [categories, setCategories]= useState([]);

  useEffect(()=>{
    if(!loading){
      setCategories(data)

      console.log(data)
    }
  },[])

  if(loading) return <h1>loading...</h1>

  return (
    
    <div className='bg-white text-black p-2  rounded-md w-full pb-4 shadow-sky-700 shadow-inner'>
      <div className='flex w-full justify-center'>
      <h1 className='flex text-center font-barlow text-[20px] font-meduim text-sky-700 tracking-[1px]'>Categories</h1>
      </div>
          <ul className="list-disc pl-8 items-center">
              {data.categories.map((category) => (
                <li key={category.documentId} className="mb-1 text-[25px] text-sky-700"> {/* Each item is now a proper <li> */}
                  <div className="flex flex-col w-[70%]">
                    <Link to={`/category/${category.documentId}`} className={`${id==category.documentId? 'text-gray-900':''} text-[14px] font-semibold  hover:tracking-[1px] transition-all duration-500  font-montserrat text-gray-500 hover:text-sky-500 hover:font-semibold}`}>
                      {category.categoryName}
                    </Link>
                  </div>
                </li>
              ))}
          </ul>
    </div>
  )
}

export default CategoryWidget
