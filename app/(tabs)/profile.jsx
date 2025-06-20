import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const router = useRouter()
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email)
    }

    fetchUserEmail()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail")
      setUserEmail(null);

      Alert.alert('Logged out', "you have been logged out successfully")
      router.push('/signin')
    } catch (error) {
      Alert.alert("Logged Error", "Error while logging out")
    }
  }

  const handleSignup = () => {
    router.push("/signup")
  }

  return (
    <SafeAreaView className="bg-secondary flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl mb-4 text-primary font-semibold">
          User Profile
        </Text>
        {userEmail ? (
          <>
            <Text className="text-primary text-lg font-medium mb-4">
              Email : {userEmail}
            </Text>
            <TouchableOpacity
              onPress={handleLogout}
              className="p-2 my-2 bg-primary rounded-lg"
            >
              <Text className="text-lg font-semibold text-center">Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={handleSignup}
              className="p-2 my-2 bg-primary rounded-lg"
            >
              <Text className=" text-lg font-semibold text-center">Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}