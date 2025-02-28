import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#D9D9D9',
  },
  circleContainer: {
    position: 'absolute',
    bottom: 235, // Place it just above the button
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  heading: {
    fontFamily: 'EBG',
    fontSize: 30,
    padding: 10,
    paddingBottom: 40,
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
    color: '#828282',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    flex: 1,
    left: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 20
  },
  skipText: {
    color: '#828282',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
})

export default styles;