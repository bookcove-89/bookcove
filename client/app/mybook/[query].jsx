import {
  Text,
  View,
  Alert,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'

import Header from '../../components/Header'
import Book from '../../components/Book'

import BackIcon from '../../assets/icons/back.svg';

import { useGlobalContext } from '../../context/GlobalProvider'
import FormField from '../../components/FormField'
import Button from '../../components/Button'
import { updateBookProgress } from '../../lib/libraryapi'

const MyBook = () => {
  const { user } = useGlobalContext()
  const { myBook } = useLocalSearchParams()
  const [currentBookDetails, setCurrentBookDetails] = useState(null)

  const [pageInput, setPageInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(null);

  const handleUpdatingBookProgress = async () => {
    setIsUpdating(true)
    try {
      const newPageNumber = parseInt(pageInput, 10);
      const res = await updateBookProgress(user.$id, currentBookDetails.id, pageInput)

      setPageInput('')

      setCurrentBookDetails(prevDetails => {
        if (!prevDetails) return null; // Should not happen if component is rendered
        return {
          ...prevDetails,
          reading_progress: {
            ...prevDetails.reading_progress,
            page_bookmark: newPageNumber, // Update with the new page number
          }
        };
      });
    } catch (err) {
      console.log(err)

    } finally {
      setIsUpdating(false)
    }
  }

  const fetchMyBooks = async () => {
    try {
      const parsed = JSON.parse(myBook);
      setCurrentBookDetails(parsed);
    } catch (e) {
      console.error("Error parsing book data from params:", e)
      Alert.alert("Error", "Could not load book details.")
    }
  }
  useEffect(() => {
    if (myBook) {
      try {
        const parsed = JSON.parse(myBook);
        setCurrentBookDetails(parsed);
      } catch (e) {
        console.error("Error parsing book data from params:", e)
        Alert.alert("Error", "Could not load book details.")
      }
    } else {
      console.warn("Book data parameter is missing.")
      Alert.alert("Error", "Book details not found.")
    }
  }, [myBook]);

  // Render a loading indicator or null if book details are not yet loaded
  if (!currentBookDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E5A000" />
          <Text style={styles.loadingText}>Loading book details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <Header
          smallTxt={"Book Cove"}
          largeTxt={"Book Progress"}
        />
        {/* Back Button*/}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackIcon width={22} height={22} stroke="#3B82F6" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {/* Book Cover */}
            <View style={styles.bookCoverMainContainer}>
              <View style={styles.bookWrapper}>
                <Book
                  uri={currentBookDetails.cover_img?.at(-1)}
                  title={currentBookDetails.title}
                  height={240}
                  width={160}
                  radius={8}
                />
              </View>

              <Text style={[styles.txtlg, styles.authorText, { fontSize: 15, marginTop: 10 }]}>{currentBookDetails.title}</Text>
              <Text style={[styles.txtlg, styles.authorText, { color: '#757575' }]} >
                {currentBookDetails.authors?.join(', ') ?? 'Unknown Author'}
              </Text>
              {currentBookDetails.genre && currentBookDetails.genre.length > 0 && (
                <View style={styles.genreContainer}>
                  {currentBookDetails.genre.map((genre, index) => (
                    <Text style={styles.genreText} key={index}>
                      {genre}
                    </Text>
                  ))}
                </View>
              )}
              <Text style={[styles.txt, styles.authorText, { fontSize: 13, marginTop: 10, color: 'black' }]}>
                Num. Of Pages: {currentBookDetails.page_count ?? 'N/A'}
              </Text>

              <Text style={[styles.txt, styles.authorText, { fontSize: 13, marginTop: 10, color: 'black' }]}>
                Your Progress: {currentBookDetails.reading_progress.page_bookmark ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.updateSection}>
              <Text style={styles.sectionTitle}>Update Your Progress</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Page Number"
                inputMode="numeric"
                keyboardType="number-pad"
                value={pageInput}
                onChangeText={setPageInput}
              />
              <Button
                title='Update Progress'
                otherStyles={{ borderColor: '#E5A000' }}
                isLoading={isUpdating}
                onPress={handleUpdatingBookProgress}
              />

            </View>
            {/* Extra padding at the bottom of ScrollView content */}
            <View style={{ paddingBottom: 40 }} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default MyBook

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 13,
    marginBottom: 16, // Space before the button
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#555',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#888',
  },
  txtlg: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 6,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  bookCoverMainContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bookWrapper: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  authorText: {
    textAlign: 'center',
    marginTop: 4,
  },

  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  genreText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#E5A000',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    margin: 4,
    overflow: 'hidden',
  },
  actionsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 20,
  },
  actionButtonContainer: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    paddingTop: 5,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  updateSection: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
});