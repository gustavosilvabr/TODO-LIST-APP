import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  valor: string;
  onChange: (texto: string) => void;
};

export default function Input({ valor, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite sua tarefa"
        style={styles.input}
        value={valor}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex:1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
