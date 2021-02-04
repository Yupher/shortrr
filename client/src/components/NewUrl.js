import React, { useState } from "react";

const NewUrl = () => {
  const [url, setUrl] = useState("");
  const addUrl = async (url) => {
    let data= {
      url,
    }; 
    let res = await fetch("http://localhost:5000", {
      method: "post",
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
   /*  let response = await res.json()
    console.log(response) */
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addUrl(url);
  };
  const onChange = (e) => {
    setUrl(e.target.value);
  };
  return (
    <div style={{ marginTop: "2.5rem" }}>
      <small style={{ marginLeft: "10%" }}>
        URLs must be in this format: https://www.exemple.com
      </small>
      <div className="newUrl">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="url"
            value={url}
            placeholder="Paste Your Url Here"
            onChange={onChange}
            className="input"
          />
          <input type="submit" className="btn" value="Shrink" />
        </form>
      </div>
    </div>
  );
};

export default NewUrl;
