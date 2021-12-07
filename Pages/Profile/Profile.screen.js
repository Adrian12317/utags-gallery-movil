import React, { useState,useEffect } from 'react'
import { Avatar,Card } from 'react-native-elements';
import CameraScreen from '../Camera/Camera';
import { database,auth,storage } from '../../firebase';
import {StyledContainer, StyledText, StyledView} from './styledProfileComponent';
import i18n from '../../localization/i18n';



export default function Profile() {
    const [takePhoto,setTakePhoto] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [avatar,setAvatar] = useState("")

    useEffect(()=>{
        const data = database.ref('Profile').orderByChild('id').equalTo(auth.currentUser.uid)
        data.on('value',(snapshot)=>{
            const values = snapshot.val()
            
             const myData = []
            for (let id in values){
                myData.push({id,...values[id]})
            }
             setName(myData[0].username);
             setEmail(myData[0].email);     
         })
         storage.ref(auth.currentUser.uid + '/profile.jpg').getDownloadURL ().then((imgUrl) => {
            setAvatar(imgUrl); 
        })
    
    },[])

    

    return(
        <>
        {!takePhoto?(
            
        <StyledContainer>
                        

            <Card >
             
            <Card.Title>{i18n.t("PROFILE").PROFILE_TITLE}</Card.Title>
            <Card.Divider/>
            <StyledView >
            <Avatar
                rounded
                size="xlarge"
                source={{
                    uri:avatar?avatar:"https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg",
                }}
                onPress={()=>setTakePhoto(true)}
            />
            </StyledView>
             <Card.Divider style={{marginTop:10,marginRight:10}}/>
            <StyledView >
            <StyledText >
                {name}
            </StyledText>
            <StyledText >
               {email}
            </StyledText>
            </StyledView>
                  
          
           
            </Card>



        </StyledContainer>
        ):
        (
            <CameraScreen setTakePhoto={setTakePhoto} setAvatar={setAvatar} module="profile"/>
        )

        }
        </>
        
    );
}