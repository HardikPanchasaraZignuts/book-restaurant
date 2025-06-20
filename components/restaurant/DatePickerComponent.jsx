import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/Colors";

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  const handlePress = () => {
    setShow(true);
  };
  return (
    <View>
      <TouchableOpacity onPress={handlePress} className="">
        {Platform.OS === "android" && (
          <>
            <Text className="px-2 py-1 text-primary rounded-lg bg-white" >{date.toLocaleDateString()}</Text>
          </>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor={Colors.PRIMARY}
            textColor={Colors.PRIMARY}
            mode="date"
            display="default"
            value={date}
            onChange={onChange}
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS === "ios" && (
          <DateTimePicker
            accentColor={Colors.PRIMARY}
            textColor={Colors.PRIMARY}
            mode="date"
            display="default"
            value={date}
            onChange={onChange}
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;
