import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const OnboardingLayout = () => {
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
