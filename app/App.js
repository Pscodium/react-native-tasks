import { 
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Text, 
  View,
  FlatList,
  Keyboard,
  Alert,
  AsyncStorageStatic,
  AsyncStorage
} from 'react-native'

import React, { useState, useEffect } from 'react'

import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');


  async function addTask() {   

    if(newTask == ""){
      return
    }

    const search = task.filter(task => task == newTask);

    if(search.length != 0) {
      Alert.alert("Atenção", "Esta tarefa já existe");
      return
    }

    setTask([ ... task, newTask]);
    setNewTask('');

    Keyboard.dismiss();
  }

  async function delTask(item) {
    Alert.alert(
      "Deletar Task",
      "Tem certeza que deseja remover essa tarefa?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter(tasks => tasks != item)),
        }
      ],
      { cancelable: false }
    )

  }

  useEffect(() => {
    async function loadTask() {
      const task = await AsyncStorage.getItem("task");

      if(task){
        setTask(JSON.parse(task));
      }
    }
    loadTask();
  }, [])

  useEffect(() => {
    async function saveTask(){
      AsyncStorage.setItem("task", JSON.stringify(task))
    }
    saveTask();
  }, [task])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.Body}>
          <FlatList 
            style={styles.FlatList}
            data={task}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.ContainerView}>
                <Text style={styles.Texto}>{item}</Text>
                <TouchableOpacity onPress={() => delTask(item)}>
                  <MaterialIcons 
                    name="delete-forever" 
                    size={24} 
                    color="#FF5156"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <View style={styles.Form}>
          <TextInput 
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={true}
            placeholder="Adicione uma Tarefa"
            maxLength={30}
            onChangeText={text => setNewTask(text)}
            value={newTask}
          />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <MaterialIcons name='add-task' size={24} color="white"/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20, 
  },
  Body: {
    flex: 1,
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ABD2DE',
    borderRadius: 4,
    marginLeft: 10,
  },
  FlatList: {
    flex: 1,
    marginTop: 5,
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#eee',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "#eee",

  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  }
})