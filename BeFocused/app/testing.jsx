import React from 'react';
import {SafeAreaView,ScrollView,StyleSheet,View,Animated,Text, Image} from 'react-native';

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
  const Header_Max_Height = 150;
  const Header_Min_Height = 60;
  const Title_Max_Height = 30;
  const Title_Min_Height = 23;

  const animateHeaderBackgroundColor =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Max_Height],
      outputRange: ['#4286F4', '#00BCD4'],
      extrapolate: 'clamp',
    });

  const animateHeaderHeight =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Header_Max_Height],
      outputRange: [Header_Max_Height, Header_Min_Height],
      extrapolate: 'clamp',
    });

  const animateTitleSize =
    AnimatedHeaderValue.interpolate({
      inputRange: [0, Title_Max_Height - Title_Min_Height],
      outputRange: [Title_Max_Height, Title_Min_Height],
      extrapolate: 'clamp',
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackgroundColor,
            },
          ]}>
            <View style={styles.photoContainer}>
              <Image style={styles.image} source={require('../assets/sampleProfilePicture.png')} />
            </View>
            <Animated.Text 
              style={[
                styles.expandedHeader,
                styles.collapsedHeader,
                {
                  fontSize: animateTitleSize
                },
              ]}>
              Ballsorter
            </Animated.Text>
        </Animated.View>
        <ScrollView
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
    </SafeAreaView>
  );
};

export default TestingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    position:'absolute',
    width: '100%',
    height: '38%',
    justifyContent: 'center',
    alignItems:'center',
    shadowColor:'grey',
    shadowOffset: {height: 2},
    shadowOpacity: 0.3,
    paddingTop:50
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'center',  
  },
  headerText: {
    color: '#fff',
    fontSize: 23,
  },
  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 20,
  },
  image: { 
    width: 150, 
    height: 150, 
    borderRadius: 75,
    borderWidth: 3,
    borderColor:'white',
    alignSelf:'center',
  }, 
});