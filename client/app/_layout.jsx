import { Stack, SplashScreen} from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react';

import GlobalProvider from '../context/GlobalProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "EBG": require("../assets/fonts/EBGaramond-VariableFont_wght.ttf"),
    "EBG-Italic": require("../assets/fonts/EBGaramond-Italic-VariableFont_wght.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Caveat": require("../assets/fonts/Caveat-VariableFont_wght.ttf"),
    "Patrick-Hand": require("../assets/fonts/PatrickHand-Regular.ttf")
  });
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="mybook/[query]" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    </>
  )
}

export default RootLayout

