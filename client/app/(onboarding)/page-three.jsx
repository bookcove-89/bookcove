import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WomanReading from "../../assets/images/woman-reading.svg"
import { Link } from 'expo-router'
import Button from '../../components/Button'
import { router } from 'expo-router'

const PageThree = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.image}>
        <WomanReading height={350} width={350} />
      </View>

      <View style={styles.text}>
        <Text style={styles.heading}>Discover & Stay Motivated</Text>
        <Text style={styles.subtext}>Mark your favorite books, set reading goals, and never lose track of your next great read!</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={[styles.circle, { backgroundColor: '#FBBC05' }]} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started!"
          onPress={() => router.replace('/sign-up')}
        />
        <Text style={styles.skipText}>
          
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default PageThree 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#D9D9D9',
  },
  circleContainer: {
    position: 'absolute',
    bottom: 235, // Place it just above the button
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    fontFamily: 'EBG',
    fontSize: 30,
    padding: 10,
    paddingBottom: 40,
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    flex: 1,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 20
  },
  skipText: {
    color: '#828282',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
})
