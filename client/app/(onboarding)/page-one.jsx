import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { Text, View } from 'react-native'
import FlyingBook from "../../assets/images/flying-book.svg"
import Button from '../../components/Button'
import styles from './styles'

const PageOne = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.image}>
        <FlyingBook height={350} width={350} />
      </View>

      <View style={styles.text}>
        <Text style={styles.heading}>Track Your Reading Progress</Text>
        <Text style={styles.subtext}>Easily log the books you've read, organize your collection, and track your progress—all in one place.</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={[styles.circle, { backgroundColor: '#FBBC05' }]} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={() => router.replace('/page-two')}
        />
        <Link href="/sign-up" style={styles.skipText}>
          Skip
        </Link>
      </View>

    </SafeAreaView>
  )
}

export default PageOne