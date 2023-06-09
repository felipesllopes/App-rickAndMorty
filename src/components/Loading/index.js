import { Image, StyleSheet, View } from "react-native";

export default function LoadingApp() {
    return (
        <View style={styles.container}>

            <Image source={require('../../img/rickandmorty.png')}
                style={styles.img}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tittle: {
        width: 320,
        height: 100,
        marginBottom: 50,
    },
    img: {
        height: 413,
        width: 345,
    },
})