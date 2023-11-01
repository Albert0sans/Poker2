
import React, { useState, useRef } from 'react';
import { View, Text, TouchableHighlight, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Picker = ({ selectedValue, onValueChange, items, selectedValuestyle, selectedValueText, Modalstyle }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (itemValue) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View>
         <Text style={selectedValuestyle} >{selectedValueText + selectedValue}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          width: "100%",
          position: 'absolute',
          top: 0,
          marginTop: 0,
          padding: 0,
        height: "100%",
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }} >
        <View onTouchEnd={() => setModalVisible(false)}
          style={Modalstyle}>
          {items.map((item) => (
            <TouchableHighlight
              key={item.value}
              onPress={() => handleItemPress(item.value)}
            >
              <View>
                <Text >{item.label}</Text>
              </View>
            </TouchableHighlight>

          ))}

          <TouchableHighlight onPress={() => setModalVisible(false)}>
            <View>
              <Text>Cancel</Text>
            </View>
          </TouchableHighlight>
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default Picker;



