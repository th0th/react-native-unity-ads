# react-native-unity-ads

`react-native-unity-ads` enables you to show Unity ADS in your React Native based app using Unity Ads SDK 2.0 ([Android](https://github.com/Unity-Technologies/unity-ads-android), [iOS](https://github.com/Unity-Technologies/unity-ads-ios)).

**Note:** The library is Android-only for now. PRs for iOS are welcome.

## Installation

### Quick

For quick installation, you can install the npm package and then let react-native do the hard work.

```sh
$ npm install --save react-native-unity-ads
$ react-native link
```

### Manual

#### Android

##### android/settings.gradle

```
include ':app', ':react-native-unity-ads'
project(':react-native-unity-ads').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-unity-ads/android')
```

##### android/app/build.gradle

```
dependencies {
  compile project(':react-native-unity-ads')
  ...
}
```

##### android/app/src/main/java/YOUR/PACKAGE/PATH/MainApplication.java

```java
// Add after other com.facebook imports
import me.th0th.rnunityads.RNUnityAdsPackage;

...
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    // The part that comes from your other native modules goes here.
    new RNUnityAdsPackage()
  );
}
...
```

## Usage

Hopefully, a nice API documentation will be available soon, but until then, you can see the [example application RNUnityAdsExample](https://github.com/th0th/react-native-unity-ads/blob/master/RNUnityAdsExample).

## License

This library is made available under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
