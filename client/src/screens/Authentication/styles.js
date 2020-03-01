import { StyleSheet } from 'react-native';

import colors from "../../config/colors"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.WHITE,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: "80%"
    },
    logo: {
      // width: 0
      marginTop: 150,
      width: 310,
      height: 35
    },
    text: {
      color: 'white'
    }
  })

  export default styles