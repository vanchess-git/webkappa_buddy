import {
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {useComments, userMedia, useUser} from '../hooks/ApiHooks';
import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Button} from '@rneui/themed';

const CommentField = () => {
  const {postComment, getCommentByFileId} = useComments();
  const route = useRoute();
  const {user} = useContext(MainContext);
  const {file_id} = route.params;
  const [userComments, setUserComments] = useState([]);
  const [commentSender, setCommentSender] = useState([]);
  const [commentsAndEmails, setCommentsAndEmails] = useState([]);
  const {getUserById} = useUser();
  const {userProfilePostData} = userMedia();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      file_id: file_id,
      comment: '',
    },
  });

  const commenting = async (data) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const commentResponse = await postComment(token, data);
      console.log('comment response', commentResponse);
      Alert.alert(commentResponse.message, '', [
        {
          text: 'OK',
          onPress: () => {
            console.log('jee kommentointi toimii');
          },
        },
      ]);
    } catch (error) {
      console.error('onSubmit upload failed', error);
      Alert.alert('paskaks meni', '', [
        {
          text: 'OK',
          onPress: () => {
            console.log(error);
            console.log('CommentField.js Commenting()', data);
          },
        },
      ]);
    }
  };

  const fetchComments = async () => {
    let emailArray = [];
    let commentTestArray = [];
    try {
      // fetching comments
      const token = await AsyncStorage.getItem('userToken');
      const commentArray = await getCommentByFileId(file_id);
      const onlyComment = commentArray.map((comments) => comments.comment);
      commentArray.forEach(async(element) => {
        commentTestArray.push(element.comment);
        setUserComments([commentTestArray]);
        console.log('element comment', commentTestArray)
      });
      // console.log('commentArray', commentArray);
      // fetching the sender of a comment
      const userID = commentArray.map((comments) => comments.user_id);
      userID.forEach(async(item) => {
        const userDescription = await getUserById(token, item);
        //console.log('userDescription', userDescription.email);
        emailArray.push(userDescription.email);
      });
      emailArray.push([commentTestArray]);
      setUserComments([emailArray]);

      console.log('userComment state', userComments);
    } catch (error) {
      console.log('fetchComments', error.message);
    }
  };

  // setCommentsAndEmails({comments: userComments}, {sender: commentSender});
  // console.log('user comments and senderrs', commentsAndEmails);

  useEffect(() => {
    fetchComments();

  }, []);
  return (
    <View style={{flex: 4, marginBottom: 100}}>
      <FlatList
        data={{kissa: 'koira'}}
        style={{marginLeft: 16, marginBottom: 16}}
        renderItem={({item}) => (
          <>
            <Text>{item}</Text>

          </>
        )}
      />
      <Controller
        control={control}
        rules={{
          maxLength: 300,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Write a comment"
              style={{marginLeft: 16}}
            />
          </View>
        )}
        name="comment"
      />

      <Button
        style={{width: 100, marginTop: 16, marginLeft: 16}}
        onPress={handleSubmit(commenting)}
        title="Send"
      ></Button>
    </View>
  );
};

CommentField.propTypes = {
  route: PropTypes.object,
};

export default CommentField;