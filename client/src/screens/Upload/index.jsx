import React, { useContext,useState, useCallback } from "react";
import {useDropzone} from 'react-dropzone'
import axios from "axios";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import auth from '../../utils'

function Upload() {
  const [signUrl, { loading }] = useMutation(auth.SIGNURL);
  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options);
  };

  const onDrop = useCallback(async acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles[0])
    let {name, type} = acceptedFiles[0]
    const signPayload = await signUrl({variables: {filename: name, filetype: type}})
    console.log(signPayload)
    let signedRequestURL = signPayload.data.s3SignMutation.signedRequest;
    uploadToS3(acceptedFiles[0], signedRequestURL)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}


const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;

// const Upload = () => {
//   let [file, setFile] = useState();

//   const uploadToS3 = async (file, signedRequest) => {
//     const options = {
//       headers: {
//         "Content-Type": file.type
//       }
//     };
//     await axios.put(signedRequest, file, options);
//   };

//   const handleFile = file => {
//     setFile(file[0])
//   }


//   return (
//       <div>
//         <input name="name"  />
//        <Dropzone>
//         {dropzoneProps => {
//           return (
//             <div>
//               <p>Drop some files here</p>
//             </div>
//           );
//         }}
//   </Dropzone>;
//         <button>Submit</button>
//       </div>
//     );
// }
export default Upload;