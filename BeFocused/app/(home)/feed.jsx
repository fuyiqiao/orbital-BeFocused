import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Animated, Text, Image, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';
import { SearchBar } from "react-native-elements";

export default function FeedPage() {
  const [feed, setFeed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const d = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const currDate = days[d.getDay()] + ", " + d.getDate() + ' ' + months[d.getMonth()];

  async function fetchPosts() {
    setRefreshing(true);
    let { data, error  } = await supabase.from('posts').select('*').order('create_time', {ascending: false});
    setRefreshing(false);
    if (error) {
      console.log(error);
      return;
    }
    setFeed(data);
    setFilteredData(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (refreshing) {
      fetchPosts();
      setRefreshing(false);
    }
  }, [refreshing]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredPosts = feed.filter((post) =>
      post.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredPosts);
  };

  const itemSeparator = () => {
    return <View style={styles.separator}/>;
  };

  let AnimatedHeaderValue = new Animated.Value(0);
  
  const Header_Max_Height = 160;
  const Header_Min_Height = 100;
  const Title_Max_Height = 30;
  const Title_Min_Height = 23;

  const animateHeaderHeight =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Max_Height],
      outputRange: [Header_Max_Height, Header_Min_Height],
      extrapolate: 'clamp',
    });

  const animateSearchBarOpacity = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const animateHeight = 
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [12, 26],
      extrapolate: 'clamp',  
    })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {height: animateHeaderHeight}]}>
        <Animated.Text style={[styles.expandedTitle, {transform: [{translateY: animateHeight}]}]}>{currDate}</Animated.Text>
        <Animated.View style={[styles.searchBarContainer, {opacity: animateSearchBarOpacity}]}>
          <SearchBar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchText}
            round
            searchIcon={{ size: 24 }}
            containerStyle={styles.searchBarContainer}
          />
        </Animated.View>
      </Animated.View>
      <View>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
          data={filteredData}
          renderItem={({item}) => 
          <View style={styles.itemContainer}>
            <View style={styles.topRowContainer}>
              <View style={styles.profileContainer}>
                <Image source={{uri:item.avatar_url}} style={styles.profilePicture}/>
                <Text style={styles.usernameText}>{item.username}</Text>
              </View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <View style={styles.sessionImageContainer}>
              <Image source={{uri: item.post}} style={styles.sessionImage}/>
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
            <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
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
    backgroundColor:'#304d6b' 
  },
  searchBarContainer: {
    backgroundColor: '#304d6b', 
    borderTopWidth:0, 
    borderBottomWidth:0,
    width:'100%',
    paddingBottom: 8
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