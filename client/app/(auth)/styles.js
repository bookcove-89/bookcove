import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  headingtxt: {
    textAlign: 'center',
    fontFamily: 'Caveat',
    fontSize: 40,
    fontWeight: 700
  },
  form: {
    padding: 20
  },
  txt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  }
})

export default styles;