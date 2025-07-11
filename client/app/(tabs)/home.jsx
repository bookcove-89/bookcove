import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyLib from '../../assets/images/empty-lib.svg'
import Header from '../../components/Header'

import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  const { loading, isLogged, user } = useGlobalContext()
  const [books, setBooks] = useState({})

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          smallTxt={"Welcome Back"}
          largeTxt={user?.name}
        />

        <ScrollView
          style={{ padding: 10 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={{ flex: 1 }}>
            {books ? (
              // if there books load this
              <View>
                <Text style={[styles.txt, { paddingTop: 25 }]}>Currently Reading</Text>
                {Array.from({ length: 20 }).map((_, index) => (
                  <View key={index} style={{ padding: 10, marginBottom: 5, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                    <Text>Book {index + 1}: Lorem ipsum dolor sit amet </Text>
                  </View>
                ))}
              </View>
            ) : (
              // if there are no books shows the empty image
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 125 }}>
                {/* Background Image */}
                <EmptyLib height={200} width={300} />
                {/* Overlay Text */}
                <Text style={styles.overlayText}>No books added yet. Start tracking your collection now.</Text>
              </View>
            )}

          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  txtlg: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24
  },
  overlayText: {
    position: 'absolute',
    textAlign: 'center',
    padding: 40,
    width: '75%',
    fontFamily: 'Poppins-Regular',
    paddingTop: 75
  },
})