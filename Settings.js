import React from 'react';
import { View,TextInput, Switch, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import {benchMark} from './Probabilities';
import { StyleSheet } from 'react-native';

const Settings = ({numberofsimultaions,setnumberofsimultaions,calcProb,setcalcProb}) => {
  const toggleSwitch = () => setcalcProb(previousState => !previousState);

  return (

    <View style={styles.container}>
      <View style={styles.options}>
      <Text style={styles.text}>Number of Simulations: </Text>

      <TextInput 
   style={styles.textInput}
   keyboardType='numeric'
   onChangeText={(text)=> setnumberofsimultaions(parseInt(text))}
   value={''+numberofsimultaions}
   maxLength={10}  //setting limit of input
/></View>

<View style={styles.options}>
      <Text style={styles.text}>Auto Calculate Probabilities on card changes </Text>

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={calcProb ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={calcProb}
      />

  </View>



    </View>


  );
}
const styles = StyleSheet.create({
  options:{
flexDirection: 'row',
marginLeft: 10,
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'left',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
  textInput:{
fontSize: 30,
    color: '#000',
    marginLeft: 10,
    width: 100,
  }
});
export default Settings;