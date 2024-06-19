import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import SkillCircle from "../../assets/PngItem_2901848.png";
import { skillProps } from "../../screens/Skills";
import { styles } from "./styles";

interface SkillButtonProps {
	item: skillProps;
	removeSkill:(id:string)=> void;
};

export const SkillButton = ({ item, removeSkill }: SkillButtonProps) => {
	const { id, name } = item;

	return <TouchableOpacity onPress={() => removeSkill(id)} style={styles.buttonSkill}>
		<Image source={SkillCircle} style={styles.image} />
		<Text style={styles.textSkill}>
			{ name }
		</Text>
	</TouchableOpacity>;
}