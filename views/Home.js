import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import {useContext, useEffect} from 'react';
import {MainContext} from '../context/MainContext';

const Home = ({navigation, route}) => {

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <List navigation={navigation} route={route}></List>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Home;
