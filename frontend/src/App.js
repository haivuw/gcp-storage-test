//import "./App.css";
import React, { useState } from "react";
import upload from "./services/upload";

function App() {
  // Use state to get form data
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploaded = await upload(
      e.target.image.files[0],
      e.target.imageName?.value
    );
    setUploadedImage(uploaded);
  };
  console.log({ uploadedImage });
  console.log(`${process.env.REACT_APP_STORAGE_URL}/${uploadedImage}`);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Upload to Google Bucket</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            name="imageName"
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadedImage && (
        <img src={`${process.env.REACT_APP_STORAGE_URL}/${uploadedImage}`} />
      )}
    </>
  );
}

export default App;
