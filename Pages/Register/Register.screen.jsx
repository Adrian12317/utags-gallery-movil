import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  InputContainer,
  ImageLogo,
  StyledInput,
  StyledButtonContainer,
  StyledButtonText,
  StyledButtonTextOutline,
  StyledButton,
  StyledButtonOutline
} from './styledRegisterComponent';
import { auth, database } from "../../firebase";
import logo from "../../media/images/login.png";
import i18n from "../../localization/i18n";

const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
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
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {

        const user = userCredentials.user;


        const ref = database.ref('Profile/');
        const data = {
            id:user.uid,
            username:userName,
            email:user.email,
            avatar:""
        }

       ref.push(data).then(()=>{
        console.log(".................");
        console.log("usuario registrado: ");
        console.log(user.email);
        console.log(user.uid);
        console.log();
        console.log(".................");
       });


      })
      .catch((error) => {

        alert(error.message);
      });
  };

  const handleReturnLogin = () => {
    navigation.replace("Login");
  };


  return (

    <StyledContainer>
      <InputContainer>
        <ImageLogo source={logo}/>

        <StyledInput
          placeholder={i18n.t("SIGNUP").SIGNUP_NAME}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <StyledInput
          placeholder={i18n.t("SIGNUP").SIGNUP_EMAIL}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <StyledInput
          placeholder={i18n.t("SIGNUP").SIGNUP_PASSWORD}
          value={pwd}
          onChangeText={(text) => setPwd(text)}
          secureTextEntry
        />
      </InputContainer>

      <StyledButtonContainer>
        <StyledButton onPress={handleSignup}>
          <StyledButtonText>{i18n.t("SIGNUP").SIGNUP_SIGN_UP}</StyledButtonText>
        </StyledButton>
        <StyledButtonOutline onPress={()=>handleReturnLogin()}>
          <StyledButtonTextOutline>{i18n.t("SIGNUP").SIGNUP_BACK_LOGIN}</StyledButtonTextOutline>
        </StyledButtonOutline>
      </StyledButtonContainer>
    </StyledContainer>
  );
};
export default RegisterPage;
