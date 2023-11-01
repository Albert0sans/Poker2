import Table from "./Table";
import Settings from "./Settings";

import React, { useState } from 'react';
import { View,TouchableOpacity ,Image, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuBtn from './images/menu.png';
const Drawer = createDrawerNavigator();

function TableScreen({ numberofSimulations, calcProb }) {
  const navigation = useNavigation();

  return (
    <View style={styles.TableScreen}>
      <Table numberofSimulations={numberofSimulations} calcProb={calcProb} />
      <View style={styles.headerBtn}>
        
          
          <TouchableOpacity  onPress={() => {
            navigation.openDrawer();
          }}>
        <Image
        style={styles.homeBtn}
        source={MenuBtn}
        />
        </TouchableOpacity>
          
        
      </View>
    </View>
  );
}

function App() {
  const [numberofSimulations, setNumberofSimulations] = useState(1000);
  const [calcProb, setcalcProb] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Board">
          <Drawer.Screen name="Board" options={{ title: "Calculator", headerShown: false }}>
            {() => <TableScreen numberofSimulations={numberofSimulations} calcProb={calcProb} />}
          </Drawer.Screen>
          <Drawer.Screen name="Play">
            {() => <Settings numberofsimultaions={numberofSimulations} setnumberofsimultaions={setNumberofSimulations} calcProb={calcProb} setcalcProb={setcalcProb} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  homeBtn: {
    width: 30,
    height: 30,
    top: "10%",
    position: 'absolute',
  },
  TableScreen: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});

export default App;
