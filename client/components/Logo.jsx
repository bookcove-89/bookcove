import { StyleSheet, View } from 'react-native'
import React from 'react'
import BookIcon from "../assets/images/book.svg"
import TextLogo from "../assets/images/logo.svg"

const Logo = () => {
  return (
    <View style={styles.container}>
      <BookIcon height={75} width={75} />
      <TextLogo />
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