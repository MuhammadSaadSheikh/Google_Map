import React, { useEffect } from "react";
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';

import styles from './style'

const Home = () => {

    useEffect(() => {
        requestPermissions()
    }, [])

    const requestPermissions = async () => {
        if (Platform.OS === 'ios') {
            const auth = await Geolocation.requestAuthorization('whenInUse');
            if (auth === 'granted') {
                _getCourts();
            }
        }

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                _getCourts();
            }
        }
    }

    const _getCourts = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    return (
        <View style={styles.mainContainer}>
            <Text>abc</Text>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        </View>
    )
}

export default Home