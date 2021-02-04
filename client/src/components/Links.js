import React, { useState, useEffect } from "react";

const Links = () => {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUrls(json))
      .catch((error) => console.log(error));
  }, []);
  useEffect(()=>{
      urls !== null ? console.log(urls): console.log('loading')
  },[urls])
  return (
    <ul>
      {urls !== null ? (
        urls.data.map((obj) => <li key={obj._id}>{obj.shortUrl}</li>)
      ) : (
        <div>loding..</div>
      )}
    </ul>
  );
};

export default Links;
