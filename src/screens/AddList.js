import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../assets/Logo.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DatePicker from 'react-native-date-picker'
import { StackActions } from '@react-navigation/native';


const AddList = () => {

    const navigation = useNavigation();
    const [kegiatan,setKegiatan] = React.useState('');
    const [date, setDate] = useState(new Date())
  
    const [data, setData] = useState({ 
      nrp: '',
      password: '',
      name: ''
    })


    useEffect(() => {
      getData()
      return () => { };
    }, []);


    const getData = async () => {
      try {
        let nrp = await AsyncStorage.getItem('nrp')
        let password = await AsyncStorage.getItem('password')
        let name = await AsyncStorage.getItem('name')
          if (nrp !== null) {
            
              // value previously stored
              setData({
                nrp: nrp,
                password: password,
                name: name
              })
          }
      } catch (e) {
          // error reading value
      }
  }


    const InsertList = async(value) => {
      console.log('value', value);
  
      try {
        const response = await axios.post('http://192.168.1.32:4000/list/',{
          nrp : data.nrp,
          kegiatan : value.kegiatan,
          tanggal : date
        })
        if(response.data.status == 200){
          console.log('response', response.data);
          navigation.dispatch(
            StackActions.replace('Home')
          );
          ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT)
          ToastAndroid.show("Berhasil Tambah Kegiatan", ToastAndroid.SHORT)
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Input Error", ToastAndroid.SHORT)
      }
  
    }

  return (
    <View style={styles.container}>

        <View>
          <Image source={Logo} style={styles.logo}/>
        </View>

          <View style={styles.body}>
              <Text style={styles.title1}>Add Kegiatan</Text>
          </View>

            <View style={styles.form}>
              <TextInput
              style={styles.input}
              placeholder ="Kegiatan"

              onChangeText={(kegiatan) => setKegiatan(kegiatan)}
              value={kegiatan}
              />

              <Text style={styles.formText}>Tanggal</Text>
       
       <DatePicker date={date} onDateChange={setDate} mode='datetime' style={{marginVertical:20, backgroundColor: '#fff', borderColor:'#9BA4B5', shadowColor:'#9BA4B5' }}/>
     </View>
     <View style={styles.footer}>
       <TouchableOpacity style = {styles.button} 
         onPress={
          async() => await InsertList({kegiatan})}
          >
           <Text style = {styles.buttonText}>Add</Text>
       </TouchableOpacity>
     </View>
   </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#000'
  },
  navbar : {
    backgroundColor : '#eb8d2f',
    height : 50,
    // alignItems : 'center',
    paddingLeft : 20,
    justifyContent : 'center',
  },
  logo : {
    width : 50,
    height : 50,
    marginHorizontal:20,
    marginTop:10
  },
  body : {
    alignItems : 'center',
    marginHorizontal:20
    // marginTop : 10,
  },
  title1 : {
    fontSize : 27,
    fontWeight : '700',
    color : '#fff',
    marginTop: 60
  },
  form : {
    marginTop : 20,
    marginHorizontal: 50,
  },
  input : {
      width :300,
      height : 50,
      borderWidth : 1,
      backgroundColor : '#e0e0e0',
      borderRadius : 10,
      borderWidth : 0,
      paddingHorizontal : 20,
      fontSize : 17,
      fontWeight : '300',
      marginVertical : 15,
  },
  formText:{
    color:'#fff',
    fontWeight:'bold',
    marginHorizontal: 5,
    fontSize:20
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
    },
  buttonText :{
    color : '#fff',
    fontSize :20,
    fontWeight : 'bold', 
  },
  lowerText : {
    color : 'white',
    fontSize : 16,
    marginTop : 20,
  }

})

export default AddList