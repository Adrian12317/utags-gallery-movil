import React, { useEffect, useState } from 'react'
import { Text,StyleSheet,ActivityIndicator, View,ScrollView } from 'react-native';
import { Card , Button } from 'react-native-elements'
import {
  StyledContainerStart,
  StyledInputCreate
} from './styledPostsComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import ImagePreview from 'react-native-image-preview';
import i18n from "../../localization/i18n"

export default function CommentPost({setIsComment,post_id}) {
    const [isLoading,setIsLoading] = useState(false)
    const [post,setPost] = useState({})
    const [myComment,setMyComment] = useState()
    const [comments,setComments] = useState([])
    const [isVisible,setIsVisible] = useState(false);
    const [previewUri,setPreviewUri] = useState();
    const imageDefault = "https://www.smartdatajob.com/images/joomlart/demo/default.jpg";
    
    const getPost = async () =>{
        // console.log(post_id);
      await  axios.get('https://api-utagsgallery-codes.herokuapp.com/posts/'+post_id)
      .then(function ({data:{data}}) {
        // handle success
       
        setPost({...data[0]})
      })
      .catch(function (error) {
        // handle error
        setPost({})
        console.log(error);
      })
    }
    const getComments = async () =>{
        console.log(post_id);
      await  axios.get('https://api-utagsgallery-codes.herokuapp.com/comments/'+post_id)
      .then(function ({data}) {
        // handle success
        
       setComments([...data])
        
      })
      .catch(function (error) {
        // handle error
        setComments([])
        console.log(error);
      })
    }

   useEffect(()=>{
    getPost()
    getComments()
   },[])


   const handleComment = async () =>{
    if (!myComment) {return alert(i18n.t("POST_COMMENT").POST_COMMENT_ALERT_EMPTY)}

    let comment = {
      user_id: 72,
      post_id: post.post_id,
      comment: myComment
    }

    await axios.post('https://api-utagsgallery-codes.herokuapp.com/comments',comment)
        .then(function ({data}) {
          // handle success
          setMyComment((current) => current="");
          getComments()

        })
        .catch(function (error) {
          // handle error
          console.log(error);
            return alert("We have an error");
          
        })
   }

   const handlePreview = (img_uri) =>{
    setPreviewUri(img_uri);
    setIsVisible(true);
  }

    return(
        <StyledContainerStart>
          <ImagePreview visible={isVisible} source={{uri: previewUri}} close={()=>{setIsVisible(false)}} />
             <Card >
             <Icon style={{fontSize:16,color:"black"}} name='arrow-left' onPress={()=>setIsComment(false)} />
            <Card.Title>{post.title}</Card.Title>
            <Card.Divider/>
            <Card.Image onPress={()=>handlePreview(post.image_url)} style={styles.image} source={post.image_url? {uri:`${post.image_url}`}:{uri:imageDefault}}>             
            </Card.Image>
            <Text style={{marginBottom: 10}}>
               {post.content}
            </Text>
            <Card.Divider />
            <Text style={{marginBottom: 10}}>
              {i18n.t("POST_COMMENT").POST_COMMENT_YOUR_COMMENT}
            </Text>
            <StyledInputCreate
            multiline={true}
            numberOfLines={2}
            value={myComment}
            onChangeText={setMyComment}
            ></StyledInputCreate>
            <Button
                icon={<Icon style={styles.buttonLike} name='thumbs-up' />}
                buttonStyle={{width:100}}
                title={i18n.t("POST_COMMENT").POST_COMMENT_COMMENT}
                onPress={()=>{handleComment()}}
            />
            <Card.Divider style={{marginTop:10}}/>
            <ScrollView>
            {comments?.map((comment,i)=>(
              <View key={i}>
                 <Text>- {comment.comment}</Text>
              </View>
            ))}
            </ScrollView>
           
            </Card>
        </StyledContainerStart>
           


    );
}

const styles = StyleSheet.create({
    image:{
      
        width: 300,
        height:200,
        marginBottom:10
      },

    buttonLike:{
      
      color: "#ffff",
      marginRight:10
      
     
    }  
  });