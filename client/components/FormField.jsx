import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native'

import EyeIcon from "../assets/icons/eye.svg"
import EyeOffIcon from "../assets/icons/eye-off.svg"

const FormField = ({ title, value, placeholder, onChangeText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txt}>
          {title}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={value}
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
            {...props}
          />
          {title === 'Password' && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              {
                !showPassword ? <EyeIcon stroke='black' /> : <EyeOffIcon stroke='black' />
              }
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  )
}

export default FormField

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    padding: 10,
  },
})