import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  onPress: () => void;
};

export default function Button({ onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Adicionar</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    width:100,
    height:40,
    borderRadius: 8,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:"center",
  
  },
});
