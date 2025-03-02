import { Stack, Redirect } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const AuthLayout = () => {
  // get loading and logged in state from context
  const { loading, isLogged } = useGlobalContext()

  // if there is no loading and current user is logged in redirect to home page
  if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false}} />
        <Stack.Screen name="sign-up" options={{ headerShown: false}} />
      </Stack>
    </>
  )
}

export default AuthLayout
