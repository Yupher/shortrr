import React, { useState, useEffect, useContext, Fragment } from "react";
import Context from "../context/context";
import DeleteBtn from "./DeleteBtn";
import Link from "./Link";
import Loading from "./Loading";

const Links = () => {
  const { getUrls, urls, deleteAll, loading } = useContext(Context);
  useEffect(() => {
    getUrls();
  }, []);
  return urls !== null && loading === false ? (
    <table className="allLinks">
      <thead className="allLinksHeader">
        <tr>
          <th>All Links</th>
          <th>Original Urls</th>
          <th>Clicks</th>
          <th colSpan="2">
            <DeleteBtn del={deleteAll} text="Delete All" />
          </th>
        </tr>
      </thead>
      <tbody>
        {urls.map((url) => (
        <Link
          key={url._id}
          shortUrl={url.shortUrl}
          shortid={url.shortid}
          originalUrl={url.originalUrl}
          clicks={url.clicks}
        />
      ))}
      </tbody>
    </table>
  ) : (
    <Fragment>
      {urls === null && loading === false ? null : <Loading />}
    </Fragment>
  );
};

export default Links;
