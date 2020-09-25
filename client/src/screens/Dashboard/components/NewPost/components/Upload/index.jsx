import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from '@apollo/client';

import gql from 'graphql-tag';
const UploadMutation = gql`
  mutation uploadToCloudinary($file: Upload!) {
    uploadToCloudinary(file: $file)
  }
`;



const FileUpload = ({post, updateImage}) => {

  let [imageUpload, setImageUpload] = useState('')
  const [uploadToCloudinary] = useMutation(UploadMutation);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      // select the first file from the Array of files
      const file = acceptedFiles[0];
      // use the uploadToCloudinary variable created earlier
      let cloudinaryUrl = await uploadToCloudinary({
        // use the variables option so that you can pass in the file we got above
        variables: { file },
        onCompleted: (data) => {
          console.log(data)
        },
        onError: (error) => console.log(error)
      });
      setImageUpload(cloudinaryUrl.data.uploadToCloudinary)
      updateImage(cloudinaryUrl.data.uploadToCloudinary)
    },
    // pass in uploadToCloudinary as a dependency
    [uploadToCloudinary]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <div {...getRootProps()} className={`dropzone ${isDragActive && "isActive"}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {imageUpload && <img src={imageUpload}></img>}
    </>
  );
};
export default FileUpload;