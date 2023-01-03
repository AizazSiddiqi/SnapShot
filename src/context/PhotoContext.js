import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
import eventLogging from "../eventLogging";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const runSearch = query => {
    let start = Date.now();
    axios
        .get(
            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
        )
        .then(response => {
          eventLogging({
            event_type: "search",
            search_term: query,
            duration_ms: Date.now() - start
          });
          setImages(response.data.photos.photo);
          setLoading(false);
        })
        .catch(error => {
          console.log(
              "Encountered an error with fetching and parsing data",
              error
          );
        });
  };
  return (
      <PhotoContext.Provider value={{ images, loading, runSearch }}>
        {props.children}
      </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
