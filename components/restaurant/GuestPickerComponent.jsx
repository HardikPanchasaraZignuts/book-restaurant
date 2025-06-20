import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const GuestPickerComponent = ({ selectedNumber,setSelectedNumber }) => {
    const decrement = () => {
        if(selectedNumber > 1) setSelectedNumber(selectedNumber - 1)
    }
    const increment = () => {
        if(selectedNumber < 12) setSelectedNumber(selectedNumber + 1)
    }
  return (
    <View className="flex-row item-center gap-2 rounded-lg justify-center " >
          <TouchableOpacity onPress={decrement} className="rounded">
              <Text className="text-primary text-lg border border-primary rounded-l-lg p-2">
                  -
              </Text>
          </TouchableOpacity>
          <Text className="p-2 mx-2 text-primary  text-lg items-center justify-center flex" >
              {selectedNumber}
          </Text>
          <TouchableOpacity onPress={increment} className="rounded">
              <Text className="p-2 text-primary text-lg border border-primary rounded-r-lg">
                  +
              </Text>
      </TouchableOpacity>
    </View>
  )
}

export default GuestPickerComponent