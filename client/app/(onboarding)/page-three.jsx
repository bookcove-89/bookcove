import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native'
import { router } from 'expo-router'
import WomanReading from "../../assets/images/woman-reading.svg"
import Button from '../../components/Button'
import styles from './styles'

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