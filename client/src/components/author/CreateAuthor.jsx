import React, { useState } from 'react';

const CreateAuthor = () => {
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPassword, setAuthorPassword] = useState('');
  const [authorImage, setAuthorImage] = useState(null);

  const handleImageChange = (e) => {
    setAuthorImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register the user without image and role
      const registerRes = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: authorName,
          email: authorEmail,
          password: authorPassword,
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

      const uploadRes = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadedImage = await uploadRes.json();

      if (!uploadedImage || !uploadedImage[0]) {
        throw new Error('Image upload failed.');
      }

      const imageId = uploadedImage[0].id;

      // Step 3: Associate the uploaded image with the user
      const updateUserRes = await fetch(`http://localhost:1337/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${registerData.jwt}`, // Use the JWT from the registration response
        },
        body: JSON.stringify({
          userImage: imageId,
          userBio: authorBio // Use correct field name (userImage instead of image)
        }),
      });

      const updateUserData = await updateUserRes.json();

      if (!updateUserRes.ok) {
        throw new Error('User update with image failed.');
      }

      alert('Author registered and image associated successfully!');
    } catch (err) {
      console.error('Error registering author:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Author Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />
       <input
        type="text"
        placeholder="Author Bio"
        value={authorBio}
        onChange={(e) => setAuthorBio(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Author Email"
        value={authorEmail}
        onChange={(e) => setAuthorEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Author Password"
        value={authorPassword}
        onChange={(e) => setAuthorPassword(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Register Author</button>
    </form>
  );
};

export default CreateAuthor;
