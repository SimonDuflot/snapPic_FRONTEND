import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { addEmailToStore } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  //stock state of email input
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleUsername = () => {
    //check if email is ok with regex : ^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$
    if (email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
      //update store with email
      dispatch(addEmailToStore(email));
      //moves user to page GalleryScreen
      navigation.navigate("TabNavigator", { screen: "Gallery" });
      setEmail("");
      setErrMsg("");
      return;
    } else {
      setErrMsg("Write a valide email address, if you wish to proceed.");
      setEmail("");
    }
  };
  return (
    <>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Image
          style={styles.imgBack}
          source={require("../assets/camera.png")}
        />
        <Image
          style={styles.imgFront}
          source={require("../assets/background.jpg")}
        />

        <View style={styles.title}>
          <Text style={styles.titleText}>Snappy</Text>
        </View>
        <KeyboardAvoidingView behavior={"position"}>
          <View style={styles.subContainer}>
            <TextInput
              style={styles.input}
              placeholder={"Email"}
              onChangeText={(value) => setEmail(value.toLowerCase())}
              value={email}
            ></TextInput>
            {errMsg && <Text style={styles.errMsg}>{errMsg}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUsername()}
            >
              <Text style={styles.buttonText}>Go to gallery</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imgBack: {
    position: "absolute",
    zIndex: -150,
    height: "100%",
    width: "100%",
  },
  imgFront: {
    position: "absolute",
    zIndex: -100,
    height: "100%",
    width: "100%",
    opacity: 0.3,
  },
  title: {
    marginTop: 100,
    marginBottom: 200,
  },
  titleText: { fontSize: 70, color: "white" },
  subContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 300,
    height: 150,
  },
  input: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    marginVertical: 20,
    marginHorizontal: 15,
  },
  button: {
    borderRadius: 10,
    margin: 20,
    padding: 10,
    backgroundColor: "green",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  errMsg: {
    color: "red",
    alignContent: "center",
    justifyContent: "center",
  },
});
