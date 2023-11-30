import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto } from "../reducers/user";

export default function GalleryScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleDeletePhoto = (photo) => {
    dispatch(removePhoto(photo));
  };

  const renderPhoto = user.pics.map((photo, i) => {
    return (
      <View style={styles.imgContainer} key={i}>
        <Image style={styles.photos} source={{ uri: photo }} />
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDeletePhoto()}
        >
          <FontAwesome name="times" size={20} colour="black" />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}> Your Gallery</Text>
        <Text>Logged as: {user.email}</Text>
        <ScrollView contentContainerStyle={styles.photoGallery}>
          {renderPhoto}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    padding: 10,
  },
  photoGallery: {
    width: "100%",
    height: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  imgContainer: {
    height: 150,
    width: 150,
    margin: 10,
  },
  photos: {
    height: 150,
    width: 150,
  },
  deleteBtn: {
    zIndex: 50,
    position: "absolute",
    right: 5,
    top: 10,
    borderRadius: 100,
    height: 30,
    width: 30,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});
