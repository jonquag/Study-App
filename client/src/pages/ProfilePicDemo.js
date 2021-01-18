import React from 'react';
import ProfilePic from '../components/ProfilePicture';

const ProfilePicDemo = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '400px', 
            height: '100vh', 
        }}>
            <ProfilePic name="Ethan Tam"/>
            <div style={{flex: 2}}>
               
            </div>
        </div>
    )
}

export default ProfilePicDemo;
