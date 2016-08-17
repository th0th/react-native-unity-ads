package me.th0th.rnunityads;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.unity3d.ads.UnityAds;
import com.unity3d.ads.IUnityAdsListener;

public class RNUnityAdsModule extends ReactContextBaseJavaModule implements IUnityAdsListener {
    @Override
    public String getName() {
        return "RNUnityAds";
    }

    public RNUnityAdsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    // react methods
    @ReactMethod
    public void getSDKVersion(final Callback callback) {
        callback.invoke(UnityAds.getVersion());
    }

    @ReactMethod
    public void isSupported(final Callback callback) {
        callback.invoke(UnityAds.isSupported());
    }

    @ReactMethod
    public void init(String gameId) {
        UnityAds.initialize(getCurrentActivity(), gameId, this);
    }

    @ReactMethod
    public void isInitialized(final Callback callback) {
        callback.invoke(UnityAds.isInitialized());
    }

    @ReactMethod
    public void getState(String placementId, final Callback callback) {
        if (placementId.equals("DEFAULT")) {
            callback.invoke(UnityAds.getPlacementState().toString());
        } else {
            callback.invoke(UnityAds.getPlacementState(placementId).toString());
        }
    }

    @ReactMethod
    public void isReady(String placementId, final Callback callback) {
        if (placementId.equals("DEFAULT")) {
            callback.invoke(UnityAds.isReady());
        } else {
            callback.invoke(UnityAds.isReady(placementId));
        }
    }

    @ReactMethod
    public void show(String placementId) {
        if (placementId.equals("DEFAULT")) {
            if (UnityAds.isReady()) {
                UnityAds.show(getCurrentActivity());
            }
        } else {
            if (UnityAds.isReady(placementId)) {
                UnityAds.show(getCurrentActivity(), placementId);
            }
        }
    }

    // listener methods
    @Override
    public void onUnityAdsReady(final String placementId) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", placementId);

        sendEvent("onReady", params);
    }

    @Override
    public void onUnityAdsStart(String placementId) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", placementId);

        sendEvent("onStart", params);
    }

    @Override
    public void onUnityAdsFinish(String placementId, UnityAds.FinishState result) {
        WritableMap params = Arguments.createMap();

        params.putString("placementId", placementId);
        params.putString("result", result.toString());

        sendEvent("onFinish", params);
    }

    @Override
	public void onUnityAdsError(UnityAds.UnityAdsError error, String message) {
        WritableMap params = Arguments.createMap();

        params.putString("error", error.toString());
        params.putString("message", message);

        sendEvent("onError", params);
	}
}
