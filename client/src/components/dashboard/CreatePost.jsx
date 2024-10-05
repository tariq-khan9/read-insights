
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import RichEditor from '../others/RichEditor';
import FileUploadComponent from './../others/FileUploadComponent';
import MultiSelect from './../others/MultiSelect';
import { GET_CATEGORIES, CREATE_POST, GET_ALL_POSTS_BY_AUTHOR, GET_POSTS } from '../../services/graphql/queryMutations';
import { fileUploadToStrapi } from '../../services/lib/fileUploadToStrapi';
import { useAuth } from '../../services/AuthContext';


const CreatePost= () => {

  const {auth} = useAuth();
  const authorId = auth.user.documentId;

  const {data, loading} = useQuery(GET_CATEGORIES)
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [
      { query: GET_ALL_POSTS_BY_AUTHOR, variables: { authorId } }, // Automatically refetch this query
      { query: GET_POSTS }, // Refetch all posts after mutation
    ],
  });

  
  
  
   const options =  data?.categories?.map((category)=>({
        value: category.documentId,
        label: category.categoryName,

     }))


  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const [content, setContent] = useState('');
  const [categories, setCategories] =  useState([])
  const [errorCategory, setErrorCategory] = useState(false)
  const [imageError, setImageError] = useState('');
  const [errorContent, setErrorContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [resetImage, setResetImage] = useState(false);

  
const handleSelectChange = (selected) => {
  
  console.log("Selected Options: ", selected);
  setCategories(selected);
};




  const onSubmit = async (formData) => {

    if (!featuredImage) {
      setImageError('Featured image is required');
      return; // Prevent form submission if image is not set
    } else {
      setImageError('');
    }

    if (!content) {
      setErrorContent('Post content is required.');
      return; // Prevent form submission if image is not set
    } else {
      setErrorContent('');
    }
 
    if (categories.length === 0) {
      setErrorCategory(true);
      return;
    }
    
   // Upload image to Strapi and get the ID
   const uploadedImageId = await fileUploadToStrapi(featuredImage);
   if (!uploadedImageId) {
     setImageError('Failed to upload featured image');
     return;
   }

 

     // Prepare variables for mutation
     const variables = {
      title: formData.title,
      excerpt: formData.excerpt,
      postContent: content,
      categories: categories.map((cat) => cat.value),
      featuredImage: uploadedImageId,
      user: authorId, // Set the user ID as needed
    };

    try {
      const response = await createPost({ variables });
      setSuccessMessage('Post created successfully!');
      reset()
      console.log('Post created:', response);
    } catch (error) {
      console.error('Error creating post:', error);
      setSuccessMessage('something went wrong!');
    }

  };

  useEffect(() => {
    if (imageError) {
      const timer = setTimeout(() => {
        setImageError(null); // Clear the error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timeout if component unmounts
    }
  }, [imageError]);

  useEffect(() => {
    if (errorContent) {
      const timer = setTimeout(() => {
        setErrorContent(null); // Clear the error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timeout if component unmounts
    }
  }, [errorContent]);

  useEffect(() => {
    if (errorCategory) {
      const timer = setTimeout(() => {
        setErrorCategory(false); // Clear the error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timeout if component unmounts
    }
  }, [errorCategory]);



  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [successMessage]);


  if(loading) return <h1>loading...</h1>
  
  return (
    <div className='flex w-full  justify-center  '>
        <div className="flex flex-col w-[70%] mt-5 items-center  ">
          <form className='w-full border border-gray-200 px-6 pt-2 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-[20px] w-full font-semibold text-center text-slate-100 mb-4">Write Post</h2>
            <div className='first-row flex flex-row w-full justify-between'>

                 <div className='first-col w-[60%] '>
                      <div className='w-full flex flex-col'>
                          <input
                              className="form-input w-[400px]"
                              placeholder='  Post Title'
                              type="text"
                              {...register('title', { required: 'title is required' })}
                          />
                          <div className='min-h-6'>
                          {errors.title && <span className='form-error2'>{errors.title.message}</span>}
                          </div>
                      </div>

                      <div  className='w-full flex flex-col'>
                      <textarea
                          className="form-input w-[500px]"
                          placeholder='  Post Excerpt'
                          rows={3}
                          {...register('excerpt', { required: 'Excerpt is required' })}
                      />
                      <div className='min-h-6'>
                      {errors.excerpt && <span className='form-error2'>{errors.excerpt.message}</span>}
                      </div>
                      </div>

                      <div className='w-full flex flex-col'>
                          <div className='rounded-lg' >
                            <MultiSelect
                              options={options}
                              onChange={handleSelectChange}
                              placeholder='Select Categories'
                              setCategories={setCategories}
                            />
                          </div>

                          <div className='min-h-6'>
                            {errorCategory && <span className='form-error2'>Please select a category</span>}
                          </div>    
                      </div>
                 </div>

                 <div className='second-col flex flex-col justify-start items-end w-[30%]'>
                    <FileUploadComponent
                       setAuthorImage={setFeaturedImage} 
                       resetImage={resetImage}
                       placeText='Upload Featured Image'
                    />
                    <div className='form-error w-full flex justify-center'>
                  {/* Display image error */}
                  {imageError && <p className='ml-4 form-error2'>{imageError}</p>}
                </div>

                 </div>
           

            </div>
            
            <div className='flex flex-col bg-white rounded-lg'>
                  <RichEditor editable={true} content={content} setContent={setContent}/>
                  <div className='min-h-8'>
                    {errorContent && <p className='ml-4 form-error2'>{errorContent}</p>}
                  </div>
            </div>

           

       

            <button className="border-2 text-[12px] border-white text-white px-10 p-1 mt-2 rounded-full" type="submit">Create Post</button>

            <div className='flex w-full justify-center min-h-6'>
              {successMessage && (
              <p className={`text-[13px] text-gray-200`}>
                {successMessage}
              </p>
              )}
            </div>
            
          </form>
        </div>
    </div>
  
  );
};

export default CreatePost;
