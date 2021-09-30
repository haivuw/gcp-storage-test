//import "./App.css";
import React, { useState } from "react";

function App() {
  // Use state to get form data
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const bucketName = "detectuploads";
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o"`;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    let userData = [
      {
        image_name: name,
        //image: image,
      },
    ];

    formData.append("data", JSON.stringify(userData));

    console.log(formData.get("image"));
    console.log(formData.get("data"));

    fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      {/* enctype="multipart/form-data" method="POST" */}
      <h1>Upload to Google Bucket</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
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
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
