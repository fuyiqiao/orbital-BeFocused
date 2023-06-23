import { SafeAreaView, StyleSheet, Alert, FlatList, Pressable, View, Button, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import { useRouter, Link } from 'expo-router';
import { Header } from 'react-native-elements';
import { BarChart } from "react-native-gifted-charts";

export default function summary() {
    const weekData = [5, 4, 5, 4, 5, 4, 5]; 
    const todayData = [[8.31, 2], [9.05, 1], [9.35, 1], [9.55, 4]]; 
    //todo: link data to backend

    const label1 = () => {
        return(
            <View>
                <Text>mon</Text>
                <Text>{weekData[0]}</Text>
            </View>
        )
    }
    
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

    const SingleSession = ({time, coins}) => {
        return(
            <View style={styles.singleSessionContainer2}>
                <View style={styles.circle} />
                <View style={styles.singleSessionContainer}>
                    <Text>{time} am</Text>
                    <Text>{coins} Focus Coins</Text>
                </View>
            </View>
        ); 
    }

    return(
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.titleText}>Summary</Text>
                <Chart />
                <Text style={styles.subheaderText}>Today's Sessions</Text>
                <SingleSession time={todayData[0][0]} coins={todayData[0][1]}/>
                <SingleSession time={todayData[1][0]} coins={todayData[1][1]}/>
                <SingleSession time={todayData[2][0]} coins={todayData[2][1]}/>
                <SingleSession time={todayData[3][0]} coins={todayData[3][1]}/>
            </View>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    container: {
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
        gap: 150, 
        padding: 10, 
    }, 
    singleSessionContainer2: {
        display: "flex", 
        flexDirection: "row", 
        gap: 10, 
        padding: 10, 
        alignItems: "baseline", 
    }, 
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        backgroundColor: "#304d6b",
    },
});