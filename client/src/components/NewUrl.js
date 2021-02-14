import React, { useState,useContext, useEffect } from "react";
import CurrentAddedUrl from './CurrentAddedUrl'
import Alert from './Alert'
import Loading from './Loading'
import Context from '../context/context'

const NewUrl = () => {
  const [newUrl, setNewUrl] = useState("");
  const context = useContext(Context)
  const {addUrl,loading, currentAddedUrl, allert, clearAlert} = context

  useEffect(()=>{
    if(allert !== null){
      setTimeout(()=>{clearAlert()}, 3000)
    }
  })
  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(allert)
    addUrl(newUrl);
  };
  const onChange = (e) => {
    setNewUrl(e.target.value);
  };
  return (
    <div style={{ marginTop: "2.5rem" }}>
      {allert !== null ? <Alert alert={allert.message}/>: null }
      <small className='note'>
        URLs must be in this format: https://www.exemple.com
      </small>
      <div className="newUrl">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="url"
            value={newUrl}
            placeholder="Paste Your Url Here"
            onChange={onChange}
            className="input"
          />
          <input type="submit" className="btn" value="Shrink" />
        </form>
      </div>
      {currentAddedUrl !== null && loading === false ? <CurrentAddedUrl url={currentAddedUrl} /> : <div>{loading ? <Loading /> : null}</div> }
    </div>
  );
};

export default NewUrl;
