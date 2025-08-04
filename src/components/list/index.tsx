import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tarefa } from "../../types/tarefas";
import { ICON } from "../../types/icons";
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  tarefas: Tarefa[];
  onPress: (id: string) => void;
  onDelet: (id: string) => void;
};


export default function List({ tarefas, onPress, onDelet }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.left}>
              <TouchableOpacity onPress={() => onPress(item.id)}>
                <Fontisto
                  name={item.status ? ICON.ACTIVE : ICON.PASSIVE}
                  size={22}
                  color={item.status ? "#34C759" : "#B0B0B0"}
                />
              </TouchableOpacity>

              <Text style={item.status ? styles.feita : styles.texto}>
                {item.titulo}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.trashButton}
              onPress={() => onDelet(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 100 }} // 👈 Aumentado para mais espaço!
        keyboardShouldPersistTaps="handled"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252525",
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    borderTopLeftRadius: 60,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderWidth:1,
    width: "100%",
  
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#ff5507",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  texto: {
    fontSize: 17,
    color: "#1c1c1e",
  },
  feita: {
    fontSize: 17,
    color: "#8e8e93",
    textDecorationLine: "line-through",
  },
  trashButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    padding: 8,
  },
  separator: {
    height: 20,
  },
});
