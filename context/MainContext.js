import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  // TODO: create state isLoggedIn, set value to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(true);
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [showRegisterUserDataForm, setShowRegisterUserDataForm] =
    useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileBackground, setProfileBackgorund] = useState('');
  const [profileDescriptionData, setProfileDescriptionData] = useState({});

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        update,
        setUpdate,
        fullName,
        setFullName,
        image,
        setImage,
        avatar,
        setAvatar,
        profileData,
        setProfileData,
        showRegisterUserDataForm,
        setShowRegisterUserDataForm,
        showEditProfile,
        setShowEditProfile,
        profileBackground,
        setProfileBackgorund,
        profileDescriptionData,
        setProfileDescriptionData,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
