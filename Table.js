import React, { useEffect, useRef, useState } from 'react';

import Picker from './Picker';
import Slider from '@react-native-community/slider';
import { StyleSheet, View,ScrollView, Switch, Text, Button, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardModal from './Card'; // Import the CardModal component
import { CalculatePlayersWinProb } from './Probabilities'; // Import the CalculatePlayersWinProb function
import { getHandDetails } from './Probabilities'; // Import the getHandDetails function
import { ranksName, cardsNames } from './Probabilities'; // Import the ranksName object
import Player from './Player'; // Import the Player component

import SettingsBtn from './images/settings.png';
import deleteIcon from './images/delete.png';
import resetIcon from './images/reset.png';
import closeIcon from './images/close.png';

import Card1B from './images/cards/1B.png';
import Card2S from './images/cards/2S.png';
import Card2C from './images/cards/2C.png';
import Card2D from './images/cards/2D.png';
import Card2H from './images/cards/2H.png';
import Card3S from './images/cards/3S.png';
import Card3C from './images/cards/3C.png';
import Card3D from './images/cards/3D.png';
import Card3H from './images/cards/3H.png';
import Card4S from './images/cards/4S.png';
import Card4C from './images/cards/4C.png';
import Card4D from './images/cards/4D.png';
import Card4H from './images/cards/4H.png';
import Card5S from './images/cards/5S.png';
import Card5C from './images/cards/5C.png';
import Card5D from './images/cards/5D.png';
import Card5H from './images/cards/5H.png';
import Card6S from './images/cards/6S.png';
import Card6C from './images/cards/6C.png';
import Card6D from './images/cards/6D.png';
import Card6H from './images/cards/6H.png';
import Card7S from './images/cards/7S.png';
import Card7C from './images/cards/7C.png';
import Card7D from './images/cards/7D.png';
import Card7H from './images/cards/7H.png';
import Card8S from './images/cards/8S.png';
import Card8C from './images/cards/8C.png';
import Card8D from './images/cards/8D.png';
import Card8H from './images/cards/8H.png';
import Card9S from './images/cards/9S.png';
import Card9C from './images/cards/9C.png';
import Card9D from './images/cards/9D.png';
import Card9H from './images/cards/9H.png';
import CardTS from './images/cards/TS.png';
import CardTC from './images/cards/TC.png';
import CardTD from './images/cards/TD.png';
import CardTH from './images/cards/TH.png';
import CardJS from './images/cards/JS.png';
import CardJC from './images/cards/JC.png';
import CardJD from './images/cards/JD.png';
import CardJH from './images/cards/JH.png';
import CardQS from './images/cards/QS.png';
import CardQC from './images/cards/QC.png';
import CardQD from './images/cards/QD.png';
import CardQH from './images/cards/QH.png';
import CardKS from './images/cards/KS.png';
import CardKC from './images/cards/KC.png';
import CardKD from './images/cards/KD.png';
import CardKH from './images/cards/KH.png';
import CardAS from './images/cards/AS.png';
import CardAC from './images/cards/AC.png';
import CardAD from './images/cards/AD.png';
import CardAH from './images/cards/AH.png';


const allCards = {
    "2S": Card2S,
    "2C": Card2C,
    "2D": Card2D,
    "2H": Card2H,
    "3S": Card3S,
    "3C": Card3C,
    "3D": Card3D,
    "3H": Card3H,
    "4S": Card4S,
    "4C": Card4C,
    "4D": Card4D,
    "4H": Card4H,
    "5S": Card5S,
    "5C": Card5C,
    "5D": Card5D,
    "5H": Card5H,
    "6S": Card6S,
    "6C": Card6C,
    "6D": Card6D,
    "6H": Card6H,
    "7S": Card7S,
    "7C": Card7C,
    "7D": Card7D,
    "7H": Card7H,
    "8S": Card8S,
    "8C": Card8C,
    "8D": Card8D,
    "8H": Card8H,
    "9S": Card9S,
    "9C": Card9C,
    "9D": Card9D,
    "9H": Card9H,
    "TS": CardTS,
    "TC": CardTC,
    "TD": CardTD,
    "TH": CardTH,
    "JS": CardJS,
    "JC": CardJC,
    "JD": CardJD,
    "JH": CardJH,
    "QS": CardQS,
    "QC": CardQC,
    "QD": CardQD,
    "QH": CardQH,
    "KS": CardKS,
    "KC": CardKC,
    "KD": CardKD,
    "KH": CardKH,
    "AS": CardAS,
    "AC": CardAC,
    "AD": CardAD,
    "AH": CardAH,
};


const Table = () => {



    const [radiusX, setRadiusX] = useState(0);
    const [radiusY, setRadiusY] = useState(0);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [deleteMode, setDeleteMode] = useState(false);
    const [cardsInTable, setCardsInTable] = useState(0);
    const [numberofSimulations, setnumberofSimulations] = useState(1000);
    const [calcProb, setcalcProb] = useState(true);



    const [N, setN] = useState(6);
    const [options, setOptions] = useState(false);



    const [ComunityCards, setComunityCards] = useState(() => {
        // Initialize the array with default card images
        return Array.from({ length: 5 }, () => 0);
    });

    const [IsComunityCardSelected, setIsComunityCardSelected] = useState(() => {
        // Initialize the array with false values for each position
        return Array.from({ length: 5 }, () => false);
    });

    const [isPlayerCardSelected, setIsPlayerCardSelected] = useState(() => {
        // Initialize the array with false values for each position
        return Array.from({ length: 9 }, () => [false, false]);
    });

    const [PlayerCardPairs, setPlayerCardPairs] = useState(() => {
        return Array.from({ length: 9 }, () => [0, 0]);
    });

    const [playingPlayers, setPlayingPlayers] = useState(() => {
        return Array.from({ length: 9 }, () => 1);
    });

    const [playersWithCards, setPlayersWithCards] = useState(() => {
        return Array.from({ length: 9 }, () => 1);
    });

    const [Probabilities, setProbabilities] = useState(() => {
        return Array.from({ length: 9 }, () => 1);
    });
    const [Details, setDetails] = useState(() => {
        return Array.from({ length: 9 }, () => "");
    });


    const getBackgroundColor = () => {

        if (!Probabilities) {
            return Array.from({ length: N }, () => "grey");
        }
        const parsedProbabilities = Probabilities.map(parseFloat);
        const maxProbability = Math.max(...parsedProbabilities);
        const minProbability = Math.min(...parsedProbabilities);

        //return a list of colors based on the probabilities grom red to yellow to gray
        return parsedProbabilities.map((probability) => {
            if (probability === maxProbability) {
                return "red";
            } else if (probability === minProbability) {
                return "grey";
            } else {
                return "#1e90ff";
            }
        });


    };



    const [backgroundColors, setBackgroundColors] = useState(getBackgroundColor(Probabilities));

    // Use useEffect to update the background colors when Probabilities change
    useEffect(() => {
        setBackgroundColors(getBackgroundColor(Probabilities));
    }, [Probabilities]);



    useEffect(() => {
        const mask = N === 6 ? [1, 1, 1, 1, 1, 1, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 1, 1, 1];

        setPlayingPlayers(prevPlayingPlayers => prevPlayingPlayers.map((value, index) => (N === 6 ? value && mask[index] : value || mask[index])));

    }, [N]);

    const [showCardModal, setShowCardModal] = useState(false);
    const [modalCardPosition, setModalCardPosition] = useState([]);




    useEffect(() => {


        const calculatedCenterX = 40;
        const calculatedCenterY = 0;
        const calculatedRadiusX = 65;
        const calculatedRadiusY = 75;

        setRadiusX(calculatedRadiusX);
        setRadiusY(calculatedRadiusY);
        setCenterX(calculatedCenterX);
        setCenterY(calculatedCenterY);


    }, []);

    const cards = [
        '2C', '2D', '2H', '2S',
        '3C', '3D', '3H', '3S',
        '4C', '4D', '4H', '4S',
        '5C', '5D', '5H', '5S',
        '6C', '6D', '6H', '6S',
        '7C', '7D', '7H', '7S',
        '8C', '8D', '8H', '8S',
        '9C', '9D', '9H', '9S',
        'TC', 'TD', 'TH', 'TS',
        'JC', 'JD', 'JH', 'JS',
        'QC', 'QD', 'QH', 'QS',
        'KC', 'KD', 'KH', 'KS',
        'AC', 'AD', 'AH', 'AS'
    ];

    const playerFolds = async (player) => {


        await setPlayersWithCards((playersWithCards) => {
            const updatedPlayersWithCards = [...playersWithCards];
            updatedPlayersWithCards[player] = 1 - updatedPlayersWithCards[player];
            return updatedPlayersWithCards;
        });

    };

    const removePlayer = (player) => {

        setPlayingPlayers((PlayingPlayers) => {
            const updatedPlayingPlayers = [...PlayingPlayers];
            updatedPlayingPlayers[player] = 1 - updatedPlayingPlayers[player];
            return updatedPlayingPlayers;
        }
        );
        setPlayersWithCards((prevPlayersWithCards) => {

            const updatedPlayersWithCards = [...prevPlayersWithCards];
            updatedPlayersWithCards[player] = 1;
            return updatedPlayersWithCards;
        }
        );

        removeCard(player, 0);
        removeCard(player, 1);


    };
    useEffect(() => {
        var aux;
        PlayerCardPairs.every((item) => item.every((card) => card === 0)) && ComunityCards.every((card) => card === 0) ? aux = (false) : aux = (true);
        setCardsInTable(aux)
        if (!aux) {
            setDeleteMode(false);
        }
        if (calcProb) {
            CalculatePlayersWinProbWrapper();

        }
    }, [playersWithCards, playingPlayers, ComunityCards, PlayerCardPairs]);


    const Handpretty = (hand) => {
        if (!hand) {
            return "";
        }
        const value = [...new Set(hand.value)];

        switch (hand.rank) {

            case 0:
                return "Royal Flush";
                break
            case 1:
            case 5:
                const value2 = hand.lowStraight ? cardsNames["J"] : cardsNames[value[0]];
                const value1 = hand.lowStraight ? cardsNames[value[0]] : cardsNames[value[4]];
                console.log(value);
                return ranksName[hand.rank] + " " + value1 + " to " + value2;
                break;
            case 4:
                return ranksName[hand.rank] + " high card" + cardsNames[value[0]];
                break
            case 2:
            case 8:

            
            case 6:
                return ranksName[hand.rank] + " of " + cardsNames[value[0]];
                break;
            case 3:
            case 7:
                return ranksName[hand.rank] + " of " + cardsNames[value[0]] + " and " + cardsNames[value[1]];
                break;

            case 9:
                return ranksName[hand.rank] + " " + cardsNames[value[0]];
                break;
            default:
                return hand.rank;
                break;
        }
    };
    const CalculatePlayersWinProbWrapper = () => {
        const selectedCardPairsFILTERED = PlayerCardPairs.map(innerArray => {
            return innerArray.filter(item => item !== 0);
        });
        const flopFILTERED = ComunityCards.filter(item => item !== 0);
        const probabilities = CalculatePlayersWinProb([...selectedCardPairsFILTERED], [...flopFILTERED], playingPlayers, playersWithCards, numberofSimulations);

        probabilities.map((value, index) => {
            WriteProbabilities(index, value);
        });

        selectedCardPairsFILTERED.map((value, index) => {
            if (value.length > 0) {
                var det = getHandDetails([...value, ...flopFILTERED]);
                WriteDetails(index, det);
            }
        });
    };

    const handleCardSelect = (card) => {


        changeCard(card);
        if (modalCardPosition[0] === "flop") {

            setIsComunityCardSelected((prevIsCardSelected) => {
                const updatedIsmidCardSelected = [...prevIsCardSelected];
                updatedIsmidCardSelected[modalCardPosition[1]] = true;
                return updatedIsmidCardSelected;
            });
            setComunityCards((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[modalCardPosition[1]] = card;
                return updatedImages;
            });
        } else {
            setPlayerCardPairs((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[modalCardPosition[0]][modalCardPosition[1]] = card;
                return updatedImages;
            });
            setIsPlayerCardSelected((prevIsCardSelected) => {
                const updatedIsCardSelected = [...prevIsCardSelected];
                updatedIsCardSelected[modalCardPosition[0]][modalCardPosition[1]] = true;
                return updatedIsCardSelected;
            });

        }
    };

    const WriteProbabilities = (player, probability) => {
        setProbabilities((prevProbabilities) => {
            const updatedProbabilities = [...prevProbabilities];
            updatedProbabilities[player] = probability.toFixed(1);
            return updatedProbabilities;
        });
    };

    const WriteDetails = (player, details) => {
        setDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[player] = details;
            return updatedDetails;
        });

    };

    const handleImageClick = (player, card) => {
        setShowCardModal(true);
        setModalCardPosition([player, card]);
    };

    const closeModal = () => {
        setShowCardModal(false);
    };

    const generateMiddleCards = () => {

        const num = 5;
        const middlehand = [];
        for (let i = 0; i < num; i++) {
            middlehand.push(
                <View key={i}>

                    <TouchableOpacity onPress={() => deleteMode ? removeCard("flop", i) : handleImageClick("flop", i)}>

                        <Image
                            height={styles.card.height}
                            width={styles.card.width}
                            style={styles.card}

                            source={IsComunityCardSelected[i] === false ? Card1B : allCards[ComunityCards[i]]} // Use the state variable for card image
                        />

                    </TouchableOpacity>


                </View>

            );
        }
        return middlehand;
    };

    const removeCard = (player, pos) => {

        if (player === "flop") {

            setIsComunityCardSelected((prevIsCardSelected) => {
                const updatedIsmidCardSelected = [...prevIsCardSelected];
                updatedIsmidCardSelected[pos] = false;
                return updatedIsmidCardSelected;
            });
            setComunityCards((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[pos] = 0;

                return updatedImages;
            });
        } else {
            setPlayerCardPairs((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[player][pos] = 0;
                return updatedImages;
            });
            setIsPlayerCardSelected((prevIsCardSelected) => {
                const updatedIsCardSelected = [...prevIsCardSelected];
                updatedIsCardSelected[player][pos] = false;
                return updatedIsCardSelected;
            });
        }



    };

    const changeCard = (card) => {
        const flopIndex = ComunityCards.findIndex(flopCard => flopCard === card);

        if (flopIndex !== -1) {
            setIsComunityCardSelected((prevIsCardSelected) => {
                const updatedIsmidCardSelected = [...prevIsCardSelected];
                updatedIsmidCardSelected[flopIndex] = false;
                return updatedIsmidCardSelected;
            });
            setComunityCards((prevImages) => {
                const updatedImages = [...prevImages];
                updatedImages[flopIndex] = 0;
                return updatedImages;
            });
            return;
        }


        for (let i = 0; i < PlayerCardPairs.length; i++) {
            const playerHand = PlayerCardPairs[i];
            const playerCardIdx = playerHand.indexOf(card);
            if (playerCardIdx !== -1) {
                playerIndex = i;
                playerCardIndex = playerCardIdx;
                setIsPlayerCardSelected((prevIsCardSelected) => {
                    const updatedIsCardSelected = [...prevIsCardSelected];
                    updatedIsCardSelected[i][playerCardIdx] = false;
                    return updatedIsCardSelected;
                }
                );
                setPlayerCardPairs((prevImages) => {
                    const updatedImages = [...prevImages];
                    updatedImages[i][playerCardIdx] = 0;
                    return updatedImages;
                }
                );
                return;
            }
        }
    };

    const CleanAll = () => {
        setProbabilities(Array.from({ length: N }, () => 0));
        setDetails(Array.from({ length: N }, () => ""));
        setIsComunityCardSelected(Array.from({ length: 5 }, () => false));
        setIsPlayerCardSelected(Array.from({ length: N }, () => [false, false]));
        setPlayerCardPairs(Array.from({ length: N }, () => [0, 0]));
        setComunityCards(Array.from({ length: 5 }, () => 0));
    };

    const reset = () => {
        CleanAll();
        setPlayingPlayers(Array.from({ length: N }, () => 1));
        setPlayersWithCards(Array.from({ length: N }, () => 1));
    };

    const generatePlayers = () => {
        const rectangles = [];

        for (let i = 0; i < N; i++) {
            const angle = (i * (360 / N)) * (Math.PI / 180);
            var mult = 1;
            var multx = 1;
            if (N === 9 && (i === 1 || i === 8 || i === 4 || i === 5 || i === 2)) {
                mult = 1.4;
                if (i == 4 || i === 5) {
                    multx = 1.4;
                    mult = 1.6;
                }

                if (i === 8) {
                    multx = 0.95;

                }

                if (i === 2) {
                    mult = 0.95;
                }
            }

            const x = (centerX + radiusX * Math.cos(angle)) * multx;
            const y = (centerY + radiusY * Math.sin(angle)) * mult;

            rectangles.push( <Player
                key={i}
                playerIndex={i}
                isPlayerCardSelected={isPlayerCardSelected[i]}
                playerCardPairs={PlayerCardPairs[i]}
                handleImageClick={handleImageClick}
                removeCard={removeCard}
                Card1B={Card1B}
                allCards={allCards}
                playerWithCards={playersWithCards[i]}
                playingPlayer={playingPlayers[i]}
                x={x}
                y={y}
                backgroundColor={backgroundColors[i]}
                Handpretty={Handpretty}
                Probability={Probabilities[i]}
                Detail={Details[i]}
                playerFolds={playerFolds}
                removePlayer={removePlayer}
              />)
              
        
       
    }

    return rectangles;
};

    return (


        <LinearGradient
            colors={['white', 'purple']} style={styles.container} >

            {!calcProb && (

                <View style={styles.calcProbBtn}>
                    <Button title="Calculate" onPress={() => CalculatePlayersWinProbWrapper()} />
                </View>

            )}
            <View


                style={styles.table}
            >



                {generatePlayers()}
                <View style={styles.middlecards}>
                    {generateMiddleCards()}
                </View>

            </View>



            {showCardModal && (
                <CardModal
                    closeModal={closeModal}
                    allCards={allCards}
                    usedCards={[...PlayerCardPairs.flat(), ...ComunityCards]}
                    onSelect={handleCardSelect}
                    onClose={closeModal}
                />
            )}
            <View>

                <TouchableOpacity onPress={() => setOptions(true)} style={[
                    { display: options ? "none" : "flex" }
                ]}>
                    <Image source={SettingsBtn} style={styles.SettingsBtn} />
                </TouchableOpacity>

            </View>
            <View style={[styles.optionscontainer,
            { display: options ? "flex" : "none" }
            ]}>
                <TouchableOpacity onPress={() => setOptions(false)} style={styles.closeButton}>
                    <Image source={closeIcon} style={styles.closeButtonsettings} />
                </TouchableOpacity>


            <ScrollView>
                <TouchableOpacity style={styles.settingsRow} onPress={() => reset()} >
                    <Image style={styles.icons} source={deleteIcon}></Image>
                    <Text>Reset</Text>
                </TouchableOpacity>




                <TouchableOpacity style={styles.settingsRow} onPress={() => CleanAll()} >

                    <Image style={styles.icons} source={resetIcon}></Image>
                    <Text>Clean All</Text>
                </TouchableOpacity>





                <View style={styles.settingsCol}>
                    <Text>{numberofSimulations}</Text>
                    <Slider
                        style={{ width: "100%", height: 40 }}
                        step={1}
                        minimumValue={100}
                        maximumValue={10000}
                        onValueChange={(text) => setnumberofSimulations(parseInt(text))}
                        value={numberofSimulations}
                    /></View>
                <View style={styles.settingsRow}>
                    <Picker selectedValuestyle={{ fontSize: 15 }}
                        selectedValue={N}
                        selectedValueText={"Players: "}
                        Modalstyle={styles.changeTableTypeModalStyle}
                        onValueChange={(itemValue) => setN(itemValue)}

                        items={[{ label: '6', value: 6 },
                        { label: '9', value: 9 }]}>
                    </Picker>
                </View>
                <View style={styles.settingsRow}>
                    <Text >Auto Calculate Probabilities</Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={calcProb ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setcalcProb(previousState => !previousState)}
                        value={calcProb}
                    />
                </View>
                <View style={[styles.settingsRow]}>
                    <Button title="Recalculate" onPress={() => CalculatePlayersWinProbWrapper()} />
                </View>
                <View style={[styles.settingsRow, { display: cardsInTable ? "block" : "none" }]}>
                    <Button color={deleteMode ? "red" : "green"} title={deleteMode ? "Delete Mode" : "Select Mode"} onPress={() => setDeleteMode(!deleteMode)} />
                </View>

            </ScrollView>
            </View>

        </LinearGradient>



    );
}



