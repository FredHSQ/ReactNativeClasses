import React, { useState, useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';

import { MagicItem } from '../../components/MagicItem';
import { ModalStats } from '../../components/Modais/ModalStats';
import { CartContext } from '../../contexts/CartContext';

export const Cart = () => {

    var magicItemList = useContext(CartContext).magicItemList;
    var precoTotal = useContext(CartContext).precoTotal;

    const [indexMagicItem, setIndexMagicItem] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [preco, setPreco] = useState<number>(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho</Text>
            <FlatList
                data={magicItemList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.index}
                renderItem={({ item, index }) => (
                    <MagicItem cart={true} setPreco={setPreco} setIndexMagicItem={setIndexMagicItem} item={item} setModal={setModal} />
                )
                }
            />
            <View style={styles.containerPreco} >
                <Text style={styles.title}>
                    Preço Total:
                </Text>
                <Text style={styles.title}>
                    R$ {precoTotal},00
                </Text>
            </View>
            {modal && <ModalStats preco={preco} shop={false} modal={modal} setModal={setModal} index={indexMagicItem} />}
        </View>
    )
}