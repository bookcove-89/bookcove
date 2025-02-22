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
        <Text style={styles.heading}>Track Your Reading Progress</Text>
        <Text style={styles.subtext}>Easily log the books you've read, organize your collection, and track your progress—all in one place.</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={[styles.circle, { backgroundColor: '#FBBC05' }]} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => router.replace('/')}
        />
        <Link href="/" style={styles.skipText}>
          Skip
        </Link>
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
    width: 15,
    height: 15,
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
