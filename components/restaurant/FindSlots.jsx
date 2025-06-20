import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../config/firebseConfig";
import Colors from "../../constants/Colors";
import { guestBookSchema } from "../../schemas/guestBookSchema";
import Input from "../Input";

const FindSlots = ({
  date,
  selectedNumber,
  slots,
  setSelectedSlot,
  selectedSlot,
  restaurant,
}) => {
  const router = useRouter()
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
  };

  const handleBooking = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");
    const guestStatus = await AsyncStorage.getItem("isGuest");
    if (userEmail) {
      try {
        await addDoc(collection(db, "bookings"), {
          email: userEmail,
          slot: selectedSlot,
          date: date.toISOString(),
          guests: selectedNumber,
          restaurant: restaurant,
        });
        router.push("/home");
        Alert.alert("", "Booking successfully done!");
      } catch (error) {
        Alert.alert("Booking Error", "Error while Booking, try after sometime");
      }
    } else if (guestStatus === "true") {
      setFormVisible(true);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot == slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guestBookSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        slot: selectedSlot,
        date: date.toISOString(),
        guests: selectedNumber,
        restaurant: restaurant,
      });
      Alert.alert("", "Booking successfully done!");
      router.push('/home')
      setModalVisible(false)
    } catch (error) {
      Alert.alert("Booking Error", "Error while Booking, try after sometime");
    }
  };

  return (
    <View className="flex-1">
      <View className={`flex ${selectedSlot != null ? "flex-row gap-2" : ""}`}>
        <View className={`${selectedSlot != null ? "flex-1" : ""}`}>
          <TouchableOpacity onPress={handlePress}>
            <Text className="text-center text-lg font-semibold bg-primary p-2 my-3 rounded-lg">
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity onPress={handleBooking}>
              <Text className="text-center text-lg font-semibold bg-primary p-2 my-3 rounded-lg text-white">
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && (
        <View className="flex-wrap flex-row mx-2 p-2 rounded-lg">
          {slots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              className={`m-2 p-4 bg-primary rounded-lg items-center justify-center
               ${selectedSlot && selectedSlot !== slot ? "opacity-50" : ""}
                `}
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot == slot || selectedSlot == null ? false : true
              }
            >
              <Text className="text-white font-bold">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View className="flex-1 bg-[#00000090] justify-end ">
          <View className=" bg-secondary p-6">
            <View className="w-full ">
              <Ionicons
                name="close-sharp"
                size={30}
                color={Colors.PRIMARY}
                onPress={handleCloseModal}
                className="mb-4"
              />
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Full Name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.fullName?.message}
                    className="mb-4"
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Phone Number"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.phoneNumber?.message}
                    keyboardType="phone-pad"
                    className="mb-4"
                  />
                )}
              />
              <TouchableOpacity
                onPress={handleSubmit(handleFormSubmit)}
                className="p-2 my-4 bg-primary text-white rounded-lg"
              >
                <Text className="text-lg font-semibold text-center">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindSlots;
