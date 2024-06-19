import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
	priority?: 'primary' | 'secondary';
	title: string;
}

export const Button = ({ priority='primary', title, ...rest }: ButtonProps) => {
	return <TouchableOpacity
		{...rest}
		style={priority === 'primary' ? styles.button : styles.button2}
	>
		<Text style={styles.buttonText}>{ title }</Text>
	</TouchableOpacity>
}