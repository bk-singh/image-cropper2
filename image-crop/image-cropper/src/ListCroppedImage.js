import React from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  margin: 20px;
`;

function ListCroppedImage({ data, showCroppedFile }) {
  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i + 100} hidden={!showCroppedFile}>
          <h3
            key={i + 1000}
          >{`Cropped Image: ${data[i].width} x ${data[i].height}`}</h3>
          <Canvas id={`img-canvas-${i}`} key={i} className="canvas" />
        </div>
      ))}
    </div>
  );
}

export default ListCroppedImage;
