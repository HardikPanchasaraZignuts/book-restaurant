import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (email) {
        router.replace("/home");
      }
    };
    checkAuth();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
