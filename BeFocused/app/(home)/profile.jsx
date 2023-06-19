import React from 'react';
import {SafeAreaView,ScrollView,StyleSheet,View,Animated,Text, Image, TouchableOpacity} from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, useRouter } from 'expo-router';


const TestingPage = () => {
  const dummyData = [
    'Text',
    'Input',
    'Button',
    'Card',
    'CheckBox',
    'Divider',
    'Header',
    'List Item',
    'Pricing',
    'Rating',
    'Search Bar',
    'Slider',
    'Tile',
    'Icon',
    'Avatar',
  ];
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
            <Animated.Text style={[styles.expandedTitle, {opacity: animateExpandedTitle}]}>Ballsorter</Animated.Text>
            <Animated.Text style={[styles.collapsedTitle, {opacity:animateCollapsedTitle}]}>Ballsorter</Animated.Text>
            <Animated.Text style={[styles.coinsText, {opacity:animateCoins}]}>Focus Coins: 100</Animated.Text>

            <AnimatedTouchableOpacity 
              style={[styles.settingsButton, {opacity: animateSettings}]} 
              onPress={() => {
                router.push('../settings');
              }}
            >
              <Text style={styles.buttonsText}>Settings</Text>
            </AnimatedTouchableOpacity>

            <AnimatedTouchableOpacity style={[styles.logoutButton, {opacity: animateLogout}]} onPress={() => supabase.auth.signOut()}>
              <Text style={styles.buttonsText}>Log Out</Text>
            </AnimatedTouchableOpacity>

            <Animated.Image
              style={[styles.image, {opacity: animateImageOpacity}]}
              source={require('../../assets/sampleProfilePicture.png')}
            />

        </Animated.View>
        <ScrollView
          style={{paddingTop:50}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: { y: AnimatedHeaderValue }
              }
            }],
            { useNativeDriver: false }
          )}>
          {/* Put all your Component here inside the ScrollView */}
          {dummyData.map((item, index) => (
            <Text style={styles.textStyle} key={index}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
  );
};

export default TestingPage;

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
    top: '22%',
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
    top: '53%',
    width: 140, 
    height: 140, 
    borderRadius: 70,
    borderWidth: 3,
    borderColor:'white',
    alignSelf:'center',
  }, 
  expandedHeader: {
    position: 'absolute',
    top:'25%',
  },
  collapsedHeader: {
    position: 'absolute',
    top:'55%',
  },
  coinsText: {
    position:'absolute',
    top: '39%',
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
    top: '26%',
    left: '83%',
    color: 'white',
    fontSize: 14,
  },
  settingsButton: {
    position:'absolute',
    top: '26%',
    left: '5%',
    color: 'white',
    fontSize: 14,
  }
});