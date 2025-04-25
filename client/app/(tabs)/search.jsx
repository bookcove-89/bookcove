import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { search, recentSearches, getRecentSearches } from '../../lib/bookapi'
import Book from '../../components/Book'
import FormField from '../../components/FormField'
import SearchIcon from '../../assets/icons/search.svg'
import BookLogo from '../../assets/images/book.svg'
import AboutIcon from '../../assets/icons/badge-info.svg'
import AddIcon from '../../assets/icons/bookmark-plus.svg'
import HeartIcon from '../../assets/icons/heart.svg'
import Empty from '../../assets/images/empty.svg'
import SunRise from '../../assets/images/sun-rise.svg'

const Search = () => {
  const [form, setForm] = useState({
    book_name: ''
  })
  const [res, setRes] = useState([])
  const [recentSearchItems, setRecentSearchItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (form.book_name.trim() === '') {
      setRes([]);
      handleGetRecentSearches()
    }
  }, [form.book_name]);

  const handleGetRecentSearches = async () => {
    try {
      const data = await getRecentSearches()

      setRecentSearchItems(data.recent_searches)
    } catch (err) {
      console.error(err)
    }
  }

  const handlePostRecentSearches = async (bookname) => {
    try {
      const data = await recentSearches(bookname)

      setRecentSearchItems(data.recent_searches)
    } catch (err) {
      console.error(err)
    }
  }

  const submitSearchForm = async (bookname) => {
    setLoading(true);
    setRes([]);

    try {
      const data = await search(bookname);
      await handlePostRecentSearches(bookname)
      setRes(data.data);
    } catch (err) {
      Alert.alert("Search Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>

        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.txt}>Book Cove</Text>
            <Text style={[styles.txtlg, { lineHeight: 27 }]}>
              Search
            </Text>
          </View>
          <BookLogo height={48} width={48} />
        </View>

        <View style={{ padding: 0 }}>
          <FormField
            title='Enter a Book Title'
            value={form.book_name}
            placeholder={'Search'}
            onChangeText={(e) => setForm({ ...form, book_name: e })}
            onSubmitEnter={() => submitSearchForm(form.book_name)}
          >
            <SearchIcon height={20} width={20} stroke="#E5A000" />
          </FormField>


          {loading && (<ActivityIndicator style={{ paddingVertical: 20 }} size="large" color="#E5A000" />)}

          {res.length === 0 && (
            <View>
              <Text style={[styles.txt, { paddingBottom: 5 }]}>Recent Searches:</Text>

              {recentSearchItems.length > 0 ? (
                <>
                  {recentSearchItems.map((item, index) => (
                    <View key={item}>
                      <TouchableOpacity
                        onPress={() => {
                          setForm({ ...form, book_name: item });
                          submitSearchForm(item);
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}
                      >
                        <SearchIcon height={15} width={15} stroke="#1E90FF" />
                        <Text
                          style={{
                            color: '#1E90FF',
                            fontFamily: 'Poppins-Regular',
                            marginLeft: 6,
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={{
                          height: 1,
                          width: '100%',
                          backgroundColor: '#ccc',
                        }}
                      />
                    </View>
                  ))}

                  <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <SunRise height={200} width={300} />
                    <Text style={[styles.txt, { fontSize: 14, color: 'red' }]}>Let today’s search lead to tomorrow’s favorite story.</Text>
                  </View>
                </>
              ) : (
                <>
                  <Text style={[styles.txt, { fontSize: 15, color: 'red' }]}>
                    It’s a little quiet here... Search for something!
                  </Text>
                  <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 35 }}>
                    <Empty height={300} width={300} />
                  </View>
                </>
              )}
            </View>
          )}

        </View>


        <ScrollView
          style={{ paddingRight: 10 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {res.length > 0 ? (
            res.map((book, index) => (
              <View key={index} style={styles.bookList} >
                <View style={{ flexDirection: 'row' }}>

                  <View style={styles.bookContainer}>
                    <Book
                      uri={book.cover_img.at(-1)}
                      title={book.title}
                    />
                  </View>

                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.bookTitle}>{book?.title}</Text>
                    <Text style={[styles.txt, { fontSize: 12 }]}>Author(s): {book?.authors?.join(', ')}</Text>

                    <View style={{ flexDirection: 'row', paddingTop: 60, justifyContent: 'space-between', paddingHorizontal: 20 }}>
                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => router.push({
                            pathname: `search/${book.id}`,
                            params: { book: JSON.stringify(book) }
                          })}
                        >
                          <AboutIcon height={25} width={25} stroke='black' />
                        </TouchableOpacity>
                        <Text style={[styles.txt, { fontSize: 12, paddingTop: 5 }]}>Info</Text>
                      </View>

                      <View style={{ alignItems: 'center', marginLeft: 10 }}>
                        <TouchableOpacity>
                          <AddIcon height={25} width={25} stroke='black' />
                        </TouchableOpacity>
                        <Text style={[styles.txt, { fontSize: 12, paddingTop: 5 }]}>Add</Text>
                      </View>

                      <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity>
                          <HeartIcon height={25} width={25} stroke='black' />
                        </TouchableOpacity>
                        <Text style={[styles.txt, { fontSize: 12, paddingTop: 5 }]}>Favorite</Text>
                      </View>

                    </View>
                  </View>

                </View>
              </View>
            ))
          ) : (
            <View>
              <View />
            </View>
          )}
        </ScrollView>

      </View >
    </SafeAreaView >
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#888',
  },
  txtlg: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24
  },
  bookTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  bookContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,

    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android Shadow
    elevation: 5,
  },
  bookList: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  }
})
