import React, {Component} from 'react';
import {SafeAreaView,ScrollView,StyleSheet,View,Animated,Text, Image, TouchableOpacity, FlatList} from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, useRouter } from 'expo-router';
import { ListItem, SearchBar } from "react-native-elements";

export default function ProfilePage() {
  const dummyData = [
    {
      id: '1',
      username: 'Ballsorter',
      profilePicture: require('../../assets/sampleProfilePicture.png'),
      post: require('../../assets/samplePost.png'),
      description: 'so tired...',
      time: '8min ago',
    },
    {
      id: '2',
      username: 'Koalamala',
      profilePicture: require('../../assets/sampleProfilePicture.png'),
      post: require('../../assets/samplePost2.png'),
      description: 'v productive tdy!',
      time: '2h ago',
    },
    {
      id: '3',
      username: 'chiaseedzz',
      post: require('../../assets/samplePost3.png'),
      description: 'finally done with revision',
      time: '5h ago',
    },
    {
      id: '4',
      username: 't.teo.kbokki',
      profilePicture: require('../../assets/sampleProfilePicture.png'),
      post: require('../../assets/samplePost4.png'),
      description: "can't wait for exams to be over",
      time: '8h ago',
    },
  
  ];

  const itemSeparator = () => {
    return <View style={styles.separator}/>;
  };

  let AnimatedHeaderValue = new Animated.Value(0);
  
  // todo: add search bar and animate header
  const Header_Max_Height = 100;
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

  const d = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const currDate = days[d.getDay()] + ", " + d.getDate() + ' ' + months[d.getMonth()];
  
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
            <Animated.Text style={styles.collapsedTitle}>{currDate}</Animated.Text>

        </Animated.View>
        <FlatList
          data={dummyData}
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <View style={styles.topRowContainer}>
              <View style={styles.profileContainer}>
                <Image source={require('../../assets/sampleProfilePicture.png')} style={styles.profilePicture}/>
                <Text style={styles.usernameText}>{item.username}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.sessionImageContainer}>
              <Image source={item.post} style={styles.sessionImage}/>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>{item.description}</Text>
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
        />
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
  entryContainer:{
    alignSelf:'center',
  },
  separator: { 
    height: 1, 
    backgroundColor: '#d4d6d9', 
    width: 360, 
    alignSelf: 'center',
    marginVertical: 15
  },
  sessionImageContainer: {
    alignSelf: 'center',
    padding: 15
  },
  sessionImage: {
    width: 360,
    height: 360,
    borderRadius: 15
  },
  itemContainer: {
    flexDirection:'column',
    alignContent:'flex-start'
  },
  topRowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    alignItems:'center',
    justifyContent:'space-between'
  },
  usernameText: {
    fontSize: 17,
    fontWeight:'bold',
    paddingLeft:10
  },
  timeText: {
    color: '#919090',
    fontSize: 17,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf:'center', 
  }, 
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  descriptionContainer: {
    paddingHorizontal: 15
  },
  descriptionText: {
    fontSize: 17
  },
});