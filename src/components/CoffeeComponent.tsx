import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Pressable
} from "react-native";
import React, { FC } from "react";
import Typography from "./Typography";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const fullWidth = width * 0.6;
const SPACER = (width - fullWidth) / 2;

interface Props {
  item: any;
  index: number;
  scrollX: any;
}

const CoffeeComponent: FC<Props> = ({ item, index, scrollX }) => {
  const navigation = useNavigation<any>();

  if (!item.name) {
    return <View style={{ width: SPACER }} />;
  }

  const inputRange = [
    (index - 2) * fullWidth,
    (index - 1) * fullWidth,
    index * fullWidth
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1.2, 0.8],
    extrapolate: "clamp"
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: "clamp"
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-50, 0, 50],
    extrapolate: "clamp"
  });

  const navigate = () =>
    navigation.navigate("Details", {
      details: {
        index
      }
    });
  return (
    <Pressable
      style={{
        width: fullWidth,
        alignItems: "center",
        marginTop: 20,
        maxHeight: 220
      }}
      onPress={navigate}
    >
      <Animated.Image
        source={item.image}
        style={{
          width: 1500,
          height: 150,
          marginBottom: 20,
          transform: [
            {
              scale
            },
            {
              translateX
            }
          ]
        }}
        resizeMode="contain"
      />
      <Animated.View
        style={{
          alignItems: "center",
          opacity
        }}
      >
        <Typography text={item.name} color={item.color} size={16} bold />
        <Typography text={`$${item.price}`} size={13} />
      </Animated.View>
    </Pressable>
  );
};

export default CoffeeComponent;

const styles = StyleSheet.create({});
