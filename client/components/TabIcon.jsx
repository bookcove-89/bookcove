import { StyleSheet, Text, View } from 'react-native'

const TabIcon = ({ Icon, color, name, focused }) => {
  return (
    <View style={styles.container}>
      <Icon width={24} height={24} stroke={color} fill='none' />
      <Text
      numberOfLines={1}
        style={[ styles.text, { color: color, fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular" }]}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    paddingTop: 15
  },
  text: {
    width: '100%',
    fontSize: 11,
    textAlign: "center", 
  }
})