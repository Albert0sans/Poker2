import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { StyleSheet } from 'react-native';

function CardModal({ usedCards, allCards, onSelect, onClose }) {
  const cardsArray = Object.entries(allCards);


  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.cardModal}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>&times;</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.cardImages}>
          {cardsArray.map(([cardName, Card], index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cardImage,
                usedCards.includes(cardName) ? styles.usedCard : styles.availableCard,
              ]}
              onPress={() => {
                onSelect(cardName); // Pass the selected cardName to the callback
                onClose(); // Close the modal
              }}
            >
         
          {<View style={styles.cardImageContainer}>
      <Image style={styles.cardImage} source={Card} />
            </View>}{}
            
 
                  
            </TouchableOpacity>
          ))}
        
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  cardModal: {
    zIndex: 1,

    width: '50%',
    left: '25%',
    height: '100%',
borderTopLeftRadius: 10,
borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15% auto',
    padding: 20,
    opacity: 0.9,
    borderWidth: 1,
 backgroundColor: "#D7F9F8"
  },
  usedCard: {
  opacity: 0.5,
  },
  availableCard: {
    cursor: 'pointer',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    cursor: 'pointer',
  },
  cardImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardImage: {
    width: 80, // Adjust image size as needed
    height: 120,
    margin: 5,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,

  },
});

export default CardModal;
