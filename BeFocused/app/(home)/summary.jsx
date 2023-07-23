import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter, Link } from 'expo-router';
import { Header } from 'react-native-elements';
import { BarChart } from "react-native-gifted-charts";
import { useAuth } from "../../contexts/auth";

export default function SummaryPage() {
    const weekData = [5, 4, 5, 4, 5, 4, 5]; 
    const { user } = useAuth();
    
    //future extension: linking weekly data
    const chartData=[ 
        {value: weekData[0], label: 'mon'},
        {value: weekData[1], label: 'tue'},
        {value: weekData[2], label: 'wed'},
        {value: weekData[3], label: 'thu'},
        {value: weekData[4], label: 'fri'},
        {value: weekData[5], label: 'sat'},
        {value: weekData[6], label: 'sun'}, 
    ]; 
    
    const Chart = () => {
        return(
            <View style={styles.chartContainer}>
                <BarChart
                    barWidth={22}
                    barBorderRadius={4}
                    frontColor='#304d6b'
                    backgroundColor='#F0F0F0'
                    data={chartData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    roundedTop={true}
                    roundedBottom={true}
                    hideYAxisText={true}
                    hideRules={true}
                    initialSpacing={5}
                    width={290}
                />
            </View>
        ); 
    }

    const [todaysSessions, setSessions] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchSessions() {
        setRefreshing(true);
        let { data, error } = await supabase.from('sessions').select('start_time, end_time, coins_earned').eq('user_id', user.id);
        setRefreshing(false);
        if (error) {
          console.log(error);
          return;
        }
        setSessions(data);
        console.log(todaysSessions); 
    }

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        if (refreshing) {
        fetchSessions();
        setRefreshing(false);
        }
    }, [refreshing]);

    const OneSession = ({data}) => {
        let {start_time: rawStartTime, end_time: rawEndTime, coins_earned: coins} = data; 
        const c = { time: rawStartTime };
        const startTime = (new Date(c.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})); 
        const d = { time: rawEndTime }; 
        const endTime = (new Date(d.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})); 
        return(
            <View style={styles.singleSessionContainer2}>
                <View style={styles.circle} />
                <View style={styles.singleSessionContainer}>
                    <Text>{startTime} - {endTime} </Text>
                    <Text>{coins} Focus Coin</Text>
                </View>
            </View>
        ); 
    }; 

    const TodaysLogs = () => {
        const display = []; 
        for (let i = 0; i < todaysSessions.length; i++) {
            display.push(<OneSession data={todaysSessions[i]} />)
        }
        return(
            <View>
              {display}
            </View>
        ); 
    }

    return(
      <View style={styles.container}>
        <Text style={styles.titleText}>Summary</Text>
        {/* <Chart /> */}
        <Text style={styles.subtitle}>All Sessions</Text>
        <View style={styles.scrollContainer}>
          <ScrollView >
            <TodaysLogs/>
        </ScrollView>
        </View>
        
      </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    fontSize: 15, 
  },
  chartContainer: {
    display: "flex", 
    flexAlign: "center", 
    borderWidth: 2, 
    borderColor: '#E8E8E8', 
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center', 
    width: 320, 
    heigh: 210, 
  }, 
  titleText: {
    position:'absolute',
    top: '10%',
    fontSize: 40, 
    textAlign: 'center'
  },
  subheaderText: {
    fontSize: 25, 
    textAlign: 'left', 
    padding: 10
  }, 
  singleSessionContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: 50, 
    padding: 10, 
  }, 
  singleSessionContainer2: {
    display: "flex", 
    flexDirection: "row", 
    gap: 5, 
    padding: 10, 
    alignItems: "baseline", 
  }, 
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "#304d6b",
  },
  subtitle: {
    position:'absolute',
    top: '14%',
    textAlign: 'center',
    padding: 30,
    fontSize: 25,
    color: 'grey', 
  },
  scrollContainer: {
   paddingTop: '50%'
  }
});