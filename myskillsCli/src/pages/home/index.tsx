import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
} from 'react-native';
import { styles } from './styles'

import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';


interface SkillData {
    id: string;
    name: string;
}

export function Home() {
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greetings, setGreetings] = useState('');

    function handleAddNewSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill (id: string){
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ))
    }

    useEffect(()=>{
        const currentHour = new Date().getHours();
        if (currentHour < 12){
            setGreetings('GoodMorning')
        } else if(currentHour >= 12 && currentHour < 18){
            setGreetings('Good Afternoon')
        } else {
            setGreetings('Good Evening')
        }
    },[])

    return (
        <View style={
            styles.container
        }>
            <Text style={styles.title}>
                Welcome, Fred
            </Text>
            <Text style={styles.greetings}>
                {greetings}
            </Text>
            
            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
            />

            <Button title={'Add'} onPress={handleAddNewSkill} />
        
            <Text style={[styles.title, { marginVertical: 20 }]}>
                My skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({item})=>(
                    <SkillCard 
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
            />

        </View>
    )
}