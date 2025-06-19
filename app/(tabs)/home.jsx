import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../config/firebseConfig';
import Colors from '../../constants/Colors';
import { Images } from "../../constants/Images";

export default function Home() {

  const router = useRouter()
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const res = await getDocs(q);

    res.forEach((item) => {
      setRestaurants((prev) => [...prev, item.data()]);
    });
  }; 

  useEffect(() => {
    getRestaurants();
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurant/${item.name}`)}
      className="bg-gray-700 max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
    >
      <Image
        resizeMode=""
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white mb-2">{item.address}</Text>
      <Text className="text-white mb-2">
        Opem : {item.opening} - Close: {item.closing}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[{ backgroundColor: Colors.SECONDARY }, Platform.OS === "android" ? { paddingBottom: 45 } : { paddingBottom: 30 }]} >
      <View className="items-center" >
        <View className="flex-row p-2 w-11/12 rounded-lg shdow-lg justify-center items-center" >
            <Text className="font-semibold text-xl text-white" >Welcome to {"  "}</Text>
            <Image resizeMode='cover' source={Images.logo} className="w-24 h-16" />
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode='"cover' 
          className="h-52 w-full bg-secondary justify-center items-center"
          source={Images.homeBanner}
        >
          <BlurView className="w-full p-4 shadow-lg" tint='dark' intensity={Platform.OS === 'android' ? 100 : 25} >
            <Text className="text-center text-3xl font-bold text-white" >Dine with your loved ones</Text>
          </BlurView>
        </ImageBackground>
        <View className="p-4 flex-row items-center">
          <Text className="text-3xl text-white ml-5 font-semibold" >
            Special Discount %
          </Text>
        </View>
        {
          restaurants.length > 0 ? (
            <FlatList
              data={restaurants}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ marginLeft: 20, paddingBottom : 16 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
              <ActivityIndicator animating color={Colors.PRIMARY} />
          )
        }
        <View className="p-4 flex-row items-center">
          <Text className="text-3xl text-primary mr-2 font-semibold" >
            Our Restaurants
          </Text>
        </View>
        {
          restaurants.length > 0 ? (
            <FlatList
              data={restaurants}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ paddingBottom : 16 }}
              showsHorizontalScrollIndicator={false}
              scrollEnabled={true}
            />
          ) : (
              <ActivityIndicator animating color={Colors.PRIMARY} />
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}