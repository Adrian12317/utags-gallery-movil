import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  InputContainer,
  ImageLogo,
  StyledInput,
  StyledButtonContainer,
  StyledButtonText,
  StyledButton
 } from './styledLogin';

 import i18n from "../../localization/i18n";

import { auth } from "../../firebase";
import logo from "../../media/images/login.png";
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {

      if (user) {

        navigation.replace("Home");
      }
    });

    return unsuscribe;
  }, []);

  const handleSignup = () => {
    navigation.replace("Register");
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {

        const user = userCredentials.user;
      })
      .catch((error) => {

        alert(error.message);
      });
  };

  return (
    <StyledContainer>
    <InputContainer>
      <ImageLogo source={logo}/>

      <StyledInput
          placeholder={i18n.t("LOGIN").LOGIN_EMAIL}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <StyledInput
          placeholder={i18n.t("LOGIN").LOGIN_PASSWORD}
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          secureTextEntry
        />
    </InputContainer>

    <StyledButtonContainer>
      <StyledButton onPress={handleLogin}>
          <StyledButtonText>{i18n.t("LOGIN").LOGIN_LOGIN}</StyledButtonText>
      </StyledButton>
      <StyledButton onPress={handleSignup}>
        <StyledButtonText>{i18n.t("LOGIN").LOGIN_SIGN_UP}</StyledButtonText>
      </StyledButton>
    </StyledButtonContainer>
  </StyledContainer>
  );
};
export default LoginPage;
