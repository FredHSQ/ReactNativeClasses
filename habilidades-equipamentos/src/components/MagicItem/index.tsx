import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

export interface MagicItemListProps {
	index: string;
	name: string;
	url: string;
	preco?: number;
}

export interface MagicItemProps {
	item: MagicItemListProps,
	setSelectedIndex: React.Dispatch<React.SetStateAction<string>>,
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setPreco?: React.Dispatch<React.SetStateAction<number>>,
}

export const MagicItem = ({ item, setSelectedIndex, setIsModalVisible, setPreco}: MagicItemProps) => {

	function abrirModal () {
		setSelectedIndex(item.index);
		setPreco && setPreco(item.preco);
		setIsModalVisible(true);
	}

	return <TouchableOpacity onPress={abrirModal} style={styles.buttonMagicItem}>
		<Text style={styles.textMagicItem}>
			{ item.name }
		</Text>
	</TouchableOpacity>
}