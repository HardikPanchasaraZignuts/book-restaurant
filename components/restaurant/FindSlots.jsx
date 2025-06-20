import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FindSlots = ({
  date,
  selectedNumber,
  slots,
  setSelectedSlot,
  selectedSlot,
  restaurant,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const handlePress = () => {
    setSlotsVisible(!slotsVisible);
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

  const handleBooking = () => {};

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
              <Text className="text-center text-lg font-semibold bg-primary p-2 my-3 rounded-lg">
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
    </View>
  );
};

export default FindSlots;
