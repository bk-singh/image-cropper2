import React, { useState } from "react";
import styled from "styled-components";
import ListCroppedImage from "./ListCroppedImage";
import ListUploadedImage from "./ListUploadedImage";
const host = "http://localhost:60000";
const Container = styled.div`
  margin: 50px;
  padding: 30px;
  border: 1px solid grey;
`;

const Button = styled.button`
  background-color: lightblue;
  padding: 10px;
  margin: 20px;
`;

function Cropper({ history, data }) {
  const [file, setFile] = useState(null);
  const [base64Data, setBase64Data] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [showCroppedFile, setShowCroppedFile] = useState(false);
  const [showUploadedFile, setShowUploadedFile] = useState(false);

  const onFileChange = (e) => {
    const blobSrc = URL.createObjectURL(e.target.files[0]);
    let image = new Image();
    image.src = blobSrc;
    setTimeout(() => {
      if (image.width !== 1024 && image.height !== 1024) {
        alert("Image should be exactly 1024 x 1024.");
        const fileInput = document.getElementById("upload-file");
        fileInput.value = "";
        return;
      }
      setFile(image.src);
    }, 1000);
  };

  const drawCroppedImg = (i, img, crop) => {
    const canvas = document.getElementById("".concat("img-canvas-", i));
    if (!canvas) return;
    let image = new Image();
    image.src = img;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      data[i].sx,
      data[i].sy,
      data[i].sWidth,
      data[i].sHeight,
      data[i].x,
      data[i].y,
      data[i].width,
      data[i].height
    );
    return canvas.toDataURL("image/jpeg", 1.0);
  };

  const handleOnClick = (img, crop) => {
    let base64 = [];
    [0, 1, 2, 3].forEach((i) =>
      base64.push(
        drawCroppedImg(i, img, {
          width: data[i].width,
          height: data[i].height,
        })
      )
    );
    setBase64Data(base64);
    setShowCroppedFile(true);
    redirectToUrl(history, "/preview/");
  };
  const uploadImage = async (images) => {
    const url = "".concat(host, "/api/base64/images");
    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgs: images,
      }),
    });
  };

  const onUpload = () => {
    if (!base64Data && !base64Data.length) {
      return alert("Error uploading images");
    }

    uploadImage(base64Data)
      .then((response) => response.json())
      .then((response) => {
        setResponseData(response.data);
        setShowUploadedFile(true);
        redirectToUrl(history, "/list/");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const redirectToUrl = (history, url) => {
    history.push(url);
  };

  return (
    <Container>
      {showUploadedFile ? (
        <ListUploadedImage data={responseData} host={host} />
      ) : (
        <div hidden={!showCroppedFile}>
          <Button type="primary" onClick={onUpload}>
            Upload Cropped Images
          </Button>
          <ListCroppedImage data={data} showCroppedFile={showCroppedFile} />
        </div>
      )}
      {!showCroppedFile && (
        <div>
          <h2>Crop Image</h2>
          <span>Upload a file: </span>
          <input
            id="upload-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          {file && (
            <div>
              <Button
                type="primary"
                onClick={() =>
                  handleOnClick(file, { width: 1024, height: 1024 })
                }
              >
                View Cropped Images
              </Button>
              <br />
              <h4>Original Image (1024 x 1024)</h4>
              <div>
                <img id="img-uploaded" src={file} alt="original" />
              </div>
              <br />
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default Cropper;
