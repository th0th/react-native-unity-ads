import {
    NativeModules,
    DeviceEventEmitter,
} from 'react-native';

const RNUnityAds = NativeModules.RNUnityAds;

const eventHandlers = {
    onReady: new Map(),
    onStart: new Map(),
    onFinish: new Map(),
    onError: new Map(),
};

const addEventListener = (type, handler) => {
    switch (type) {
        case 'onReady':
            eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, event => { handler(event.placementId); }));
            break;
        case 'onStart':
            eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, event => { handler(event.placementId); }));
            break;
        case 'onFinish':
            eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, event => { handler(event.placementId, event.result); }));
            break;
        case 'onError':
            eventHandlers[type].set(handler, DeviceEventEmitter.addListener(type, event => { handler(event.error, event.message); }));
            break;
        default:
            console.log(`Event with type ${type} does not exist.`);
    }
}

const removeEventListener = (type, handler) => {
    if (!eventHandlers[type].has(handler)) {
        return;
    }
    eventHandlers[type].get(handler).remove();
    eventHandlers[type].delete(handler);
}

const removeAllListeners = () => {
    DeviceEventEmitter.removeAllListeners('onReady');
    DeviceEventEmitter.removeAllListeners('onError');
    DeviceEventEmitter.removeAllListeners('onStart');
    DeviceEventEmitter.removeAllListeners('onFinish');
};

module.exports = {
    ...RNUnityAds,
    getState: function getState(placementId, callback) {
        if (arguments.length === 1) {
            callback = placementId;
            placementId = 'DEFAULT';
        }

        RNUnityAds.getState(placementId, callback);
    },
    isReady: function isReady(placementId, callback) {
        if (arguments.length === 1) {
            callback = placementId;
            placementId = 'DEFAULT';
        }

        RNUnityAds.isReady(placementId, callback);
    },
    show: function show(placementId) {
        if (arguments.length === 0) {
            placementId = 'DEFAULT';
        }

        RNUnityAds.show(placementId);
    },
    addEventListener,
    removeEventListener,
    removeAllListeners
};
