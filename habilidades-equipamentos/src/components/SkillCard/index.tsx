import React from 'react';
import { TouchableOpacity,TouchableOpacityProps, Text, Image } from 'react-native';
import { styles } from './styles';

import SkillCircle from "../../assets/images/PngItem_2901848.png"

interface SkillCardProps extends TouchableOpacityProps {
    skill: string;
}

export function SkillCard( {skill, ...rest} : SkillCardProps ) {
    return (
        <TouchableOpacity 
            style={styles.buttonSkill}
            {...rest}
        >
            <Image source={SkillCircle} style={styles.image}/>
            <Text style={styles.textSkill}>
                {skill}
            </Text>
        </TouchableOpacity>
    )
}