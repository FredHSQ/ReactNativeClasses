import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
        flex:1,
        backgroundColor: '#121015',
        paddingTop: 60,
        paddingHorizontal: 30
    },
	 title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
	greetings: {
		color: '#fff'
	},
	input: {
        backgroundColor:'#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginTop: 30,
        borderRadius: 7
    },
});