import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
// import { auth } from "../../config/firebseConfig";
import { Images } from "../../constants/Images";
import { authSchema } from "../../schemas/authSchema";

export default function Signup() {
  const router = useRouter();
  const auth = getAuth();

  const handleGuest = async () => {
    await AsyncStorage.setItem("isGuest", "true");
    router.push("/home");
  };


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const usercredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const user = usercredentials.user;
      console.log("🚀 ~ onSubmit ~ user:", user)

      await AsyncStorage.setItem("userEmail", user.email);
      await AsyncStorage.setItem("isGuest", "false");
      router.push('/home')
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address is already in use. Please use a different email.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Signup Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    <SafeAreaView className="bg-secondary flex-1">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center ">
          <Image source={Images.logo} style={{ height: 220, width: 220 }} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let&apos;s get you started
          </Text>
          <View className="w-5/6">
            <View className="w-full">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    className="mb-4"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    keyboardType="default"
                    secureTextEntry={true}
                    className="mb-4"
                  />
                )}
              />
              <TouchableOpacity
                className="p-2 my-3 bg-primary  rounded-lg"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className=" text-lg text-black font-semibold text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={() => router.push("/signin")}
                className="mt-4 flex-row justify-center items-center"
              >
                <Text className="text-white font-semibold">
                  Already a User?{" "}
                </Text>
                <Text className="font-semibold underline text-primary">
                  Sign in
                </Text>
              </TouchableOpacity>
              <Text className="text-center text-base font-semibold my-3 text-white">
                <View className="border-b-2 border-primary p-2 mb-1 w-24" />
                or
                <View className="border-b-2 border-primary p-2 mb-1 w-24" />
              </Text>
              <TouchableOpacity
                onPress={handleGuest}
                className="my-3 flex-row justify-center items-center"
              >
                <Text className="text-white font-semibold">Be a</Text>
                <Text className="font-semibold underline text-primary">
                  {" "}
                  Guest User
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <Image
            source={Images.entryImg}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
