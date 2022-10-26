import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { styles } from './styles'

import { MagicItem } from '../../components/MagicItem';
import { buscaMagicItens } from '../../services/api';
import { ModalStats } from '../../components/Modais/ModalStats';
import { RootTabParamList } from '../../routes';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface magicItemStats {
    index: string,
    name: string,
    equipment_category: {
        index: string,
        name: string,
        url: string
    },
    rarity: {
        name: string,
    },
    variants: magicItemList[],
    variant: boolean,
    desc: string[],
    url: string,
}

export interface magicItemList {
    index: string,
    name: string,
    url: string,
    preco?: string
}

type Props = NativeStackScreenProps<RootTabParamList, 'Shop'>;

export function Shop({ route, navigation }: Props) {

    const [magicItemList, setMagicItemList] = useState<magicItemList[]>([]);
    const [indexMagicItem, setIndexMagicItem] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [modalStats, setModalStats] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        buscaMagicItens().then((res) => {
            setMagicItemList(res.data.results);
        }).catch(() => {
            console.log("Erro")
        }).finally(() => setLoading(false));
    }, []);

    return (
        <View style={
            styles.container
        }>
            <Text style={styles.title}>
                Magic Shop
            </Text>
            {loading ?
                <ActivityIndicator size={"large"} color={"#fff"}/>
                :
                <FlatList
                    data={magicItemList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(data) => data.index}
                    renderItem={({ item, index }) => (
                        <MagicItem setIndexMagicItem={setIndexMagicItem} item={item} setModal={setModalStats} />
                    )
                    }
                />
            }
            {modalStats && <ModalStats shop={true} index={indexMagicItem} modal={modalStats} setModal={setModalStats}/>}

        </View>
    )
}