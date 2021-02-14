import React, { useRef, useState, useEffect, useContext } from "react";
import Context from "../context/context";
import DeleteBtn from "./DeleteBtn";

const Link = ({ shortUrl, originalUrl, clicks, shortid }) => {
  const { deleteUrl } = useContext(Context);
  const [copied, setCopied] = useState(false);
  const copy = useRef("");
  useEffect(() => {
    copied && setTimeout(() => setCopied(false), 1500);
  }, [copied]);
  const onCopy = () => {
    console.log(copy.current.innerText);
    navigator.clipboard.writeText(copy.current.innerText);
    setCopied(!copied);
  };
  return (
    <tr className="linksContent">
      <td ref={copy}>{shortUrl}</td>
      <td>{originalUrl}</td>
      <td>{clicks}</td>
      <td>
        <DeleteBtn id={shortid} del={deleteUrl} text="Delete" />
      </td>
      <td>
        {!copied ? (
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1rem",
              color: "#0dbd19",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={onCopy}
          >
            Copy
          </button>
        ) : (
          <small>copied</small>
        )}
      </td>
    </tr>
  );
};

export default Link;
