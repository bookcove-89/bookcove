import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'

const Button = ({ title, onPress, isLoading, otherStyles, textStyles }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, otherStyles]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isLoading ? <ActivityIndicator color='#000000' /> :
        (
          <Text style={[styles.txt, textStyles]}>
            {title}
          </Text>
        )
      }
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#E5A000',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15
  }
})