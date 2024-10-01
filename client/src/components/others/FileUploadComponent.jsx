import React, { useEffect, useState } from "react";

const FileUploadComponent = ({setAuthorImage, resetImage, placeText}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAuthorImage(file)
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedFile(imageURL);
    }
  };

  useEffect(()=>{
    if(resetImage){
      setSelectedFile(null)
    }
     
  },[resetImage])

  return (
    <div className="flex justify-end items-start">
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />   
      <div
        className={`w-52 h-[200px] bg-white flex justify-center items-center cursor-pointer relative border border-fuchsia-700 hover:border-2 transition rounded-md`}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {/* Display uploaded image or placeholder text */}
        {selectedFile ? (
          <img
            src={selectedFile}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-fuchsia-800">{placeText}</span>
        )}
      </div>
      
    </div>
  );
};

export default FileUploadComponent 
  
