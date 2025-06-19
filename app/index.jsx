import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Image, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { Images } from '../constants/Images';

export default function Index() {
  const router = useRouter()
  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true")
    router.push("/home")
  }
  return (
    <SafeAreaView className="bg-secondary flex-1">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center ">
          <Image className={`${Platform.OS === "ios" ? 'mt-6' : "mt-10"}`} source={Images.logo} style={{ height: 300, width: 300 }} />
          <View className="w-3/4">
            <TouchableOpacity
              className="p-2 my-2 bg-primary  rounded-lg"
              onPress={() => router.push("/signup")}
            >
              <Text className="text-lg text-black font-semibold text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-2 my-2 bg-secondary border border-primary rounded-lg"
              onPress={handleGuest}
            >
              <Text className="text-lg text-primary font-semibold text-center">
                Guest User
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-base font-semibold my-4 text-white">
              <View className="border-b-2 border-primary p-2 mb-1 w-24" />
              or
              <View className="border-b-2 border-primary p-2 mb-1 w-24" />
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/signin")}
              className="flex-row justify-center items-center"
            >
              <Text className="text-white font-semibold">Already a User? </Text>
              <Text className="font-semibold underline text-primary">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={Images.entryImg}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>
        <StatusBar backgroundColor={Colors.SECONDARY} barStyle="light-content" />
      </ScrollView>
    </SafeAreaView>
  );
}
