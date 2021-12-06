import React, { useEffect, useState } from 'react'
import { Text,StyleSheet,ActivityIndicator } from 'react-native';
import { Card , Button } from 'react-native-elements'
import CameraScreen from '../Camera/Camera';
import { storage } from '../../firebase';
import {
  StyledContainer,
  StyledInputCreate
} from './styledPostsComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import i18n from "../../localization/i18n"

export default function CreatePost({setIsCreate,getItems}) {
    const [isPhoto,setIsPhoto] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [image,setImage] = useState()
    const [nameFile,setNameFile] = useState()
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const imageDefault = "https://www.smartdatajob.com/images/joomlart/demo/default.jpg";
    
    const handleSubmit = async () =>{
        
        let image_url = ""
        if (!title || !content) {
            
            return alert(i18n.t("POST_CREATE").POST_CREATE_ALERT_EMPTY);
        }
        setIsLoading((current) => current = true)
        
        if (image) {

            console.log("voy a guardar image");
            const response = await fetch(image);
            const blob = await response.blob();

            await storage.ref('posts/'+nameFile+'.jpg').put (blob).then (function (res) {
            
            }).catch(error => {
                console.log(error.message);
            }) 

            let image_url_1 = 'https://firebasestorage.googleapis.com/v0/b/login-adrian-44a42.appspot.com/o/posts%2F%20'+nameFile+'.jpg?alt=media'
            image_url = image_url_1.replace(/ /g, "")
        }else{
            image_url = imageDefault;
        }
        const request = {
            channel_id: 51,
            title: title,
            image_url: image_url,
            content: content
        }

       await axios.post('https://api-utagsgallery-codes.herokuapp.com/posts',request)
        .then(function ({data}) {
          // handle success
          setIsLoading((current) => current = false)
          console.log(data);
          setIsCreate(false);
          getItems()

        })
        .catch(function (error) {
          // handle error
          console.log(error);
            return alert("We have an error");
          
        })

       
    }


    return(
    <>
            {!isPhoto?(
            <StyledContainer>
                {isLoading?
                    <ActivityIndicator size="large" color="#00ff00" />
                    :
                    <Text></Text>
                }
                
                <Card>
                <Card.Title>{i18n.t("POST_CREATE").POST_CREATE_NAME}</Card.Title>
                <Card.Divider/>
                <Text>{i18n.t("POST_CREATE").POST_CREATE_TITLE}</Text>
                <StyledInputCreate onChangeText={setTitle} value={title}></StyledInputCreate>
                <Button
                 icon={<Icon style={styles.buttonLike} name='camera' />}
                buttonStyle={{width:300,marginBottom:5}}
                title={i18n.t("POST_CREATE").POST_CREATE_IMAGE}
                onPress={()=>{setIsPhoto(true)}}
                />
                {
                    image?
                    <Card.Image 
                    style={styles.image}
                    source={{uri:`${image}`}}
                    />            
                    :
                    <Text></Text>
                }
                
                
                <Text>{i18n.t("POST_CREATE").POST_CREATE_CONTENT}</Text>
                <StyledInputCreate
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={setContent}
                    value={content}
                >
                </StyledInputCreate>
                <Card.Divider/>
                <Button
                buttonStyle={{width:300,backgroundColor:"#62ba24"}}
                title={i18n.t("POST_CREATE").POST_CREATE_CREATE}
                onPress={()=>{handleSubmit()}}
                />
                 <Button
                buttonStyle={{width:300,marginTop:10,backgroundColor:"#ff0000"}}
                title={i18n.t("POST_CREATE").POST_CREATE_CANCEL}
                onPress={()=>{setIsCreate(false)}}
                />
            </Card>
            </StyledContainer>
            ):
            (
                <CameraScreen
                 setTakePhoto={setIsPhoto}
                 setAvatar={setImage}
                 module="post"
                 setNameFile={setNameFile}
                 />
            )

            }
            </>


    );
}

const styles = StyleSheet.create({


    buttonLike:{
      
      color: "#ffff",
      marginRight:10
     
    }  
  });