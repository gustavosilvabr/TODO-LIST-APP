import { StatusBar } from 'expo-status-bar';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Input from './src/components/input';
import Button from './src/components/button';
import List from './src/components/list';
import { useEffect, useState } from 'react';
import { Tarefa } from "./src/types/tarefas";
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  function adicionarTarefa() {
    if (texto.trim() === '') return;

    const novaTarefa: Tarefa = {
      id: Math.random().toString(20).substring(2),
      titulo: texto,
      status: false,
    };
    setTarefas((prev) => [...prev, novaTarefa]);
    setTexto('');
      Keyboard.dismiss();
  }

  function alternarStatus(id: string) {
    const status = tarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, status: !tarefa.status } : tarefa
    );
    setTarefas(status);
  }

  function deletarTarefa(id: string) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  function deletarTodasTarefas() {
    setTarefas([]);
  }

  const total = tarefas.length;
  const pendentes = tarefas.filter(t => !t.status).length;
  const feitas = tarefas.filter(t => t.status).length;

  const percentualFeitas = total === 0 ? 0 : (feitas / total) * 100;
  const percentualPendentes = total === 0 ? 0 : (pendentes / total) * 100;

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 20, fontWeight: '900', marginTop: -50 }}>LISTA DE TAREFAS</Text>
      <StatusBar style="auto" />
      <View style={styles.children}>
        <Input onChange={setTexto} valor={texto} />
        <Button onPress={adicionarTarefa} />
      </View>

    
      {/* Gráficos de Contagem */}
      <View style={styles.contagemContainer}>
        <View style={[styles.contador, {flexDirection:'row' , alignItems:'center', justifyContent:'space-between'}]}>
          <View style={styles.containerTotal}>
                <FontAwesome5 name="tasks" size={24} color="#2c3e50" />
                 <Text style={styles.contadorTexto}>Total: {total}</Text>
          </View>     
            <TouchableOpacity onPress={deletarTodasTarefas} style={styles.deletarBtn}>
        <Text style={styles.deletarText}>🗑️ DELETAR TODAS</Text>
      </TouchableOpacity>

        </View>

        <View style={styles.contador}>
          <FontAwesome5 name="hourglass-half" size={24} color="#e67e22" />
          <View style={styles.contadorContainer}>
             <Text style={styles.contadorTexto}>Pendentes: {pendentes}</Text>
               <View style={styles.barra}>
            <View style={[styles.barraInterna, { width: `${percentualPendentes}%`, backgroundColor: '#e67e22' }]} />
          </View>
          </View>
         
         
        </View>

        <View style={styles.contador}>
          <FontAwesome5 name="check-circle" size={19} color="#2b332f" />
          <View style={styles.contadorContainer}>
              <Text style={styles.contadorTexto}>Finalizadas: {feitas}</Text>
          <View style={styles.barra}>
            <View style={[styles.barraInterna, { width: `${percentualFeitas}%`, backgroundColor: '#27ae60' }]} />
          </View>
          </View>
          
        </View>
      </View>

      <View style={styles.contianerList}>
        <List tarefas={tarefas} onPress={alternarStatus} onDelet={deletarTarefa} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap:20,
  },
  children: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    padding: 10,
  },
  contianerList: {
    width: '100%',
    height:'34%'
  },
  containerTotal:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },
  deletarBtn: {
    backgroundColor: '#c0392b',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  deletarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contagemContainer: {
    width: '90%',
    
    padding:10,
    backgroundColor: '#ecf0f1',
    borderRadius: 12,  
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex:1,
  },
  contadorContainer:{
    flexDirection: 'column',
    width:'90%',
    
  },
  contador: {
    flex:1,
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    gap:10,
  },
  contadorTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  barra: {
    height: 10,
    backgroundColor: '#dcdde1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barraInterna: {
    height: 10,
    borderRadius: 10,
  },
});
