import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import ProfileP from '../assets/Profile.png'

const Account = () => {
    const [nrp, setNrp] = useState('')
    const [nama, setNama] = useState('')
    const [passwordLama, setPasswordLama] = useState('')
    const [passwordBaru, setPasswordBaru] = useState('')
    const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

    const navigation = useNavigation();

    const [data, setData] = useState({
        nrp: '',
        password: '',
        name: ''
    })

    console.log('nrp', data.nrp)
    console.log('password', data.password);
    console.log('name', data.name);

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
                    nama: name,
                    password: password,
                    name: name
                })
                setNrp(nrp)
                setNama(name)
            }
        } catch (e) {
            // error reading value
        }
    }

    const resetPassword = async (value) => {
        console.log('value', value);
        try {
            const response = await axios.put('http://192.168.1.32:4000/karyawan', {
                nrp: value.nrp,
                nama : value.nama,
                password: value.passwordLama,
                passwordBaru: value.passwordBaru,
            })
            if (response.data.status == 200) {
                console.log('response', response)
                ToastAndroid.show("Password berhasil diubah", ToastAndroid.SHORT)
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error.message)
            ToastAndroid.show("Cek kembali nrp dan password", ToastAndroid.SHORT)
        }
    }

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('nrp')
          await AsyncStorage.removeItem('password')
          await AsyncStorage.removeItem('name')
          navigation.navigate('Login')
        } catch(e) {
          // remove error
        }
      
        console.log('Done.')
      }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    <Image source={ProfileP} style={styles.profilePicture} />
                </View>

                <View style={styles.form}>
                    <View style={styles.formText}>
                        <Text style={styles.Text}>Nrp</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="nrp"
                        placeholderTextColor="#b8b8b8"
                        onChangeText={(nrp) => setNrp(nrp)}
                        value={nrp}
                        // editable = {false}
                    />
                    <View style={styles.formText}>
                        <Text style={styles.Text}>Nama</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="#b8b8b8"
                        onChangeText={(nama) => setNama(nama)}
                        value={nama}
                    />

                    <View style={styles.formText}>
                        <Text style={styles.Text}>Password Lama</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setPasswordLama(password)}
                        value={passwordLama}
                    />

                    <View style={styles.formText}>
                        <Text style={styles.Text}>Password Baru</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setPasswordBaru(password)}
                        value={passwordBaru}
                    />

                    <View style={styles.formText}>
                        <Text style={styles.Text}>Konfirmasi Password</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="#a1a1a1"
                        secureTextEntry={true}
                        onChangeText={(password) => setKonfirmasiSandi(password)}
                        value={konfirmasiSandi}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            if (nrp == "" || passwordLama == "" || passwordBaru == "" || konfirmasiSandi == "") {
                                ToastAndroid.show("Data tidak boleh kosong", ToastAndroid.SHORT);
                            } else if (nrp !== data.nrp || passwordLama !== data.password) {
                                ToastAndroid.show('nrp atau Password Salah', ToastAndroid.SHORT);
                            } else if (passwordBaru !== konfirmasiSandi) {
                                ToastAndroid.show('Password Baru dan Konfirmasi Password Tidak Sama', ToastAndroid.SHORT);
                            } else {
                                resetPassword({ nrp: nrp, nama: nama, passwordLama: passwordLama, passwordBaru: passwordBaru })
                            } 
                        }} >
                        <Text style={styles.textButton}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogout} onPress={async() => await removeValue()}>
                        <Text style={styles.textLogout}>Log Out</Text>
                    </TouchableOpacity>
                    </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : '#000'
  },
  body : {
    alignItems : 'center',
    marginVertical : 10
  },
  profilePicture : {
    width : 100,
    height : 100,
  },
  form : {
    marginHorizontal : 45,
    marginTop : 5
  },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: '#9BA4B5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 20
    },
    textButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight : '900'
    },
    formText : {
        marginTop : 5,
        marginBottom : 5
    },
    Text : {
        color : '#fff',
        fontWeight : '600',
        fontSize : 16,
    },
    btnLogout: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderColor : '#a1a1a1',
        borderWidth : 2, 
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 20,
        marginBottom : 40,
    },
    textLogout: {
        color: '#323333',
        fontSize: 18,
        fontWeight:'bold'
    },
})

export default Account