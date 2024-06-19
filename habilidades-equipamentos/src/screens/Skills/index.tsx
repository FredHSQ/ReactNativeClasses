import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { SkillButton } from "../../components/SkillButton";
import { Button } from "../../components/Button";

export interface skillProps {
	name: string,
	id: string
}

export const Skills = () => {
	const [newSkill, setNewSkill] = useState<string>('')
	const [greetings, setGreetings] = useState<string>('');
	const [skills, setSkills] = useState<skillProps[]>([]);

	function addNewSkill () {
		const data: skillProps = {
			name: newSkill,
			id: String(new Date().getTime())
		}
		setSkills(oldState => [...oldState, data])
	}

	function removeSkill(id: string) {
		setSkills(oldState=>oldState.filter(
			skill => skill.id !== id
		))
	}

	useEffect(() => {
		const currentHour = new Date().getHours();
		if (currentHour < 12) {
			setGreetings('GoodMorning')
		} else if (currentHour >= 12 && currentHour < 18) {
			setGreetings('Good Afternoon')
		} else {
			setGreetings('Good Evening')
		}
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bem vindo, Fred</Text>
			<Text style={styles.greetings}>
				{greetings}
			</Text>
			<TextInput
				style={styles.input}
				onChangeText={setNewSkill}
				placeholderTextColor='#555'
				placeholder="New Skill"
			/>

			<Button title={'Add new skill'} onPress={addNewSkill} />

			<FlatList
				data={skills}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return <SkillButton removeSkill={removeSkill} item={item} />
				}}
			/>
		</View>
	)
};