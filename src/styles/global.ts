import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 300,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        gap: 16
    },
    heading: {
        color: '#000',
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 4,
    },
    text: {
        color: '#000',
        fontSize: 18,
    },
    input: {
        paddingTop: 16,
        paddingBottom: 0,
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',  
    },
    button: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: '50%',
        marginTop: 20,
        alignItems: 'center',
    },
    bgGray: {
        backgroundColor: 'darkgray',
    },
    bgBlue: {
        backgroundColor: 'royalblue',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});