const styles = StyleSheet.create({
    optionscontainer: {
        position: 'absolute',
        right: "0.5%",
        height: "90%",
        width: "20%",
       
        backgroundColor: '#cb99c9',
        borderRadius: 5,

    },
    changeTableTypeModalStyle: {
        position: 'absolute',
        left: "45%",
        top: "40%",
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#89CFF0',
        width: "10%",

    },
    resetandcleanbtns: {
        flexDirection: 'column',

        right: "1%",
        borderRadius: 5,
        margin: 5,
        bottom: "3%",
        position: 'absolute',
        justifyContent: 'space-between',

    },
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",



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

    calcProbBtn: {
        position: 'absolute',
        bottom: 0,
        left: 0,

    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,



    },
    settingsCol: {
        flexDirection: 'column',

        padding: 5,



    },
    table: {
        position: 'absolute',
        backgroundColor: '#228B22',
        borderColor: '#8B4513',
        borderWidth: 5,
        borderRadius: 300,
        top: "30%",
        left: "20%",
        width: "60%",
        height: "50%",

        justifyContent: 'center',
        alignItems: 'center',
    },
    middlecards: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        top: "0%",
        marginBottom: "6%",

    }, closeButton: {

        margin: 5,
        height: 25,
        borderBlockColor: 'black',
        justifyContent: 'center',
        borderWidth: 1,
        width: 25,
    },
    closeButtonsettings: {

        top: 0,
        right: 0,
        position: 'relative',
        height: "90%",

        width: "90%",
    },

    deleteMode: {
        position: 'absolute',
        top: "25%",
        right: "2%",
        width: "fit-content",
        height: "fit-content",
        margin: 0,
        padding: 0,
        borderRadius: 5,


    },
    icons: {
        width: 30,
        height: 30,
    },
    player: {
        position: 'absolute',


        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
    },

  




  


   
    SettingsBtn: {
        width: 30,
        height: 30,
        right: 2,
        position: 'absolute',
    }

});


export default Table;