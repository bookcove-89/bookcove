import { 
  Text, 
  View, 
  Alert, 
  FlatList,
  Dimensions,
  StyleSheet, 
  ScrollView, 
  RefreshControl, 
  TouchableOpacity, 
  ActivityIndicator,
} from 'react-native'
import { router } from 'expo-router'
import { useState, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../../components/Header'
import Book from '../../components/Book'

import BookShelf from '../../assets/images/bookshelf.svg'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getMyFavoriteBooks } from '../../lib/bookapi'

const Favorites = () => {
  const { isLogged, user } = useGlobalContext()
  const [favBooks, setFavBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const screenWidth = Dimensions.get('window').width;
  const bookWidthForGrid = ((screenWidth - (2 * 20) - (2 * 12)) / 2) - (2 * 10)
  const bookHeightForGrid = bookWidthForGrid * 1.6;

  // data fetching logic
  const fetchFavorites = useCallback(async (userId) => {
    if (!userId) {
      setFavBooks([]); // Clear books if no user ID
      return;
    }
    try {
      const data = await getMyFavoriteBooks(userId);
      // Ensure data is an array, default to empty array if not
      setFavBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Failed to fetch favorites:", err);
      setFavBooks([]);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (user?.$id) {
      setLoading(true);
      fetchFavorites(user.$id).finally(() => {
        setLoading(false);
      });
    } else {
      // No user, clear books and ensure loading is off
      setFavBooks([]);
      setLoading(false);
    }
  }, [user, fetchFavorites]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    if (!user?.$id) {
      setRefreshing(false); // Ensure refreshing stops if no user
      return;
    }
    setRefreshing(true);
    try {
      await fetchFavorites(user.$id);
    } finally {
      setRefreshing(false);
    }
  }, [user, fetchFavorites]);

  const renderFavoriteItem = ({ item: book }) => (
    <View style={styles.gridItemCell}>
      <TouchableOpacity
        style={styles.bookTouchable}
        onPress={() => {
          if (book && book.id) {
            router.push({
              pathname: `search/${book.id}`,
              params: { book: JSON.stringify(book) }
            });
          } else {
            console.warn("Attempted to navigate with invalid book data:", book);
            Alert.alert("Error", "Cannot open this book's details.");
          }
        }}
      >
        <Book
          uri={book.cover_img?.at(-1)}
          title={book.title}
          width={bookWidthForGrid}
          height={bookHeightForGrid}
          radius={8} // Consistent radius
        />
      </TouchableOpacity>
      {/* add title/author text below the book cover if desired */}
      <Text numberOfLines={1} style={styles.bookTitleGrid}>{book.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          smallTxt={"Book Cove"}
          largeTxt={"Favorites"}
        />

        {(loading && !refreshing) && (<ActivityIndicator style={{ paddingVertical: 20 }} size="large" color="#E5A000" />)}

        {!loading && favBooks.length === 0 && (

          <ScrollView
            style={{ height: '100%' }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E5A000"]} tintColor={"#E5A000"} />
            }
          >
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <BookShelf height={200} width={300} />
              <Text style={[styles.txt, { fontSize: 14, color: 'red', paddingVertical: 15 }]}>No current favorite books</Text>
            </View>
          </ScrollView>
        )}

        {favBooks.length > 0 && (
          <FlatList
            style={{ height: '100%' }}
            data={favBooks}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id ? item.id.toString() : (item._id ? item._id.toString() : Math.random().toString())}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E5A000"]} tintColor={"#E5A000"} />
            }
          />
        )}

      </View>
    </SafeAreaView>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  gridItemCell: {
    flex: 0.5,
    padding: 8,
    alignItems: 'center',
  },
  bookTouchable: {
    backgroundColor: '#fff',
    borderRadius: 12,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Android Shadow
    elevation: 4,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContentContainer: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  bookTitleGrid: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    color: '#333',
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#888',
  },
})