import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'react-native'

const Book = ({ title, otherStyles, color = '#4B0014', uri, width = 100, height = 150, radius = 3 }) => {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width,
          height,
          borderRadius: radius,
          resizeMode: 'cover',
        }}
      />
    )
  }
  return (

    <View style={[styles.wrapper, { width, height, borderRadius: radius }]}>
      {/* Spine */}
      <View style={[styles.spine, { backgroundColor: color }]} />

      {/* Cover */}
      <View style={styles.cover}>
        <Text style={[styles.titleText, otherStyles]}>
          {title}
        </Text>
      </View>
    </View>
  )
}

export default Book

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#800020',
    flexDirection: 'row',
  },
  spine: {
    width: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  cover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    marginBottom: 5,
  },
})
