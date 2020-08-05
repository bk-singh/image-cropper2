import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import ImageCropperRouter from "./ImageCropperRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ImageCropperRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
