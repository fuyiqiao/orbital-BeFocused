import { React, useEffect, useState } from 'react';
import { RefreshControl, ActivityIndicator, StyleSheet, View, Animated, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, useRouter } from 'expo-router';
import { useAuth } from "../../contexts/auth";

export default function ProfilePage() {
  const itemSeparator = () => {
    return <View style={styles.separator}/>;
  };

  let AnimatedHeaderValue = new Animated.Value(0);
  
  const Header_Max_Height = 220;
  const Header_Min_Height = 100;
  const Title_Max_Height = 30;
  const Title_Min_Height = 23;
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  const router = useRouter();

  const animateHeaderHeight =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Max_Height],
      outputRange: [Header_Max_Height, Header_Min_Height],
      extrapolate: 'clamp',
    });

  const animateImageOpacity = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const animateExpandedTitle = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const animateCollapsedTitle = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  const animateCoins = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const animateSettings = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const animateLogout = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const { user } = useAuth();
  const [username, setUsername] = useState(''); 
  const [coins, setCoins] = useState(0); 
  const [log, setLog] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState('')

  async function fetchUsername() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('username').eq('id', user.id);
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    let { username:temp } = data[0]; 
    setUsername(temp); 
  }

  async function fetchCoins() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('coin_count').eq('id', user.id);
    if (error) {
      console.log(error);
      return;
    }
    setRefreshing(false);
    let { coin_count:temp } = data[0]; 
    setCoins(temp); 
  }

  async function fetchProfilePicture() {
    setRefreshing(true);
    let { data, error } = await supabase.from('profiles').select('avatar_url').eq('id', user.id);
    setRefreshing(false);
    console.log(data);
    if (error) {
      console.log(error);
      return;
    }
    let { avatar_url:temp } = data[0]; 
    setProfilePicture(temp); 
  }

  async function fetchMyPosts() {
    setRefreshing(true);
    let { data, error } = await supabase.from('posts').select('*').eq('creator_id', user.id).order('create_time', {ascending: false});
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    setMyPosts(data);
  }

  useEffect(() => {
    fetchUsername();
    fetchCoins();
    fetchMyPosts();
    fetchProfilePicture();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchUsername();
      fetchCoins();
      fetchMyPosts();
      fetchProfilePicture();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            backgroundColor: '#304d6b',
          },
        ]}>
          <Animated.Text style={[styles.expandedTitle, {opacity: animateExpandedTitle}]}>{username}</Animated.Text>
          <Animated.Text style={[styles.collapsedTitle, {opacity: animateCollapsedTitle}]}>{username}</Animated.Text>
          <Animated.Text style={[styles.coinsText, {opacity:animateCoins}]}>Focus Coins: {coins}</Animated.Text>

          <AnimatedTouchableOpacity 
            style={[styles.settingsButton, {opacity: animateSettings}]} 
            onPress={() => {
              router.push('/settings');
            }}
          >
            <Text style={styles.buttonsText}>Settings</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity style={[styles.logoutButton, {opacity: animateLogout}]} onPress={() => supabase.auth.signOut()}>
            <Text style={styles.buttonsText}>Log Out</Text>
          </AnimatedTouchableOpacity>

          <Animated.Image
            style={[styles.image, {opacity: animateImageOpacity}]}
            source={{url : profilePicture}}
          />

      </Animated.View>
      <View style={styles.scrollContainer}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={myPosts}
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <View style={styles.sessionImageContainer}>
              <Image source={{uri:item.post}} style={styles.sessionImage}/>
            </View>
            <View style={styles.entryContainer}>
              <Text style={styles.dateText}>{item.create_date}</Text>
            </View>
          </View>
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
          contentContainerStyle={{ paddingVertical: 25 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: { y: AnimatedHeaderValue }
              }
            }],
            { useNativeDriver: false }
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchMyPosts && fetchUsername && fetchProfilePicture && fetchCoins} />
          }
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',  
  },
  expandedTitle: {
    position:'absolute',
    top: '25%',
    color: 'white',
    fontSize: 28,
  },
  collapsedTitle: {
    position:'absolute',
    top: '55%',
    color: 'white',
    fontSize: 28,
  },
  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 20,
  },
  image: { 
    position:'absolute',
    top: '56%',
    width: 130, 
    height: 130, 
    borderRadius: 65,
    borderWidth: 3,
    borderColor:'white',
    alignSelf:'center',
  }, 
  coinsText: {
    position:'absolute',
    top: '42%',
    color: '#d4d6d9',
    fontSize: 16,
  },
  settingsText: {
    color: 'white',
    fontSize: 14,
  },
  buttonsText: {
    color: 'white',
    fontSize: 14,
  },
  logoutButton: {
    position:'absolute',
    top: '31%',
    left: '83%',
    color: 'white',
  },
  settingsButton: {
    position:'absolute',
    top: '31%',
    left: '5%',
    color: 'white',
    fontSize: 14,
  },
  entryContainer:{
    alignSelf:'center',
  },
  separator: { 
    height: 1, 
    backgroundColor: '#d4d6d9', 
    marginLeft: 90, 
    marginRight: 25
  },
  sessionImageContainer: {
    alignSelf: 'flex-start',
    padding: 15
  },
  sessionImage: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  itemContainer: {
    flexDirection:'row',
    alignContent:'flex-start'
  },
  dateText: {
    fontSize: 15,
    fontWeight:'bold',
    paddingVertical: 4
  },
  durationText: {
    fontSize: 15,
    paddingVertical: 4
  }, 
  listContainer: {
    backgroundColor:'white',
    borderTopLeftRadius: 20, 
    borderTopRightRadius:20
  }, 
  scrollContainer: {
    paddingBottom: 100
  }
});