import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Image
} from "react-native";
import React, { FC } from "react";
import { Coffee, Donut } from "../types/data";
import CoffeeComponent from "../components/CoffeeComponent";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../components/Typography";

const { width} = Dimensions.get("window");
const fullWidth = width * 0.6;

const Home: FC = () => {
  const coffeeData = [{ id: 200 }, ...Coffee, { id: 201 }];
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const eachList = new Animated.Value(0);

  const animateEachDonut = () => {
    Animated.timing(eachList, {
      toValue: 10,
      duration: 700,
      useNativeDriver: true
    }).start();
  };

  React.useEffect(() => {
    animateEachDonut();
  }, []);

  const translateDonut = (val: number) => {
    return eachList.interpolate({
      inputRange: [0, 10],
      outputRange: [val * 100, 0]
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#fe654b", "#f08431"]} style={styles.view} />
      <View style={styles.navContainer}>
        <Ionicons name="menu" size={20} color="#fff" />
        <View style={styles.leftNav}>
          <Ionicons name="search-outline" size={20} color="#fff" />
          <Ionicons name="cart-outline" size={20} color="#fff" />
        </View>
      </View>
      <View>
        <Animated.FlatList
          data={coffeeData}
          snapToInterval={fullWidth}
          horizontal
          decelerationRate={0}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
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
          renderItem={({ item, index }) => (
            <CoffeeComponent item={item} index={index} scrollX={scrollX} />
          )}
        />
      </View>

      <View
        style={{
          marginVertical: 20,
          marginLeft: 30
        }}
      >
        <Typography text="Donuts" size={20} bold />
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <Animated.FlatList
          data={Donut}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } }
              }
            ],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const scale = scrollY.interpolate({
              inputRange: [-1, 0, index * 70, (index + 1) * 70],
              outputRange: [1, 1, 1, 0.9]
            });
            return (
              <Animated.View
                style={[
                  styles.donutContainer,
                  {
                    transform: [
                      {
                        translateX: translateDonut(index + 1)
                      },
                      {
                        scale
                      }
                    ]
                  }
                ]}
              >
                <View
                  style={[
                    styles.imageContainer,
                    {
                      backgroundColor: item.color
                    }
                  ]}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: 40,
                      height: 40
                    }}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Typography text={item.name} bold />
                  <Typography text={`$${item.price}`} size={13} />
                </View>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;

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
    paddingHorizontal: 30
  },
  leftNav: { flexDirection: "row", justifyContent: "space-between", width: 60 },
  view: {
    width,
    position: "absolute",
    height: 200,
    top: 0,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200
  },
  button: {
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    alignSelf: "center"
  },
  donutContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
    height: 70
  },
  imageContainer: {
    padding: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    width: 60
  }
});
