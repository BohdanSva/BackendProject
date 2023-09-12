import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { selectImage } from "../../../features/property/propertySlice";

const ImageUpload = ({getData}: any) => {
    // Definitions
    const { propertySlug }: any = useParams(); // propertySlug path configuration
    const [file, setFile]: any = useState();
    const oldImage = useSelector(selectImage);

    // Functions 
    const onFileInput = (file: any) => {
        setFile(file.target.files[0]); // Set the uploaded file as "file" variable
    }

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('image', file); // "image" is the name of the field, "file" variable is the value appended to the form
        formData.append('oldImage', oldImage);
        const uploadURL = `http://localhost:3001/user/property/${propertySlug}`;
        const token = localStorage.getItem("token");
        try {
          const {data} = await axios.request({
            url: uploadURL,
            method: "post",
            headers: {
              "token": `${token}`,
            },
            data: formData
            });
          if (data.status === 1) {
            console.log("Image uploaded");
            getData(); // Gets the new image location from server, re-rendering the parent and so showing the image on upload
          }
        } 
        catch (error) {console.log(error);}
      }

return (
    <>
    <div className="user">
    
      <div className="d-grid gap-2 col mx-auto">
        <button
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#upload" 
          type="button" 
        > Upload image
        </button>
      </div>

    {/* Modal for uploading asset picture */}
    <div className="modal fade" id="upload" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fs-2" id="staticLabel">Upload image</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input type="file" onChange={onFileInput} className="form-control" id="file-input" aria-describedby="inputFile" aria-label="Upload"/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go back</button>
            <button 
              type="button" 
              className="btn btn-warning"
              data-bs-dismiss="modal"
              onClick={onFileUpload}
            > Upload file
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
    </>
);
};

export default ImageUpload;
