import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

export default function History() {
  const [userEmail, setUserEmail] = useState(null);
  const [bookings, setBookings] = useState([]);
  console.log("🚀 ~ History ~ bookings:", bookings)
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
    };

    fetchUserEmail();
  }, []);

  const fetchBookings = async () => {
    if (userEmail) {
      setLoading(true);
      try {
        const bookingCollection = collection(db, 'bookings')
        const bookingQuery = query(
          bookingCollection,
          where("email", "==", userEmail)
        );
        const bookingSnapshot = await getDocs(bookingQuery);
        const bookingList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
      } catch (error) {
        Alert.alert("Error", "Could not fetch bookings");
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [userEmail])

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <>
          {userEmail ? (bookings.length === 0 ? (
                  <View className="items-center mt-10">
                    <Text className="text-white text-base">No bookings found.</Text>
                  </View>
                ) : (<FlatList
                  data={bookings}
                  onRefresh={fetchBookings}
                  refreshing={loading}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View className="p-4 m-4 gap-y-1 rounded-xl border border-primary">
                      <Text className="text-primary">
                        Date:{item.date}
                      </Text>
                      <Text className="text-primary">Slot:{item.slot}</Text>
                      <Text className="text-primary">Guests:{item.guests}</Text>
                      <Text className="text-primary">
                        Restaurant:{item?.restaurant}
                      </Text>
                      <Text className="text-primary">Email:{item.email}</Text>
                    </View>
                  )}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
                )
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg mb-4">
                Please sign in to view your booking history
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/signin")}
                className="p-2 my-2 bg-primary rounded-lg"
              >
                <Text className="text-lg text-white font-semibold text-center">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}