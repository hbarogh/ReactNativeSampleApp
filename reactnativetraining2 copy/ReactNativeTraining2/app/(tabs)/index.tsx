import { View, StyleSheet, Platform } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import * as MediaLibrary from "expo-media-library";
import {captureRef} from "react-native-view-shot";
import domtoimage from 'dom-to-image';
const PlaceholderImage = require("../../assets/images/background-image.png");

export default function Index() {
  const imageRef = useRef<View>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  //here is where i will be holding the selected image and actually assigning the selected image
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const[showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const[isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const[pickedEmoji, setPickedEmoji] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(!permissionResponse?.granted){
      requestPermission();
    }
  }, []);

  // FUNCTIONS
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
    } else{
      alert("You did not select an image.");
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };
  //when the user closes the modal it will set the value to false
  const onModalClose = () => {
    setIsModalVisible(false);
  }
  //here we are setting it to true to show the modal
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS == "web"){
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current , {
          quality: 0.95,
          width: 320,
          height: 440
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch(e) {
        console.log(e);
      }
    }
    else {
      if (!imageRef.current){
        alert("unable to save image");
        return;
      }
  
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
  
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved Successfully!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  //VIEW
  return (
    <View style={styles.container}>
      <View ref={imageRef} collapsable={false} style={styles.imageContainer}>
        <ImageViewer imgSource={selectedImage || PlaceholderImage}/>
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji}/>
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset}/>
            <CircleButton onPress={onAddSticker}/>
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ):(
          <View style={styles.footerContainer}>
            <Button 
            onPress={pickImageAsync}
            label="Chose a photo" 
            theme="primary"
            />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});