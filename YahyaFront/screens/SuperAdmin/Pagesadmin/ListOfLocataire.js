import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native'
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import * as Animatable from 'react-native-animatable'
import { Animations } from '../../../constants/Animations';
import OffreService from '../../../services/offreService';
import LocataireService from '../../../services/locataireService';
import Icon, { Icons } from '../../../constants/Icons';
const { width, height } = Dimensions.get("window");
export default function ListOfLocataires({ navigation }) {
    const lienimage = '../../../images/'
    const [isRefreshing, setIsRefreshing] = useState(false);
    const viewRef = useRef(null);
    const locataireService = new LocataireService()
    const [appels, setAppels] = useState([])
    const [locataires, setLocataires] = useState([])
    const [test, setTest] = useState(false);
    const animation = Animations[Math.floor(Math.random() * Animations.length)]
    const ItemSeparator = () => <View style={styles.separator} />

    const renderItem = ({ item, index }) => (
        <ContactItem item={item} index={index} animation={animation} />)

    useEffect(() => {
        GetAllLocataires()
    }, []);
    const GetAllLocataires = () => {
        return new Promise((resolve, reject) => {
            locataireService.GetAllLocataires()
                .then((res) => {
                    setLocataires(res.data);

                    resolve(); // Résoudre la promesse
                })
                .catch((err) => {

                });
        });
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        GetAllLocataires()
            .then(() => setIsRefreshing(false))
            .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
    };

    const ContactItem = ({ item: { id_locataire, nom_locataire, prenom_locataire }, index, animation }) => {
        const handlePress = async (id_locataire) => {
            navigation.navigate('DetailsLocataire', { id_locataire })
        };

        return (

            <Animatable.View
                animation={animation}
                duration={1000}
                delay={index * 300}
            >

                <TouchableOpacity style={styles.item}
                    onPress={() => handlePress(id_locataire)}

                >

                    <View style={styles.avatar}>

                        <Image
                            source={require(lienimage + 'salah.jpg')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.name}>{nom_locataire} {prenom_locataire}</Text>
                        <Text style={styles.role}>مستاجر</Text>
                    </View>

                </TouchableOpacity>

            </Animatable.View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{
                height: height * 0.07,
                backgroundColor: Colors.primary
            }}>
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    alignItems: "center",

                }}>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                        onPress={() => navigation.navigate('AddNewLocataire')}
                    >
                        <Text style={{ marginRight: 10, color: Colors.white, fontSize: 20 }}>إضافة مستاجر جديد</Text>
                        <Icons.AntDesign name='pluscircle' size={30} color={Colors.white} />
                    </TouchableOpacity>


                </View>

            </View>
            <View style={{
                height: height * 0.07,
                backgroundColor: Colors.primary,
                borderBottomColor: Colors.primary,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30
            }}>
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    alignItems: "center",

                }}>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                        onPress={() => onRefresh()}
                    >
                        <Text style={{ marginRight: 10, color: Colors.white, fontSize: 20 }}>تحديث</Text>
                        <Icons.FontAwesome name='refresh' size={30} color={Colors.white} />
                    </TouchableOpacity>


                </View>

            </View>
            <View style={[Styles.container]}>
                <Animatable.View
                    ref={viewRef}
                    easing={'ease-in-out'}
                    duration={500}
                >
                    <FlatList
                        data={locataires}
                        keyExtractor={(_, i) => String(i)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={ItemSeparator}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}
                            />
                        }
                    />
                </Animatable.View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,

        alignItems: 'center',
        justifyContent: 'center',
    },
    letter: {
        color: 'white',
        fontWeight: 'bold',
    },
    details: {
        margin: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    role: {
        fontSize: 14,
        color: Colors.darkGray,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.black,
    },
    listEmpty: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
})
