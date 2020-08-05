import React from "react";
import { Route, Switch } from "react-router-dom";

import Cropper from "./Cropper";

function ImageCropperRouter() {
  const data = [
    {
      sx: 0,
      sy: 0,
      sWidth: 755,
      sHeight: 450,
      x: 0,
      y: 0,
      width: 755,
      height: 450,
    },
    {
      sx: 755,
      sy: 0,
      sWidth: 212,
      sHeight: 365,
      x: 0,
      y: 0,
      width: 212,
      height: 365,
    },
    {
      sx: 0,
      sy: 450,
      sWidth: 365,
      sHeight: 450,
      x: 0,
      y: 0,
      width: 365,
      height: 450,
    },
    {
      sx: 356,
      sy: 450,
      sWidth: 380,
      sHeight: 480,
      x: 0,
      y: 0,
      width: 380,
      height: 380,
    },
  ];
  return (
    <Switch>
      <Route
        path="/preview/"
        exact
        render={(routeProps) => (
          <Cropper history={routeProps.history} data={data} />
        )}
      />
      <Route
        path="/list/"
        exact
        render={(routeProps) => (
          <Cropper history={routeProps.history} data={data} />
        )}
      />
      <Route
        path="/"
        render={(routeProps) => (
          <Cropper history={routeProps.history} data={data} />
        )}
      />
    </Switch>
  );
}

export default ImageCropperRouter;
