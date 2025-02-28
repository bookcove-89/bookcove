import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { Text, View } from 'react-native'
import BookLover from "../../assets/images/book-lover.svg"
import Button from '../../components/Button'
import styles from './styles'

const PageTwo = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.image}>
        <BookLover height={350} width={350} />
      </View>

      <View style={styles.text}>
        <Text style={styles.heading}>Build Your Dream Library</Text>
        <Text style={styles.subtext}>Save books you love, keep track of what you're reading, and create a wishlist for future reads!</Text>
      </View>

      <View style={styles.circleContainer}>
        <View style={styles.circle} />
        <View style={[styles.circle, { backgroundColor: '#FBBC05' }]} />
        <View style={styles.circle} />

      </View>

      <View style={styles.buttonContainer}>
        <Button
          title='Next'
          onPress={() => router.replace('/page-three')}
        />
        <Link href="/sign-up" style={styles.skipText}>
          Skip
        </Link>
      </View>

    </SafeAreaView>
  )
}

export default PageTwo