import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerMenu from '../components/DrawerMenu';
import LoadingApp from '../components/Loading';
import api from "../services/api";
import Lista from "./Lista";

export default function Home() {

    const [character, setCharacter] = useState([]);
    const [page, setPage] = useState(null);
    const [submitPage, setSubmitPage] = useState('1');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await api.get(`/character?page=${submitPage}`)
                .then(async (current) => {
                    setCharacter(await current.data);
                    setLoading(false)
                })
                .catch((err) => {
                    Alert.alert(
                        'Página não encontrada',
                        `${err}`
                    )
                    setLoading(false)
                    return;
                })
        })()
    }, [submitPage])

    function search() {
        if (page >= 1 && page <= 42) {
            setSubmitPage(page)
            setPage("");
            Keyboard.dismiss();
        } else {
            Alert.alert(
                'Página não encontrada',
                'Digite uma página de 1 a 42.',
            )
            setPage("")
            return;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {character.length == 0
                ?
                <LoadingApp />
                :

                <SafeAreaView style={styles.container}>

                    <DrawerMenu />

                    <Text style={styles.tittle}>Lista de Personagens</Text>

                    <View style={styles.viewSearch}>
                        <TextInput
                            placeholder='Página'
                            style={styles.pageInput}
                            keyboardType="numeric"
                            value={page}
                            onChangeText={(text) => setPage(text)}
                            maxLength={2}
                        />
                        <TouchableOpacity onPress={search} style={styles.buttonSearch}>
                            <FontAwesome name="search" size={30} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textPag}>Página {submitPage} de 42</Text>

                    {loading ?
                        <ActivityIndicator size={50} color={'#000'} style={styles.loading} />
                        :
                        <FlatList
                            style={styles.flatList}
                            data={character.results}
                            renderItem={({ item }) => <Lista data={item} screen={'lista'} />}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                        />
                    }

                </SafeAreaView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#32CD32',
    },
    tittle: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 8,
        paddingLeft: 10,
    },
    viewSearch: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        paddingHorizontal: 10,
        borderTopWidth: 3,
        borderBottomWidth: 3,
    },
    pageInput: {
        fontSize: 18,
        flex: 1,
    },
    buttonSearch: {
        paddingHorizontal: 10
    },
    textPag: {
        margin: 3,
        width: 115,
        textAlign: 'center',
        borderRadius: 3,
        fontWeight: 'bold',
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    flatList: {
        backgroundColor: '#32CD32',
    }
})