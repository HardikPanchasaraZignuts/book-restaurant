import { Text, TextInput, View } from "react-native";

export default function Input({
  label,
  value,
  onChangeText,
  onBlur,
  keyboardType = "default",
  error,
  className,
  secureTextEntry=false
}) {
  return (
    <View className={className}>
      <Text className="text-primary mb-2">{label}</Text>
      <TextInput
        className="h-10 border border-white text-white rounded-lg px-2"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  );
}
