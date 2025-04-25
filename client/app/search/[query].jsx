import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, router } from 'expo-router'
import RenderHTML from 'react-native-render-html'

import BookLogo from '../../assets/images/book.svg'
import Book from '../../components/Book'
import StarIcon from '../../assets/icons/star.svg'
import BackIcon from '../../assets/icons/back.svg'
import styles from './styles'

import { useWindowDimensions } from 'react-native';

const Search = () => {
  const { width } = useWindowDimensions();
  const { book } = useLocalSearchParams()
  const parsedBook = JSON.parse(book)


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.txt}>Book Cove</Text>
          <Text style={styles.txtlg}>Overview</Text>
        </View>
        <BookLogo height={48} width={48} />
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <BackIcon width={22} height={22} stroke="#3B82F6" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Book Cover */}
        <View style={styles.bookContainer}>
          <View style={styles.bookWrapper}>
            <Book
              uri={parsedBook.cover_img.at(-1)}
              title={parsedBook.title}
              height={240}
              width={160}
              radius={8}
            />
          </View>
          <Text style={[styles.txtlg, styles.authorText, { fontSize: 15 }]}>{parsedBook.title}</Text>
          <Text style={[styles.txtlg, styles.authorText, { color: '#757575' }]} >{parsedBook.authors.join(', ')}</Text>

          {/* Rating */}
          {parsedBook.average_rating && (
            <View style={styles.ratingRow}>
              <StarIcon width={14} height={14} stroke="#E5A000" style={{ marginRight: 4 }} />
              <Text style={styles.ratingText}>
                Rating: {parsedBook.average_rating}
              </Text>
            </View>
          )}

          {/* Genre */}
          <View style={styles.genreContainer}>
            {parsedBook.genre.map((genre, index) => (
              <Text style={styles.genreText} key={index}>
                Genre: {genre}
              </Text>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          {/* <Text style={styles.descriptionText}>{parsedBook.description}</Text> */}
        </View>

        {parsedBook.description ? (
          <RenderHTML
            contentWidth={width}
            source={{ html: parsedBook.description }}
            baseStyle={styles.descriptionText}
            tagsStyles={{
              p: styles.descriptionText,
              strong: {
                ...styles.descriptionText,
                fontWeight: 'bold',
              },
              em: {
                ...styles.descriptionText,
                fontStyle: 'italic',
              },
              br: { marginVertical: 6 },
            }}
          />
        ) : (
          <Text style={styles.descriptionText}>No description available.</Text>
        )}
        <View style={{ paddingBottom: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search
