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
      post: require('../../assets/samplePost.png'),
      description: 'so tired...',
      time: '8min ago',
    },
    {
      id: '2',
      username: 'Koalamala',
      post: require('../../assets/samplePost2.png'),
      description: 'so productive tdy!',
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
      post: require('../../assets/samplePost4.png'),
      description: '',
      time: '8h ago',
    },
  
  ];

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
            <Animated.Text style={[styles.expandedTitle, {opacity: animateExpandedTitle}]}>{currDate}</Animated.Text>
            <Animated.Text style={[styles.collapsedTitle, {opacity:animateCollapsedTitle}]}>{currDate}</Animated.Text>

        </Animated.View>
        <FlatList
          data={dummyData}
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <View style={styles.topTextContainer}>
              <Text style={styles.usernameText}>{item.username}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.sessionImageContainer}>
              <Image source={item.post} style={styles.sessionImage}/>
            </View>
            <View style={styles.entryContainer}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.durationText}>{item.duration}</Text>
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
    marginLeft: 90, 
    marginRight: 25
  },
  sessionImageContainer: {
    alignSelf: 'center',
    padding: 15
  },
  sessionImage: {
    width: 360,
    height: 300,
    borderRadius: 10
  },
  itemContainer: {
    flexDirection:'column',
    alignContent:'flex-start'
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    padding: 20
  },
  usernameText: {
    fontSize: 17,
    fontWeight:'bold',
  },
  timeText: {
    color: '#919090',
    fontSize: 15,
  },
});