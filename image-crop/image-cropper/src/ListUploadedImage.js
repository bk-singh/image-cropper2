import React from "react";
import styled from "styled-components";

const Img = styled.img`
  margin: 20px;
`;

function ListUploadedImage({ data }) {
  return (
    data && (
      <div>
        <h3>Uploaded Images</h3>
        {data.map((img, i) => {
          const { url } = img;
          return (
            <div key={i + 10}>
              <Img key={i} src={url} alt={url} />
              <h5 key={i + 100}>{url}</h5>
              <br key={i + 1000} />
            </div>
          );
        })}
      </div>
    )
  );
}

export default ListUploadedImage;
