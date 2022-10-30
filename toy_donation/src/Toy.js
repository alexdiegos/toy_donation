import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Button, Image, StyleSheet, ScrollView} from 'react-native';
import { RadioButton } from 'react-native-paper'

import * as ImagePicker from 'react-native-image-picker';

import { useNavigation, useRoute } from '@react-navigation/native';

import Axios from 'axios';

const Toy = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [title, setTitle] = useState('Adicionar Brinquedo');
  const [btnText, setBtnText] = useState('Cadastrar');
  const [existentToy, setExistentToy] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('0');
  const [donator, setDonator] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');

  const saveToy = () => {
    if (name.trim() === "") {
      alert("Nome não pode estar vazio")
    } else {
      var statusValue = Number(status);
      if(btnText == 'Alterar'){
        Axios.patch('http://10.0.2.2:3000/toys/' + id, {
          name,
          description,
          statusValue,
          donator,
          address,
          phone,
          image
        }).then((res) => {
          alert("Salvo com sucesso!")
          navigation.navigate('Home', {res: res})
        }).catch(() => alert("Erro ao salvar"))
      } else {
        Axios.post('http://10.0.2.2:3000/toys', {
          name,
          description,
          statusValue,
          donator,
          address,
          phone,
          image
        }).then((res) => {
          alert("Salvo com sucesso!")
          navigation.navigate('Home', {res: res})
        }).catch(() => alert("Erro ao salvar"))
      }
    }
  }

  const deleteToy = () => {
    Axios.delete('http://10.0.2.2:3000/toys/' + id).then((res) => {
      alert("Deletado com sucesso!")
      navigation.navigate('Home', { res: res })
    }).catch(() => alert("Erro ao salvar"))
  }

  useEffect(() => {
    if (route.params && route.params.data) {
      const toy = route.params.data;

      setName(toy.name);
      setDescription(toy.description);
      setStatus(toy.status.toString());
      setDonator(toy.donator);
      setAddress(toy.address);
      setPhone(toy.phone);
      setImage(toy.image);
      setId(toy.id);  

      setTitle('Editar Brinquedo')
      setBtnText('Alterar')
      setExistentToy(true)
    } else {
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}> 
        <View style={styles.header}>
          <Text style={{fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
        </View>
        <Image style={styles.image} resizeMode="contain" source={{uri: image ? image : null}}/>
        <TouchableOpacity onPress={() => ImagePicker.showImagePicker({}, (res) => setImage(res.uri))}>
          <Text>Carregar imagem</Text>
        </TouchableOpacity>
        <TextInput
            value={name}
            onChangeText={(txt) => setName(txt)}
            placeholder="Nome"
            style={styles.input}
            placeholderTextColor="#5a5a5a" />

        <TextInput value={description} multiline={true} onChangeText={(txt) => setDescription(txt)} placeholder="Descrição" style={styles.input} placeholderTextColor="#5a5a5a" />
        <Text>Estado do brinquedo:</Text>
        <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status} style={{flexDirection: 'row'}}>
          <RadioButton.Item label="Usado" value="0" position='leading'/>
          <RadioButton.Item label="Novo" value="1" position='leading'/>
          <RadioButton.Item label="A Reparar" value="2" position='leading'/>
        </RadioButton.Group>
        <TextInput value={donator} onChangeText={(txt) => setDonator(txt)} placeholder="Nome Doador" style={styles.input} placeholderTextColor="#5a5a5a" />
        <TextInput value={phone} onChangeText={(txt) => setPhone(txt)} placeholder="Telefone" style={styles.input} placeholderTextColor="#5a5a5a" />
        <TextInput value={address} onChangeText={(txt) => setAddress(txt)} placeholder="Endereço" style={styles.input} placeholderTextColor="#5a5a5a" />

        <View flexDirection='row'>
          <Button title={btnText} onPress={saveToy} style={{padding:10}}/>
          { existentToy &&
            <Button title="Deletar" onPress={deleteToy} style={{padding:10}}/>}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  subcontainer: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: 'green'
  },
  input: { 
    fontSize: 16, 
    marginTop: 10, 
    borderWidth: 1, 
    width: '100%', 
    height: 50, 
    padding: 5, 
    borderRadius: 7, 
    marginBottom: 10 
  }
})

export default Toy;
