import {
  Alert,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import { router } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../../components/Header'
import Book from '../../components/Book'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getMyBooksFromLib } from '../../lib/libraryapi'
import { getQuote } from '../../lib/quote' 

const screenWidth = Dimensions.get('window').width;
const containerPadding = 20;
const columnGap = 12;
const itemMargin = 8;

const numColumns = 3;
const totalHorizontalPadding = (containerPadding * 2) + ((numColumns - 1) * columnGap) + (itemMargin * 2 * numColumns);
const bookWidth = (screenWidth - totalHorizontalPadding) / numColumns;
const bookHeight = bookWidth * 1.5;

const Home = () => {
  const { user } = useGlobalContext() // isLogged is not used, so removed
  const [books, setBooks] = useState([])
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [loadingQuote, setLoadingQuote] = useState(false)
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('')
  const [quoteAuthor, setQuoteAuthor] = useState('')
  const [quoteError, setQuoteError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handleGettingQuote = useCallback(async () => {
    setLoadingQuote(true)
    setQuoteError(false)
    try {
      const res = await getQuote();

      if (Array.isArray(res) && res.length > 0) {
        setQuoteOfTheDay(res[0].q); // 'q' for quote
        setQuoteAuthor(res[0].a);   // 'a' for author
      } else {
        console.warn("Zenquotes API returned no data or unexpected format:", res);
        setQuoteError(true);
        setQuoteOfTheDay("Failed to load quote.");
        setQuoteAuthor("Please try again later.");
      }
    } catch (err) {
      console.error("Failed to fetch quote:", err);
      setQuoteError(true);
      setQuoteOfTheDay("Could not load quote.");
      setQuoteAuthor("Check your network connection.");
    } finally {
      setLoadingQuote(false)
    }
  }, []);

  const handleFetchingBooks = useCallback(async (userId) => {
    if (!userId) {
      setBooks([])
      return
    }
    setLoadingBooks(true)
    try {
      const data = await getMyBooksFromLib(userId)
      setBooks(Array.isArray(data.books) ? data.books : [])
    } catch (err) {
      console.error("Failed to fetch my books", err)
      setBooks([])
    } finally {
      setLoadingBooks(false)
    }
  }, [])


  useEffect(() => {
    handleGettingQuote()
    if (user?.$id) {
      handleFetchingBooks(user.$id)
    } else {
      setBooks([])
    }
  }, [user?.$id, handleFetchingBooks, handleGettingQuote])

  const renderBookItem = ({ item: book }) => (
    <View style={styles.bookItemWrapper}>
      <TouchableOpacity
        style={styles.bookTouchable}
        onPress={() => router.push({
          pathname: `mybook/${book.id}`,
          params: { myBook: JSON.stringify(book) }
        })}
      >
        <Book
          uri={book.cover_img?.at(-1)}
          title={book.title}
          width={styles.bookImage.width}
          height={styles.bookImage.height}
          radius={8}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.bookTitle}>
        {book.title}
      </Text>
    </View>
  )

  const onRefresh = useCallback(async () => {
    if (!user?.$id) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);
    try {
      await Promise.all([
        handleGettingQuote(),
        handleFetchingBooks(user.$id),
      ]);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, [user?.$id, handleGettingQuote, handleFetchingBooks]);



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E5A000"]} tintColor={"#E5A000"} />
        }
      >
        <Header
          smallTxt={"Welcome Back"}
          largeTxt={user?.name || "Guest"}
        />

        {/* My Library Section  */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Library</Text>
          {loadingBooks ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="#E5A000" />
              <Text style={styles.loadingText}>Loading your library...</Text>
            </View>
          ) : books.length > 0 ? (
            <>
              <FlatList
                data={books.slice(0, 3)}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.bookListContent}
                scrollEnabled={false}
              />

              {/* "See All" button, if there are more than 3 books */}
              {books.length > 3 && (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() => router.push('/library')}
                >
                  <Text style={styles.seeAllButtonText}>See All</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>Your library is empty!</Text>
              <Text style={styles.emptyStateSubText}>
                Add books from the search screen to start tracking your progress.
              </Text>
            </View>
          )}
        </View>

        {/* Quote of the Day Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quote of the Day</Text>
          <View style={styles.quoteCard}>
            {loadingQuote ? (
              <ActivityIndicator size="small" color="#E5A000" />
            ) : quoteError ? (
              <View>
                <Text style={styles.quoteErrorText}>Failed to load quote.</Text>
                <Text style={styles.quoteErrorSubText}>Please check your internet.</Text>
              </View>
            ) : (
              <>
                <Text style={styles.quoteText}>
                  "{quoteOfTheDay}"
                </Text>
                <Text style={styles.quoteAuthor}>
                  - {quoteAuthor}
                </Text>
              </>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  sectionContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 12,
    color: '#333',
  },
  // --- Book List Styles ---
  bookListContent: {

  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  bookItemWrapper: {
    alignItems: 'center',
    width: bookWidth + (itemMargin * 2),
    marginBottom: 5,
  },
  bookTouchable: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: '#fff',
  },
  bookImage: {
    width: bookWidth,
    height: bookHeight,
    borderRadius: 8,
  },
  bookTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
    width: bookWidth,
  },
  // --- Loading & Empty States (Shared) ---
  activityIndicatorContainer: {
    height: bookHeight * 2, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  emptyStateContainer: {
    height: bookHeight * 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20
  },
  emptyStateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyStateSubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
  },
  placeholderSection: {
    height: bookHeight * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 20,
  },
  // --- "See All" Button Styles ---
  seeAllButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E5A000',
    borderRadius: 8,
    alignSelf: 'center',
  },
  seeAllButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  // --- Quote of the Day Styles ---
  quoteCard: {
    backgroundColor: '#E5A000',
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  quoteText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4a4848',
    textAlign: 'center',
  },
  quoteErrorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
  quoteErrorSubText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#4a4848',
    textAlign: 'center',
    marginTop: 5,
  }
});