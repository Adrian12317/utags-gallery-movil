import React, { useCallback, useState } from 'react'
import { View,Text,StyleSheet,RefreshControl } from 'react-native';
import { database,auth } from '../../firebase';
import { useEffect } from 'react';
import { Card, SpeedDial , Button } from 'react-native-elements'
import {
  StyledContainer,
  StyledScrollView,
} from './styledPostsComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreatePost from './CreatePost';
import CommentPost from './CommentPost';
import i18n from "../../localization/i18n"

const axios = require('axios');

export default function Posts() {
  

    const [list,setList] = useState([])
    const [open,setOpen] = useState(false);
    const imageDefault = "https://www.smartdatajob.com/images/joomlart/demo/default.jpg";
    const [isCreate,setIsCreate] = useState(false);
    const [isComment,setIsComment] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      getItems()
    }, []);
    
    const [postId,setPostId] = useState() ;

    const getItems = () =>{
      axios.get('https://api-utagsgallery-codes.herokuapp.com/posts')
      .then(function ({data}) {
        // handle success
        setList([...data])
        setRefreshing(false)
      })
      .catch(function (error) {
        // handle error
        setList([])
        console.log(error);
        setRefreshing(false)
      })
    }

    const handleLike = async (_post_id) =>{
      axios.put('https://api-utagsgallery-codes.herokuapp.com/posts/like/'+_post_id)
      .then(function ({data}) {
        // handle success
        getItems();
      })
      .catch(function (error) {
        // handle error
        setList([])
        console.log(error);
      })
    }

    const handleComment = (_post_id) =>{
      setPostId(_post_id);
      setIsComment(true);
    }
    
    useEffect(()=>{
        getItems()
    },[])


    return(
     <StyledContainer>

       {isCreate?
        
          <CreatePost setIsCreate={setIsCreate} getItems={getItems} />
          :
          <></>
         }

         {isComment?
          <CommentPost setIsComment={setIsComment} post_id={postId}/>
         :
         <></>
         }

         {!isCreate & !isComment?
          <>
          <StyledScrollView
           refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          >
          
          {
          list?.map((x,i)=>(
    
            <Card  key={i}>
            <Card.Title>{x.title}</Card.Title>
            <Card.Divider/>
          
            <Card.Image  onPress={()=>{handleComment(x.post_id)}} style={styles.image} source={x.image_url? {uri:`${x.image_url}`}:{uri:imageDefault}}>             
            </Card.Image>
            <Text style={{marginBottom: 10}}>
                {x.content}
              </Text>
            <Button
                icon={<Icon style={styles.buttonLike} name='thumbs-up' />}
                buttonStyle={{width:70}}
                title={x.likes}
                onPress={()=>{handleLike(x.post_id)}}
              />
              <View style={styles.views}>
               <Text> <Icon style={styles.buttonView} name='eye' /> {x.views} </Text>
              </View>
            </Card>
          ))
              
          }
          </StyledScrollView>  
          <SpeedDial
            isOpen={open}
            icon={{ name: 'add', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            color="#316ef3"
            size="small"
          >
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title={i18n.t("POST").POST_NEW}
              onPress={() => {
                setIsCreate(true)
                setOpen(false)
              }}
              color="#316ef3"
              size="small"
            />
          </SpeedDial>
          </>
         :
         <></>
         }

  
  </StyledContainer>
        
  );
}

const styles = StyleSheet.create({
    buttonItemDone: {
      borderColor: "#1bf907",
      borderWidth: 3,
      borderRadius:100,
      marginRight:5
    },
    buttonItemRemove: {
        borderColor: "#f90707",
        borderWidth: 3,
        borderRadius:100
      },
    text: {
      color: "white",
      fontWeight: "700",
      fontSize: 18,
      marginTop:3
    },
    textDecoration: {
      color: "green",
      fontWeight: "700",
      fontSize: 18,
      marginTop:3,
      textDecorationLine:'line-through'
    },
    //nuevos para styled component
    image:{
      
      width: 250,
      height:200,
      marginBottom:10
    }  ,
    buttonLike:{
      
      color: "#ffff",
      marginRight:10
     
    } ,
    buttonView:{
      
      color: "#000",
      marginRight:10
     
    },
    views:{
      alignItems:"flex-end"
    }  
  });