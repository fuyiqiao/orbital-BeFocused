import { React, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Animated, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Link, useRouter } from 'expo-router';
import { useAuth } from "../../contexts/auth";

export default function ProfilePage() {
  const dummyData = [
    {
      id: '1',
      date: '19 June 2023',
      duration: 'Total focus duration: 2h 55min',
    },
    {
      id: '2',
      date: '15 June 2023',
      duration: 'Total focus duration: 1h 5min',
    },
    {
      id: '3',
      date: '10 June 2023',
      duration: 'Total focus duration: 3h 00min',
    },
    {
      id: '4',
      date: '9 June 2023',
      duration: 'Total focus duration: 0h 30min',
    },
    {
      id: '5',
      date: '4 June 2023',
      duration: 'Total focus duration: 2h 50min',
    },
    {
      id: '6',
      date: '27 May 2023',
      duration: 'Total focus duration: 4h 10min',
    },
    {
      id: '7',
      date: '23 May 2023',
      duration: 'Total focus duration: 2h 00min',
    },
    {
      id: '8',
      date: '15 May 2023',
      duration: 'Total focus duration: 2h 55min',
    },
    {
      id: '9',
      date: '8 May 2023',
      duration: 'Total focus duration: 3h 55min',
    },
    {
      id: '10',
      date: '4 May 2023',
      duration: 'Total focus duration: 2h 35min',
    },
    {
      id: '11',
      date: '1 May 2023',
      duration: 'Total focus duration: 5h 15min',
    },
    {
      id: '12',
      date: '22 April 2023',
      duration: 'Total focus duration: 3h 45min',
    },
    {
      id: '13',
      date: '20 April 2023',
      duration: 'Total focus duration: 3h 20min',
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
  const [currUser, setUser] = useState(''); 
  const [log, setLog] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchUsername() {
    setRefreshing(true);
    let { data } = await supabase.from('profiles').select('username').eq('id', user.id);
    let { username:temp } = data[0]; 
    setRefreshing(false);
    setUser(temp); 
  }

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchUsername();
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
          <Animated.Text style={[styles.expandedTitle, {opacity: animateExpandedTitle}]}>{currUser}</Animated.Text>
          <Animated.Text style={[styles.collapsedTitle, {opacity: animateCollapsedTitle}]}>{currUser}</Animated.Text>
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
      <FlatList
        data={dummyData}
        renderItem={({item}) => 
        <View style={styles.itemContainer}>
          <View style={styles.sessionImageContainer}>
            <Image source={require('../../assets/studySession.png')} style={styles.sessionImage}/>
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
  }
});