import {SafeAreaView} from 'react-native-safe-area-context';
import CreatePostForm from '../components/CreatePostForm';
import PropTypes from 'prop-types';
import { Platform, ScrollView, StyleSheet, View } from "react-native";

const CreatePost = (props) => {
  const {navigation} = props;
  return (
    <ScrollView style={styles.droidSafeArea}>
      <CreatePostForm navigation={navigation}></CreatePostForm>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

CreatePost.propTypes = {
  navigation: PropTypes.object,
};
export default CreatePost;
