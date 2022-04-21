import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Animated
} from "react-native";
import React from "react";
import { Coffee, dataText } from "../types/data";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../components/Typography";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const Details = (props: any) => {
  const {
    navigation,
    route: {
      params: { details }
    }
  } = props;

  const [changeTextAlignment, setTextAlignment] =
    React.useState<string>("center");
  const value = React.useRef(new Animated.Value(0)).current;
  const ingredientValue = React.useRef(new Animated.Value(0)).current;
  const orderValue = React.useRef(new Animated.Value(0)).current;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleAboutTranslate = (val: number) => {
    Animated.timing(value, {
      toValue: val,
      duration: 500,
      useNativeDriver: false
    }).start(({ finished }) => {
      setTextAlignment("flex-start");
    });
  };

  const handleingredientTranslate = (val: number) => {
    Animated.timing(ingredientValue, {
      toValue: val,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const handleOrderTranslate = (val: number) => {
    Animated.timing(orderValue, {
      toValue: val,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  //This happens when we click about
  const aboutHeight = value.interpolate({
    inputRange: [0, 50],
    outputRange: [height / 2.4, 20]
  });

  const aboutIngredientHeight = value.interpolate({
    inputRange: [0, 50],
    outputRange: [height / 2.2, height / 1.7]
  });

  const aboutOrderHeight = value.interpolate({
    inputRange: [0, 50],
    outputRange: [height / 2, height / 1.6]
  });

  const changeImageScale = value.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.3]
  });

  const changeImagePositionTop = value.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -90]
  });
  const changeImagePositionLeft = value.interpolate({
    inputRange: [0, 50],
    outputRange: [60, -70]
  });

  const changeTextPositionTop = value.interpolate({
    inputRange: [0, 50],
    outputRange: [height / 2.8, 20]
  });

  const changeTextPositionLeft = value.interpolate({
    inputRange: [0, 50],
    outputRange: [width / 2.5, width / 4]
  });

  //this happens when you click ingredient
  const ingredientHeight = ingredientValue.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -(height / 1.85)]
  });

  //this happens when you click order
  const orderHeight = orderValue.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -(height / 6)]
  });

  const goBackHome = () => {
    navigation.goBack();
  };

  const aboutPressComponent = () => {
    handleingredientTranslate(0);
    handleOrderTranslate(0);
    handleAboutTranslate(50);
  };

  const ingredientPressComponent = () => {
    handleingredientTranslate(50);
    handleOrderTranslate(0);
  };

  const orderPressComponent = () => {
    handleOrderTranslate(50);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable onPress={goBackHome}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </Pressable>
        <View style={styles.leftNav}>
          <Ionicons name="search-outline" size={20} color="#333" />
          <Ionicons name="cart-outline" size={20} color="#333" />
        </View>
      </View>
      <Animated.FlatList
        data={Coffee}
        initialScrollIndex={details.index - 1}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={0}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.1, 0, -width * 0.1]
          });
          return (
            <View style={styles.flatContainer}>
              <Animated.Image
                source={item.image}
                style={{
                  height: 250,
                  width: 250,
                  position: "absolute",
                  top: changeImagePositionTop,
                  left: changeImagePositionLeft,
                  transform: [
                    {
                      scale: changeImageScale
                    }
                  ]
                }}
                resizeMode="contain"
              />
              <Animated.View
                style={{
                  position: "absolute",
                  top: changeTextPositionTop,
                  left: changeTextPositionLeft
                }}
              >
                <Typography
                  text={item.name}
                  color={item.color}
                  size={17}
                  bold
                />
                <Typography
                  text={`$${item.price}`}
                  color="#000"
                  size={14}
                  style={{
                    alignSelf: changeTextAlignment
                  }}
                />
              </Animated.View>
              <Animated.View
                style={{
                  flex: 1,
                  width,
                  transform: [
                    {
                      translateX
                    }
                  ]
                }}
              >
                <Animated.View
                  style={{
                    backgroundColor: "#f67c3d",
                    height: height / 1.2,
                    transform: [
                      {
                        translateY: aboutHeight
                      }
                    ],
                    ...styles.bottomDetails
                  }}
                >
                  <Pressable style={{ flex: 1 }} onPress={aboutPressComponent}>
                    <Typography text="About" color="#fff" bold size={20} />
                    <Typography
                      text={dataText}
                      color="#fff"
                      size={15}
                      style={{ marginTop: 30 }}
                    />
                  </Pressable>
                </Animated.View>
                <Animated.View
                  style={{
                    ...styles.bottomDetails,
                    backgroundColor: "#777",
                    height: height / 1.3,
                    transform: [
                      {
                        translateY: aboutIngredientHeight
                      },
                      {
                        translateY: ingredientHeight
                      }
                    ]
                  }}
                >
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={
                      changeTextAlignment === "flex-start"
                        ? ingredientPressComponent
                        : null
                    }
                  >
                    <Typography
                      text="Ingredients"
                      color="#fff"
                      bold
                      size={20}
                    />
                    <Typography
                      text={dataText}
                      color="#fff"
                      size={15}
                      style={{ marginTop: 30 }}
                    />
                  </Pressable>
                </Animated.View>
                <Animated.View
                  style={{
                    ...styles.bottomDetails,
                    backgroundColor: "#fff",
                    height: height / 1.4,
                    transform: [
                      {
                        translateY: aboutOrderHeight
                      },
                      {
                        translateY: orderHeight
                      }
                    ]
                  }}
                >
                  <Pressable
                    onPress={
                      changeTextAlignment === "flex-start"
                        ? orderPressComponent
                        : null
                    }
                  >
                    <Typography text="Order" bold size={20} />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 40
                      }}
                    >
                      <LinearGradient
                        colors={["#fe654b", "#f08431"]}
                        style={{
                          padding: 10,
                          width: "50%",
                          borderRadius: 10
                        }}
                      >
                        <Typography
                          text="Add to Cart"
                          color="#fff"
                          alignment="center"
                        />
                      </LinearGradient>

                      <Typography text={`$${item.price}`} bold size={20} />
                    </View>
                  </Pressable>
                </Animated.View>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingHorizontal: 30,
    width: " 100%",
    elevation: 1,
    backgroundColor: "transparent"
  },
  leftNav: { flexDirection: "row", justifyContent: "space-between", width: 60 },
  flatContainer: {
    flex: 1,
    width,
    elevation: -1,
    alignItems: "center"
  },
  bottomDetails: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 25,
    width
  }
});
