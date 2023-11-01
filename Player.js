
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Player = ({
    playerIndex,
    isPlayerCardSelected,
    playerCardPairs,
    handleImageClick,
    removeCard,
    Card1B,
    allCards,
    deleteMode, // Add deleteMode as a prop
    playingPlayer,
    x,
    y,
    playerWithCards,
    backgroundColor,
    Handpretty,
    Probability,
    Detail,
    playerFolds,
    removePlayer

}) => {
    return (
        <View
        key={playerIndex}
        style={[
            styles.player,
            { opacity: playerWithCards === 1 ? 1 : 0.5 },
            
            { left: x + "%", top: y + "%" }]}
    >
            <View style={[
                styles.cardAndName,
                { display: playingPlayer === 1 ? "block" : "none" },
            ]
            
            
            }>
            <View
                        style={[
                            styles.cardContainer,

                            { display: playingPlayer === 1 ? "block" : "none" },
                        ]}

                    >
                {Array.from({ length: 2 }).map((_, cardIndex) => (
                    <View key={cardIndex}>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    deleteMode ? removeCard(playerIndex, cardIndex) : handleImageClick(playerIndex, cardIndex)
                                }
                            >
                                <Image
                                    style={styles.card}
                                    source={
                                        isPlayerCardSelected[cardIndex] === false
                                            ? Card1B
                                            : allCards[playerCardPairs[cardIndex]]
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
           
            <View style={styles.player_name}>
                <Text>Player {playerIndex}</Text>
            </View>
           
            <View

                        style={[
                            {position: 'absolute'},
                            
                        ]}
                    >
                        <Text style={[
                            styles.Probabilities,
                            { backgroundColor: backgroundColor },

                        ]}>
                            {Probability + "%"}</Text>
                       
                        <Text 
                            
                            style={[
                                styles.Details,
                                { display: playerCardPairs[0] === 0 && playerCardPairs[1] === 0 ? "none" : "flex" },
                            ]}
                        >
                            {Handpretty(Detail)}
                        </Text>
                    </View>
                    </View>
                    <View style={styles.foldandremove}>

<TouchableOpacity

    style={[
        styles.foldbtn,
        { display: playingPlayer === 1 ? "block" : "none" },]}
    onPress={() => playerFolds(playerIndex)}
    >
    <Text
        style={styles.foldbtntxt}

    >{playerWithCards ? 'Fold' : 'Unfold'}</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.leavebtn}
    onPress={() => removePlayer(playerIndex)}
    >
    <Text style={styles.leavebtntxt}>{playingPlayer ? 'Remove' : 'Join'}</Text>
    </TouchableOpacity>

</View>
                    
        </View>
    );
};
const styles = StyleSheet.create({
    player: {
        position: 'absolute',


        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    },
    foldandremove: {
        flexDirection: 'row',
    },
    cardAndName: {

    },
    cardContainer: {
        flexDirection: "row",

    },
    
    foldbtn: {
       
        backgroundColor: '#0d0d0d',
        padding: 2,
        borderRadius: 5,
        borderWidth: 0,
    
        opacity: 0.6,
        color: 'white',

    },
    foldbtntxt: {
        color: 'white',
    },
    leavebtn: {
      
      
     
        backgroundColor: '#0d0d0d',
        color: 'white',
        padding: 2,
        borderRadius: 5,
        borderWidth: 0,
        cursor: 'pointer',
        opacity: 0.6,
    },
    leavebtntxt: {

        color: 'white',

    },
    card: {

        position: 'relative',
        borderColor: 'black',
        width: 50,
        height: 70,
        margin: 1,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 5,
    },
    player_name: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#2196F3',
        width: "100%",
        padding: 2,

        borderRadius: 5,


    },    
    Probabilities: {
       
        color: 'white',
        zIndex: -999,
        paddingRight: 3,
        paddingLeft: 2,
        opacity: 0.7,
        left: -40,
        top: 10,
        width: "min-content",
        flexDirection: "row",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
    },
    Details: {
        transform: [{ translateX: -40 }, { translateY: -20 }],
        top: 70,
        width: "250%",
        position: 'absolute',
        color: 'white',
        fontSize: 12,
        borderColor: '#0d0d0d',
    },
});

export default Player;
