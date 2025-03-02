import { Stack, Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useGlobalContext } from '../../context/GlobalProvider'

const OnboardingLayout = () => {
  // TODO: make sure onboarding screen are only displayed once

  // get loading and logged in state from context
  const { loading, isLogged } = useGlobalContext()

  // if there is no loading and current user is not logged in redirect to sign in
  if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen name="page-one" options={{ headerShown: false }} />
        <Stack.Screen name="page-two" options={{ headerShown: false }} />
        <Stack.Screen name="page-three" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="dark" />
    </>

  )
}

export default OnboardingLayout
