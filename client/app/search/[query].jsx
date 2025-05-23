import { 
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator, 
  useWindowDimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import RenderHTML from 'react-native-render-html';

import Book from '../../components/Book';
import Header from '../../components/Header';

import StarIcon from '../../assets/icons/star.svg';
import BackIcon from '../../assets/icons/back.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import AddIcon from '../../assets/icons/bookmark-plus.svg';

import { useGlobalContext } from '../../context/GlobalProvider';
import { addToFavorites as apiAddToFavorites, removeFromFavorites as apiRemoveFromFavorites } from '../../lib/bookapi';


const WebDisplay = React.memo(function WebDisplayComponent({ htmlContent, availableContentWidth, baseTextStyle, tagsStylesConfig }) {
  if (!htmlContent) {
    return null; 
  }
  return (
    <RenderHTML
      contentWidth={availableContentWidth}
      source={{ html: htmlContent }}
      baseStyle={baseTextStyle}
      tagsStyles={tagsStylesConfig}
    />
  );
});

const Search = () => {
  const { user } = useGlobalContext();
  const { width } = useWindowDimensions();
  const { book: bookStringFromParams } = useLocalSearchParams(); // Renamed for clarity
  const [currentBookDetails, setCurrentBookDetails] = useState(null);
  const [isFavoriting, setIsFavoriting] = useState(false); // To show loading state for favorite action

  useEffect(() => {
    if (bookStringFromParams) {
      try {
        const parsed = JSON.parse(bookStringFromParams);
        setCurrentBookDetails({ ...parsed, is_favorite: parsed.is_favorite || false });
      } catch (e) {
        console.error("Error parsing book data from params:", e);
        Alert.alert("Error", "Could not load book details.");
      }
    }
  }, [bookStringFromParams]);

  const handleToggleFavorite = async () => {
    if (!currentBookDetails || !user?.$id) {
      Alert.alert("Error", "Cannot update favorite status. User or book data missing.");
      return;
    }

    setIsFavoriting(true);

    try {
      const newFavoriteState = !currentBookDetails.is_favorite;

      // If your API only adds, and you need to handle removal separately:
      if (newFavoriteState) { // We are trying to make it a favorite
        await apiAddToFavorites(user.$id, currentBookDetails); // Pass the whole book if API needs it
      } else {
        await apiRemoveFromFavorites(user.$id, currentBookDetails.id, !currentBookDetails.is_favorite)
      }

      setCurrentBookDetails(prevDetails => ({
        ...prevDetails,
        is_favorite: newFavoriteState,
      }));

      Alert.alert(
        "Success",
        newFavoriteState ? "Book added to favorites" : "Book removed from favorites"
      );

    } catch (err) {
      console.error("Error updating favorite status:", err); // Log the actual error
      Alert.alert("Error", err.message || "Could not update favorite status.");
    } finally {
      setIsFavoriting(false);
    }
  };

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

  // Calculate contentWidth for RenderHTML based on window width and container padding
  const renderHTMLContentWidth = width - (styles.container.padding * 2);
  const renderHTMLTagsStyles = {
    p: styles.descriptionText,
    strong: { ...styles.descriptionText, fontWeight: 'bold' },
    em: { ...styles.descriptionText, fontStyle: 'italic' },
    br: { marginVertical: 6 },
    a: { color: '#3B82F6', textDecorationLine: 'underline' }, 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        smallTxt={"Book Cove"}
        largeTxt={"Overview"}
      />

      {/* Back Button */}
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

            {/* Rating */}
            {currentBookDetails.average_rating != null && (
              <View style={styles.ratingRow}>
                <StarIcon width={14} height={14} stroke="#E5A000" style={{ marginRight: 4 }} />
                <Text style={styles.ratingText}>
                  Rating: {currentBookDetails.average_rating}
                </Text>
              </View>
            )}

            {/* Genre */}
            {currentBookDetails.genre && currentBookDetails.genre.length > 0 && (
              <View style={styles.genreContainer}>
                {currentBookDetails.genre.map((genre, index) => (
                  <Text style={styles.genreText} key={index}>
                    {genre}
                  </Text>
                ))}
              </View>
            )}
          </View>

          <View style={styles.actionsRowContainer}>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity onPress={() => Alert.alert("Info", "Add to list functionality to be implemented.")}>
                <AddIcon height={25} width={25} stroke='black' />
              </TouchableOpacity>
              <Text style={[styles.txt, styles.actionButtonText]}>Add to List</Text>
            </View>
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity onPress={handleToggleFavorite} disabled={isFavoriting}>
                <HeartIcon
                  height={25}
                  width={25}
                  stroke='black'
                  fill={currentBookDetails.is_favorite ? 'red' : '#E5E5E5'} // Dynamic fill
                />
              </TouchableOpacity>
              <Text style={[styles.txt, styles.actionButtonText]}>
                {isFavoriting ? 'Updating...' : (currentBookDetails.is_favorite ? "Favorited" : "Favorite")}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSectionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
          </View>

          {currentBookDetails.description ? (
            <WebDisplay
              htmlContent={currentBookDetails.description}
              availableContentWidth={renderHTMLContentWidth}
              baseTextStyle={styles.descriptionText}
              tagsStylesConfig={renderHTMLTagsStyles}
            />
          ) : (
            <Text style={styles.descriptionText}>No description available.</Text>
          )}
          {/* Extra padding at the bottom of ScrollView content */}
          <View style={{ paddingBottom: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#555',
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
  descriptionSectionContainer: {
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
    textAlign: 'left',
  },
});
