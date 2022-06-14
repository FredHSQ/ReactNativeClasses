import React, { useState } from "react";
import { View, Text, TouchableOpacityProps, Touchable, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

import CloseIcon from "../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png";
import { deleteItemCart } from "../../contexts/realm";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { magicItemList } from "../../pages/Shop";


interface MagicItemProps extends TouchableOpacityProps {
    item: magicItemList,
    setModal: (value: React.SetStateAction<boolean>) => void,
    setIndexMagicItem: (value: React.SetStateAction<string>) => void,
    setPreco?: (value: React.SetStateAction<number>) => void,
    cart?: boolean

}

export const MagicItem = ({ item, setModal, setIndexMagicItem, setPreco, cart, ...rest }: MagicItemProps) => {

    var removeMagicItem = useContext(CartContext).removeMagicItem;

    function handleOpenModal() {
        setIndexMagicItem(item.index);
        setPreco && setPreco(Number(item.preco))
        setModal(true);
    }

    return <TouchableOpacity style={styles.buttonMagicItem} onPress={() => handleOpenModal()} {...rest}>
        <Text style={styles.textMagicItem}>
            {item.name}
        </Text>
        {cart &&
            <TouchableOpacity onPress={()=> removeMagicItem(item.index)}>
                <Image style={styles.closeIcon} source={CloseIcon} />
            </TouchableOpacity>
        }
    </TouchableOpacity>
}