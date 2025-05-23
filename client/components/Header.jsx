import { StyleSheet, Text, View } from 'react-native'
import BookLogo from '../assets/images/book.svg'

const Header = ({ smallTxt, largeTxt }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.txt}>{smallTxt}</Text>
        <Text style={[styles.txtlg, { lineHeight: 27 }]}>
          {largeTxt}
        </Text>
      </View>
      <BookLogo height={48} width={48} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
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
})