import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Logo from '../components/Logo';
import Button from '../components/Button';

const WelcomePage = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View >
        <Logo />
        <View style={{ paddingTop: 80, alignItems: 'center' }}>
          <Button
            title='Welcome!'
            onPress={() => router.push("/page-one")}
            otherStyles={{ width: '75%' }}
          />
        </View>
      </View>

      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
}

export default WelcomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});