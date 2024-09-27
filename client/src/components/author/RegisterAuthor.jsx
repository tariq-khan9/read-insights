import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUploadBox from './../others/FileUploadBox';

const RegisterAuthor = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [authorImage, setAuthorImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [authorCreatedMessage, setAuthorCreatedMessage] = useState('');
  const [resetImage, setResetImage] = useState(false);

  // Watch password field for confirm password validation
  const watchPassword = watch("authorPassword", "");

  const onSubmit = async (data) => {
    // Image validation
    if (!authorImage) {
      setImageError('Profile image is required');
      return; // Prevent form submission if image is not set
    } else {
      setImageError('');
    }

    try {
      // Step 1: Register the user without image and role
      const registerRes = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.authorEmail,
          email: data.authorEmail,
          password: data.authorPassword,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerData.jwt) {
        throw new Error('User registration failed.');
      }

      const userId = registerData.user.id;

      // Step 2: Upload the image
      const formData = new FormData();
      formData.append('files', authorImage);

      const uploadRes = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadedImage = await uploadRes.json();

      if (!uploadedImage || !uploadedImage[0]) {
        throw new Error('Image upload failed.');
      }

      const imageId = uploadedImage[0].id;

      // Step 3: Associate the uploaded image and userBio with the user
      const updateUserRes = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `Bearer ${registerData.jwt}`, // Use the JWT from the registration response
        },
        body: JSON.stringify({
          authorName: data.authorName,
          userImage: imageId,
          userBio: data.authorBio,
        }),
      });

      if (!updateUserRes.ok) {
        throw new Error('User update with image failed.');
      }

      setAuthorCreatedMessage('Author created successfully!');
      reset()
      setResetImage(true)
    } catch (err) {
      console.error('Error registering author:', err);
      setAuthorCreatedMessage('Something went wrong! please try again.');
    }
  };

  useEffect(() => {
    if (authorCreatedMessage) {
      const timer = setTimeout(() => {
        setAuthorCreatedMessage('');
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer on component unmount
    }
  }, [authorCreatedMessage]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-fuchsia-500'>
      <form className='shadow-2xl shadow-slate-900 flex flex-col bg-white rounded-lg p-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='border border-blue-800 w-full px-10 pb-2 rounded-lg'>
          <h1 className='form-heading mt-4 mb-8'>Register as Author!</h1>
          <div className='form space-x-8 flex flex-row'>
            <div className='flex flex-col w-full'>
              {/* Author Name */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="text"
                  placeholder="Author Name"
                  {...register('authorName', { required: 'Name is required' })}
                />
                <div className='form-error'>
                  {errors.authorName && <p>{errors.authorName.message}</p>}
                </div>
              </div>

              {/* Author Email */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="email"
                  placeholder="Author Email"
                  {...register('authorEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email',
                    },
                  })}
                />
                <div className='form-error'>
                  {errors.authorEmail && <p>{errors.authorEmail.message}</p>}
                </div>
              </div>

              {/* Password */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="password"
                  placeholder="Password"
                  {...register('authorPassword', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and a number',
                    },
                  })}
                />
                <div className='form-error'>
                  {errors.authorPassword && <p>{errors.authorPassword.message}</p>}
                </div>
              </div>

              {/* Confirm Password */}
              <div className='w-full'>
                <input
                  className='form-input'
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === watchPassword || 'Passwords do not match',
                  })}
                />
                <div className='form-error'>
                  {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <button className='form-btn mt-8' type="submit">Register Author</button>
            </div>

            <div className='flex flex-col w-full'>
              {/* Author Bio */}
              <div className='w-full'>
                <textarea
                  className='form-input'
                  rows={4}
                  placeholder="Author Bio"
                  {...register('authorBio', { required: 'Bio is required' })}
                />
                <div className='form-error'>
                  {errors.authorBio && <p>{errors.authorBio.message}</p>}
                </div>
              </div>

              {/* Author Image */}
              <div className='flex flex-col'>
                <FileUploadBox setAuthorImage={setAuthorImage} resetImage={resetImage} />
                <div className='form-error w-full flex justify-center'>
                  {/* Display image error */}
                  {imageError && <p className='ml-4'>{imageError}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Message Display */}
          <div className='flex w-full justify-center min-h-8'>
            {authorCreatedMessage && (
              <p className={`form-${authorCreatedMessage.includes('successfully') ? 'success' : 'error'}`}>
                {authorCreatedMessage}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterAuthor;
