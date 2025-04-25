import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#888',
  },
  txtlg: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#111',
    lineHeight: 27,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  backButtonText: {
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
    marginLeft: 5,
    fontSize: 16,
  },
  bookWrapper: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 15,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  bookContainer: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorText: {
    fontSize: 13,
    paddingTop: 5,
    color: '#444',
    textAlign: 'center'
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 5,
  },
  genreText: {
    fontSize: 12,
    paddingTop: 5,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
  descriptionContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    color: '#111',
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#555',
    lineHeight: 25,
    letterSpacing: 0.5,
    marginVertical: 8,
    textAlign: 'left'
  }
})

export default styles;