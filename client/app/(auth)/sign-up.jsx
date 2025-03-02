import { Alert, Text, View, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import Logo from '../../components/Logo'

import { createUser } from '../../lib/appwrite'
import Button from '../../components/Button'
import FormField from '../../components/FormField'
import BookIcon from '../../assets/images/book.svg'
import styles from './styles'

const SignUp = () => {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const submit = async () => {
    // check for empty fields
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "All fields are required. Please complete the missing information.")
      return
    }

    // set loading state
    setSubmitting(true)

    try {
      // create new account
      const res = await createUser(form.name, form.email, form.password)

      // clear form
      setForm({
        name: '',
        email: '',
        password: ''
      })
      console.log(res)

      // redirect to home page
      router.replace("/home")

      // display success message
      // Alert.alert("Success", "New account created!")
    } catch (error) {
      // display error message
      Alert.alert("Error", error.message)
    } finally {
      // clear loading state
      setSubmitting(false)
    }
  }
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ alignContent: 'center', paddingTop: 80 }}>
          <View>
            <View style={styles.heading}>
              <BookIcon height={45} width={45} />
              <Text style={styles.headingtxt}>Signup To BookCove </Text>
            </View>
            <View style={styles.form}>
              <FormField
                title='Name'
                value={form.name}
                placeholder='Enter First Name'
                onChangeText={(e) => setForm({ ...form, name: e })}
              />
              <FormField
                title='Email'
                value={form.email}
                placeholder='example@gmail.com'
                onChangeText={(e) => setForm({ ...form, email: e })}
              />
              <FormField
                title='Password'
                value={form.password}
                placeholder='Enter Password'
                onChangeText={(e) => setForm({ ...form, password: e })}
              />
              <View style={{ paddingVertical: 20 }}>
                <Button
                  title='Sign Up'
                  onPress={submit}
                  isLoading={submitting}
                  otherStyles={{ padding: 13 }}
                />
              </View>
              <Text style={styles.txt}> Already Have an Account?
                <Link href="/sign-in" style={{ color: "#FF7051" }}> Login Here</Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default SignUp