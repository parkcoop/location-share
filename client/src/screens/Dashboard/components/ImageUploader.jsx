import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native';

import ImagePicker from 'react-native-image-picker';


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

 

const ImageUploader = ({style, ...otherProps}) => {
let [image, setImage] = useState()
const showUploadDialog = () => {
  ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
      setImage(source)
      console.log(image)
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
      //   this.setState({
      //     avatarSource: source,
      //   });
      }
    });
}
    return (
        <View>
            <Button title="Choose File" onPress={showUploadDialog} />
        </View>

    )


}

export default ImageUploader