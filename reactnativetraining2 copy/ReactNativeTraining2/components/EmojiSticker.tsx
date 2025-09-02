import { ImageSourcePropType, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Image } from "expo-image";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

type Props = {
    imageSize: number;
    stickerSource: string;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImage = useSharedValue(imageSize);
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if(scaleImage.value !== imageSize * 2){
                scaleImage.value = scaleImage.value * 2;
            }
            else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });
    
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value)
        };
    });

    const drag = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: 350, position: "absolute", zIndex: 24 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                    source={stickerSource as ImageSourcePropType}
                    style={[imageStyle, {width: imageSize, height: imageSize}]}
                    resizeMode="contain"
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    )
}