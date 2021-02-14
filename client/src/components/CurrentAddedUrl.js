import React, { useRef, useState, useEffect } from "react";

const CurrentAddedUrl = ({ url }) => {
  const text = useRef("");
  const [copied, setCopied] = useState("");
  const onOpen = () => {
    window.open(`http://${text.current.innerText}`);
  };
  const onCopy = () => {
    navigator.clipboard.writeText(text.current.innerText);
    setCopied("copied");
  };
  useEffect(() => {
    setTimeout(() => setCopied(""), 4000);
  }, [copied]);
  return (
    <div className="currentAddedUrl">
      <h3 ref={text} onClick={onOpen}>
        {url}
      </h3>
      <div>
        <button onClick={onCopy}>Copie</button>
        {copied !== "" ? <small>copied</small> : null}
      </div>
    </div>
  );
};

export default CurrentAddedUrl;
