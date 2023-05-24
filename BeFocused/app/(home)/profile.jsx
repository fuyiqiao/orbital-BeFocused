import { View, Image, StyleSheet, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button } from 'react-native-paper';
import { blankProfile } from '../.././assets/blankProfile.png'; 

const ProfilePhoto = () => {
    <View style={styles.container}>
        <Image 
            style={StyleSheet.ProfilePhotoContainer}
            source={{uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}} 
        />
    </View>
}

export default function ProfileScreen() {
    return (
        <View>
            <ProfilePhoto />
            <Button onPress={() => supabase.auth.signOut()}>Logout</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    ProfilePhotoContainer: {
        width: 50, 
        height: 50, 
    }, 
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center'
    },
})