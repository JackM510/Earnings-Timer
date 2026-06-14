import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
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
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 16,
        paddingBottom: 0,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        padding: 16,
        borderRadius: '50%',
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