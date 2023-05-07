import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Illustration from '../assets/Illustration.png'

const Login = () => {
    const navigation = useNavigation()
    const [nrp,setNrp] = React.useState('')
    const [password,setPassword] = React.useState('')

    const handleLogin = async(value) => {
      console.log('value', value)

      try {
        const response = await axios.post('http://192.168.1.32:4000/karyawan/login',{
          nrp : value.nrp,
          password : value.password
        })
        if(response.data.status == 200){
          console.log('response', response.data);
          ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
          // AsyncStorage.setItem
          await AsyncStorage.setItem('password', value.password)
          await AsyncStorage.setItem('nrp', value.nrp)
          // await AsyncStorage.setItem('name', response.data.users.nama)
          navigation.navigate('Home')
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Cek kembali nrp dan password", ToastAndroid.SHORT)
      }

    }

  return (
        <View style={styles.container}>
          <View style={styles.body}>
              
              <Image source={Illustration} style={styles.Illustration}/>
          </View>
          <View style={styles.form}>
            <TextInput
            style={styles.input}
            placeholder ="Nrp"
            placeholderTextColor="#000"
            onChangeText={(nrp) => setNrp(nrp)}
            value={nrp}
            />
            <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder ="Password"
            placeholderTextColor="#000"
            onChangeText={(password) => setPassword(password)}
            value={password}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style = {styles.button} 
            // onPress={() => navigation.navigate('Home')}>
            onPress={async() => await handleLogin({nrp, password})}>
            
                <Text style = {styles.buttonText}>L O G I N</Text>
            </TouchableOpacity>
            <Text style = {styles.lowerText}>
              Belum punya akun? 
              <Text style ={{fontWeight : 'bold',color:'#05BFDB'}} 
              onPress={() => navigation.navigate('Register')}
              >
               Sign Up
            </Text>
            </Text>
          </View>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      container : {
        flex : 1,
        backgroundColor : '#000'
      },
      Logo : {
        width : 110,
        height : 30,
      },
      body : {
        alignItems : 'center',
        marginTop : 20,
      },
      Illustration : {
        marginTop : 25,
        width : 240,
        height : 220,
      },
      form : {
        // marginTop : 30,
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
          borderRadius : 10,
          justifyContent : 'center',
          alignItems : 'center',
          marginTop: 20,
          marginHorizontal: 50
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
    
    export default Login
