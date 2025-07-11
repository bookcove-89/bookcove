import {
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  RefreshControl,
  ActivityIndicator

} from 'react-native'

import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'

import Header from '../../components/Header'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getMyBooksFromLib, getBooksInProgress, getCompletedBooks } from '../../lib/libraryapi'
import Book from '../../components/Book'
import { router } from 'expo-router'

const screenWidth = Dimensions.get('window').width;
const bookWidth = ((screenWidth - (2 * 20) - (2 * 12)) / 2) - (2 * 10);
const bookHeight = bookWidth * 1.6;

const Library = () => {
  const { isLogged, user } = useGlobalContext()
  const [myBooks, setMyBooks] = useState([])
  const [myCompletedBooks, setMyCompletedBooks] = useState([])
  const [myBooksInProgress, setMyBooksInProgress] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)



  // data fetching logic
  const fetchMyBooks = useCallback(async (userId) => {
    if (!userId) {
      setMyBooks([])
      return
    }

    try {
      const data = await getMyBooksFromLib(userId)
      // make sure the data is an array, default to empty array if not
      setMyBooks(Array.isArray(data.books) ? data.books : [])
    } catch (err) {
      console.log("Failed to fetch my books", err)
      setMyBooks([])
    }
  }, [])

  // data fetching logic for COMPLETED books
  const fetchMyCompletedBooks = useCallback(async (userId) => {
    if (!userId) {
      setMyCompletedBooks([]);
      return;
    }
    // setLoading(true); // Or a specific loading state like setLoadingCompleted(true)
    try {
      const data = await getCompletedBooks(userId);
      setMyCompletedBooks(Array.isArray(data?.books) ? data.books : (Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Failed to fetch completed books", err);
      setMyCompletedBooks([]);
    } finally {
      // setLoading(false); // Or setLoadingCompleted(false)
    }
  }, []);

  // data fetching logic for IN PROGRESS books
  const fetchMyBooksInProgress = useCallback(async (userId) => {
    if (!userId) {
      setMyBooksInProgress([]);
      return;
    }
    // setLoading(true); // Or a specific loading state like setLoadingInProgress(true)
    try {
      const data = await getBooksInProgress(userId);
      setMyBooksInProgress(Array.isArray(data?.books) ? data.books : (Array.isArray(data) ? data : []));
    } catch (err) {
      console.log("Failed to fetch in-progress books", err);
      setMyBooksInProgress([]);
    } finally {
      // setLoading(false); // Or setLoadingInProgress(false)
    }
  }, []);

  // initial load
  useEffect(() => {
    if (user?.$id) {
      setLoading(true);
      Promise.all([
        fetchMyBooks(user.$id),
        fetchMyCompletedBooks(user.$id),
        fetchMyBooksInProgress(user.$id)
      ]).finally(() => {
        setLoading(false);
      });
    } else {
      setMyBooks([]);
      setMyCompletedBooks([]);
      setMyBooksInProgress([]);
      setLoading(false);
    }
  }, [user?.$id, fetchMyBooks, fetchMyCompletedBooks, fetchMyBooksInProgress]);

  // pull to refresh
  const onRefresh = useCallback(async () => {
    if (!user?.$id) {
      setRefreshing(false);
      return;
    }
    setRefreshing(true);
    try {
      await Promise.all([
        fetchMyBooks(user.$id),
        fetchMyCompletedBooks(user.$id),
        fetchMyBooksInProgress(user.$id)
      ]);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, [user?.$id, fetchMyBooks, fetchMyCompletedBooks, fetchMyBooksInProgress]);


  const renderMyBook = ({ item: book }) => (
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
          width={bookWidth}
          height={bookHeight}
          radius={8}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.bookTitle}>
        {book.title}
      </Text>
    </View>
  )

  // NOTE: use this for all loading 
  if (loading) {
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
      <View>
        <Header
          smallTxt={"Book Cove"}
          largeTxt={"Library"}
        />

        <ScrollView
          style={{ height: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E5A000"]} tintColor={"#E5A000"} />
          }
        >

          <Text style={[styles.sectionTitle, { color: '#333', marginTop: 30 }]}>My Books</Text>
          {myBooks.length > 0 ? (
            <FlatList
              horizontal={true}
              data={myBooks}
              renderItem={renderMyBook}
              keyExtractor={(item) => item.id ? item.id.toString() : (item._id ? item._id.toString() : Math.random().toString())}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View>
              <View style={[styles.placeholderSection, { height: bookHeight + 60 }]}>
                <Text style={styles.emptyStateText}>No books in your library.</Text>
              </View>
            </View>
          )}

          <Text style={[styles.sectionTitle, { color: '#333', marginTop: 30 }]}>In Progress</Text>
          {myBooksInProgress.length > 0 ? (
            <FlatList
              horizontal={true}
              data={myBooksInProgress}
              renderItem={renderMyBook}
              keyExtractor={(item) => item.id ? item.id.toString() : (item._id ? item._id.toString() : Math.random().toString())}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View>
              <View style={[styles.placeholderSection, { height: bookHeight + 60 }]}>
                <Text style={styles.emptyStateText}>No books in progress.</Text>
              </View>
            </View>
          )}


          <Text style={[styles.sectionTitle, { color: '#333', marginTop: 30 }]}>Completed</Text>
          {myCompletedBooks.length > 0 ? (
            <FlatList
              horizontal={true}
              data={myCompletedBooks}
              renderItem={renderMyBook}
              keyExtractor={(item) => item.id ? item.id.toString() : (item._id ? item._id.toString() : Math.random().toString())}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View>
              <View style={[styles.placeholderSection, { height: bookHeight + 60 }]}>
                <Text style={styles.emptyStateText}>No books completed yet.</Text>
              </View>
            </View>
          )}
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default Library

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
  bookList: {
    padding: 8
  },
  bookItemWrapper: { // Wrapper for each item in FlatList
    marginHorizontal: 8, // Spacing between books
    alignItems: 'center', // Center title below book
    // Width will be determined by Book component + title considerations
  },
  bookTouchable: {
    backgroundColor: '#fff', // Or transparent if Book has its own background
    borderRadius: 12, // Match Book's radius if it's for the shadow effect
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Slightly reduced opacity
    shadowRadius: 3,  // Slightly reduced radius
    // Android Shadow
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginBottom: 12,
    // marginTop removed, can be added per instance if needed or kept for all
  },
  bookTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginTop: 8, // Space between book image and title
    textAlign: 'center',
    color: '#333',
    width: bookWidth, // Make title width same as book image for alignment
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyStateContainer: { // For the "My Books" empty state
    height: bookHeight + 60, // Match the list height for visual consistency
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20, // Match horizontalList marginBottom
  },
  emptyStateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyStateSubText: { // Only for "My Books" empty state
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 4,
  },
  placeholderSection: { // For "In Progress" / "Completed" placeholders
    height: bookHeight + 60, // Use calculated height for consistency
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Slightly different background for placeholders
    borderRadius: 8,
    marginBottom: 20,
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

})