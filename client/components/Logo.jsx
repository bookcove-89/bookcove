import { StyleSheet, View } from 'react-native'
import React from 'react'
import BookIcon from "../assets/images/book.svg"
import TextLogo from "../assets/images/logo.svg"
import TextLogo2 from "../assets/images/logo2.svg"

const Logo = () => {
  return (
    <View style={styles.container}>
      <BookIcon height={70} width={70} />
      <TextLogo2 />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',  
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
  }
});