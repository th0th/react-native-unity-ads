import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import UnityAds from 'react-native-unity-ads';

class RNUnityAdsExample extends React.Component {
    constructor() {
        super();

        this.state = {
            defaultPlacementState: ''
        };
    }

    componentDidMount() {
        // UnityAds.init('YOUR_GAME_ID');
        UnityAds.init('1113851');

        this._updateDefaultPlacementState();
        
        UnityAds.addEventListener('onReady', placementId => {
            this._updateDefaultPlacementState();

            console.log(`Ad with placementId "${placementId}" is ready.`);
        });

        UnityAds.addEventListener('onStart', placementId => {
            console.log(`Ad with placementId "${placementId}" started.`);
        });

        UnityAds.addEventListener('onFinish', (placementId, result) => {
            console.log(JSON.stringify(placementId));
            console.log(JSON.stringify(result));
            console.log(`Ad with placementId ${placementId} finished with result "${result}".`);
        });

        UnityAds.addEventListener('onError', (error, message) => {
            console.log(error);
            console.log(message);
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <Text onPress={() => this._updateDefaultPlacementState()}>Tap to get default ad's state: { this.state.defaultPlacementState }</Text>

            <Text onPress={() => this._showDefaultPlacementAd()} style={styles.text}>Tap here to start playing default ad.</Text>
            </View>
        );
    }

    _updateDefaultPlacementState() {
        UnityAds.getState(defaultPlacementState => {
            this.setState({
                defaultPlacementState: defaultPlacementState
            });
        });
    }

    _showDefaultPlacementAd() {
        UnityAds.show();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        margin: 40,
    }
});

AppRegistry.registerComponent('RNUnityAdsExample', () => RNUnityAdsExample);
