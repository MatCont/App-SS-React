import React from 'react';
import { ScrollView, StyleSheet, View, Text,Button, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { BlurView } from 'expo-blur'
import BottomNavigatorOperador from './navigation/BottomNavigationOperador';
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from '../consts/firebase';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation= useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log('Account created')
            const user =userCredential.user;
            console.log(user)
           
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }

    const handleSignIn =()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            console.log('Signed in')
            const user =userCredential.user;
            console.log(user)
            navigation.navigate('Home')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        
        <View style={style.container}>
            <StatusBar backgroundColor="black" />
            <Image source={require('../assets/Login-Fondo.jpg')} style={[style.image, StyleSheet.absoluteFill]} />


            <ScrollView contentContainerStyle={{flex: 1, width: '100%',  height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <BlurView intensity={200} >
                    <View style={style.login}>
                        <Image source={require('../assets/logo_SS.png')} style={[style.image, style.imglogo]} />
                        <View>
                            <Text style={style.text}>E-mail</Text>
                            <TextInput onChangeText={(text)=>setEmail(text)} style={style.input} placeholder='E-mail'/>
                        </View>
                        <View>
                            <Text style={style.text}>Password</Text>
                            <TextInput onChangeText={(text)=>setPassword(text)} style={style.input} placeholder='Password' secureTextEntry={true}/>
                        </View>
                        <TouchableOpacity onPress={handleSignIn} style={[style.button, {backgroundColor:'#00cfeb90', borderRadius:10}]}>
                            <Text style={style.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCreateAccount} style={[style.button, {backgroundColor:'#6792f090', borderRadius:10}]}>
                            <Text style={style.text}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    login: {
        width: 350,
        height: 500,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    imglogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginVertical: 30,
    },
    text:{
        fontSize:17,
        fontWeight:'400',
        color:'white',
    },
    input:{
        width:250,
        height:40,
        borderColor:'#fff',
        borderWidth:2,
        borderRadius:10,
        padding:10,
        paddingVertical: 10,
        backgroundColor:'#ffffff90',
        marginBottom:20,
    },
    button:{
        width:250,
        height:40,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        borderColor:'white',
        borderWidth:1,
    },
});

export default Login;
