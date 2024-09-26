import React, { useEffect, useState } from 'react';

const Authors = () => {
    // State to hold the fetched users data
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users with selected fields and populated userImage
        fetch('http://localhost:1337/api/users?populate=userImage&fields=id,username,email,userBio,createdAt')
            .then(response => response.json())
            .then(data => {
                setUsers(data); // Save the fetched data to the state
                const jsonString = JSON.stringify(data);
                console.log("User image data as JSON string: ", data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <h3>{user.username}</h3>
                    {/* Check if userImage exists and display the image */}
                    {user.userImage && user.userImage.url ? (
                        <img 
                            src={`http://localhost:1337${user.userImage.url}`} 
                            alt={user.userImage.name || 'User image'} 
                            style={{ width: '100px', height: '100px' }}
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>{user.userBio}</p>
                    <h1>{user.createdAt}</h1>
                </div>
            ))}
        </div>
    );
};

export default Authors;
