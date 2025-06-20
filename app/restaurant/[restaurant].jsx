import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePickerComponent from "../../components/restaurant/DatePickerComponent";
import FindSlots from "../../components/restaurant/FindSlots";
import GuestPickerComponent from "../../components/restaurant/GuestPickerComponent";
import { db } from "../../config/firebseConfig";
import Colors from "../../constants/Colors";

const ResturantDetails = () => {
  const { restaurant } = useLocalSearchParams();
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState([]);
  
  const [date, setDate] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(null);

  //------- carousel ---------

  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex < carouselLength - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }

    if (currentIndex == carouselLength - 1) {
      const nextIndex = 0;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }

    if (currentIndex == 0) {
      const prevIndex = carouselLength - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const carouselItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{
        width: windowWidth - 2,
        opacity: 0.5,
        backgroundColor: "black",
        borderRadius: 25,
        marginHorizontal: 5,
      }}
      className="h-64"
    />
  );

  // -------- data ----------

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No matching restaurant found");
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const restaurantData = doc.data();
        setRestaurantData(restaurantData);

        const carouselQuery = query(
          collection(db, "restaurantImages"),
          where("res_id", "==", doc.ref)
        );
        const carouselSnapshot = await getDocs(carouselQuery);
        const carouselImages = [];
        if (carouselSnapshot.empty) {
          console.log("No matching carousel found");
          return;
        }
        carouselSnapshot.forEach((carouselDoc) => {
          carouselImages.push(carouselDoc.data());
        });
        setCarouselData(carouselImages);

        const slotsQuery = query(
          collection(db, "restaurantSlots"),
          where("res_id", "==", doc.ref)
        );
        const slotsSnapshot = await getDocs(slotsQuery);
        const slots = [];
        if (carouselSnapshot.empty) {
          console.log("No matching slots found");
          return;
        }
        slotsSnapshot.forEach((slotDoc) => {
          slots.push(slotDoc.data());
        });
        setSlotsData(slots[0]?.slot);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/TtSmNr394bVp9J8n8";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URL", url);
    }
  };
  useEffect(() => {
    getRestaurantData();
  }, []);

  return (
    <SafeAreaView
      style={[
        { backgroundColor: Colors.SECONDARY },
        Platform.OS === "android"
          ? { paddingBottom: 45 }
          : { paddingBottom: 30 },
      ]}
    >
      <ScrollView className="h-full mx-2">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-primary mr-2 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b border-primary" />
        </View>
        <View className="h-64 mx-2 rounded-[25px] relative overflow-hidden">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />

          {/* Right Arrow */}
          <View
            style={{
              position: "absolute",
              top: "50%",
              right: 16,
              transform: [{ translateY: -12 }],
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 50,
              padding: 6,
              zIndex: 10,
            }}
          >
            <Ionicons
              onPress={handleNextImage}
              name="arrow-forward"
              size={24}
              color="white"
            />
          </View>

          {/* Left Arrow */}
          <View
            style={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: [{ translateY: -12 }],
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: 50,
              padding: 6,
              zIndex: 10,
            }}
          >
            <Ionicons
              onPress={handlePrevImage}
              name="arrow-back"
              size={24}
              color="white"
            />
          </View>

          {/* Dots Indicator */}
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            {carouselData[0]?.images?.map((_, i) => (
              <View
                key={i}
                className={`bg-white h-2 w-2 mx-1 rounded-full ${
                  i == currentIndex ? "h-2 w-6" : ""
                }`}
              />
            ))}
          </View>
        </View>
        <View className="flex-1 flex-row mt-2 py-2 gap-2 items-center">
          <Ionicons name="location-sharp" size={24} color={Colors.PRIMARY} />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} | {"  "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center mt-1 text-primary italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row mt-2 py-2 gap-2 items-center">
          <Ionicons name="time" size={24} color={Colors.PRIMARY} />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 mt-2 p-2 rounded-lg border border-primary">
          <View className="flex-1 flex-row mt-2 p-2 items-center">
            <View className="flex-1 flex-row items-center">
              <Ionicons name="calendar" size={24} color={Colors.PRIMARY} />
              <Text className="text-white mx-2 ">Select booking date</Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="items-center flex-1 flex-row mt-2 p-2">
            <View className="flex-1 flex-row items-center">
              <Ionicons name="people" size={24} color={Colors.PRIMARY} />
              <Text className="text-white mx-2 ">Select number of guests</Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View>
          <FindSlots
            restaurant={restaurant}
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            setSelectedSlot={setSelectedSlot}
            selectedSlot={selectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResturantDetails;
