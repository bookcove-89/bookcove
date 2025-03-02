import { Alert, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native'
import { Link, router, Redirect } from 'expo-router'
import { useState } from 'react'
import Logo from '../../components/Logo'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser, login } from '../../lib/appwrite'
import Button from '../../components/Button'
import FormField from '../../components/FormField'
import BookIcon from '../../assets/images/book.svg'
import styles from './styles'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const submit = async () => {
    // check for empty fields
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "All fields are required. Please complete the missing information.")
      return
    }

    // set loading state
    setSubmitting(true)

    try {
      // login user
      await login(form.email, form.password)
      // get the current user
      const res = await getCurrentUser()

      // clear form
      setForm({
        email: '',
        password: ''
      })

      // set the user and logged in state in the context
      setUser(res)
      setIsLogged(true)

      // display success message
      Alert.alert("Success", "User signed in successfully");

      // redirect to home screen
      router.replace("/home")

    } catch (error) {
      // display error messages
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
              <Text style={styles.headingtxt}>Login To BookCove </Text>
            </View>
            <View style={styles.form}>
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
                  title='Login'
                  onPress={submit}
                  isLoading={submitting}
                />
              </View>
              <Text style={styles.txt}> Don't Have an Account?
                <Link href="/sign-up" style={{ color: "#FF7051" }}> Signup Here</Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default SignIn