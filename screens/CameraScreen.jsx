import { useState, useEffect, useRef } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addPhoto } from "../reducers/user";

export default function CameraScreen() {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  // const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View></View>;
  }

  // let cameraRef = useRef(null);
  // Typescript : let cameraRef: any = useRef(null)
  // const onCameraReady = () => {
  //   setIsCameraReady(true);
  // };

  const takePicture = async () => {
    // if (cameraRef) {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    console.log(photo.uri);
    //dispatch(addPhoto(photo.uri));
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    fetch("http://10.75.14.173:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => data.result && dispatch(addPhoto(data.url)));
    // }
  };
  // const toggleCameraType = () => {
  //   setType((type) =>
  //     type === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // };

  return (
    <Camera
      type={type}
      flashMode={flash}
      style={styles.container}
      ref={(ref) => {
        setCameraRef(ref);
      }}
      //onCameraReady={onCameraReady}
    >
      <View style={styles.topBtnContainer}>
        <TouchableOpacity
          style={styles.btnFlash}
          onPress={() =>
            setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
          }
        >
          <FontAwesome
            name={"flash"}
            size={30}
            color={flash === FlashMode.on ? "orange" : "white"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBtnContainer}>
        <TouchableOpacity style={styles.btnSnap} onPress={() => takePicture()}>
          <FontAwesome name={"circle-thin"} size={40} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnFlip}
          onPress={() =>
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            )
          }
        >
          <FontAwesome name={"rotate-right"} size={40} color={"white"} />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBtnContainer: { flexWrap: "wrap", margin: 20, paddingTop: 20 },
  bottomBtnContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    flexWrap: "wrap-reverse",
    marginBottom: 20,
  },
  btnFlash: {},
  btnFlip: {},
  btnSnap: {},
});
