import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import Axios from 'axios';

const Home = () => {
  const [dataToys, setDataToys] = useState([]);

  useEffect(() => {
    Axios.get('http://10.0.2.2:3000/toys')
      .then((response) => setDataToys(response.data))
      .catch((error) => alert("Erro ao listar brinquedos: " + error))
  }, []);
  
  const navigation = useNavigation();

  return (
  <View> 
    <View style={styles.header}>
      <Text style={{fontSize: 25, fontWeight: 'bold' }}>Toy Donation</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Toy')}>
        <Text style={{fontSize: 18, color: 'green'}}>Adicionar</Text>
      </TouchableOpacity>
    </View>
    <FlatList 
      style={styles.list}
      keyExtractor={(item, index) => item.id}
      data={dataToys} 
      renderItem={ ({item})=> (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Toy', {data: item})}>
        <Image style={styles.image} resizeMode="contain" source={{uri: item.image ? item.image : null}}/>
        <View style={styles.subcontainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>Estado: {item.status == 0 ? 'Usado' : (item.status == 1 ? 'Novo': 'Necessita Reparo')}</Text>
          <Text>Local: {item.address}</Text>
        </View>
      </TouchableOpacity>
    ) } />
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  list: {
    padding: 20
  },
  container: {
    backgroundColor: "white",
    flexDirection: 'row',
    marginBottom: 5
  },
  subcontainer: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    width: 75, 
    height: 100, 
    borderWidth: 1,
    borderColor: 'green'
  }
})

export default Home;
