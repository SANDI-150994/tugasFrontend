import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'


const Register = () => {
  const navigation = useNavigation();
  const [nrp,setNrp] = React.useState('');
  const [nama,setNama] = React.useState('');
  const [password,setPassword] = React.useState('');

  const handleRegis = async(value) => {
    console.log('value', value);

    try {
      const response = await axios.post('http://192.168.1.32:4000/karyawan/',{
        nrp : value.nrp,
        nama : value.nama,
        password : value.password
      })
      if(response.data.status == 200){
        console.log('response', response.data)
        navigation.navigate('Login')
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
        ToastAndroid.show("Sign Up Berhasil", ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Cek kembali data mu", ToastAndroid.SHORT)
    }

  }


  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <Image source={Illustration} style={styles.Illustration}/>
          <Text style={styles.title1}>REGISTER</Text>
          
      </View>
      <View style={styles.form}>
        <TextInput
        style={styles.input}
        placeholder ="Nama"
        placeholderTextColor="#58565e"
        onChangeText={(nama) => setNama(nama)}
        value={nama}
        />

        <TextInput
        style={styles.input}
        placeholder ="Nrp"
        placeholderTextColor="#58565e"
        onChangeText={(nrp) => setNrp(nrp)}
        value={nrp}
        />
        
        <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder ="Password"
        placeholderTextColor="#58565e"
        onChangeText={(password) => setPassword(password)}
        value={password}
        />

      </View>
      <View style={styles.footer}>
        <TouchableOpacity style = {styles.button} 
          onPress={async() => await handleRegis({nrp, nama, password})}>
            <Text style = {styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style = {styles.lowerText}>
          Already have an account? 
          <Text style ={{fontWeight : 'bold',color:'#05BFDB'}} 
          onPress={() => navigation.navigate('Login')}
          >
           Sign In
        </Text>
        </Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: '#000',
  },
  Logo : {
    width : 100,
    height : 30,
  },
  body : {
    alignItems : 'center',
    marginTop : 20,
  },
  Illustration : {
    marginTop : 10,
    width : 200,
    height : 200,
  },
  title1 : {
    fontSize : 27,
    fontWeight : '700',
    color : '#323333',
    marginTop: 10
  },
  form : {
    marginTop : 10,
    marginHorizontal: 50,
  },
  input : {
      width :300,
      height : 50,
      borderWidth : 1,
      backgroundColor : '#e0e0e0',
    //   borderColor : '#BABABA',
      borderRadius : 10,
      borderWidth : 0,
      color : '#323333',
      paddingHorizontal : 20,
      fontSize : 17,
      fontWeight : '300',
      marginVertical : 15,
    },
  footer : {
    alignItems : 'center',
  },
  button : {
      width :300,
      height : 50,
      backgroundColor : '#9BA4B5',
      borderRadius : 20,
      justifyContent : 'center',
      alignItems : 'center',
      marginTop: 20,
    },
  buttonText :{
    color : '#000',
    fontSize :20,
    fontWeight : 'bold', 
  },
  lowerText : {
    color : '#fff',
    fontSize : 16,
    marginTop : 20,
  }

})

export default Register