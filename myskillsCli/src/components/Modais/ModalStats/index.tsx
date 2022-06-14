import React, { useState, useEffect, useContext } from "react";
import { View, Modal, Text, ModalProps, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from './styles'

import { magicItemList, magicItemStats } from "../../../pages/Shop";
import { buscaMagicItensComIndex } from "../../../services/api";
import { Button } from "../../Button";
import { CartContext } from "../../../contexts/CartContext";

import CloseIcon from "../../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.png"

interface modalProps extends ModalProps {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    index: string,
    shop: boolean,
    preco?: number
}

export const ModalStats = ({ modal, setModal, index, shop, preco, ...rest }: modalProps) => {
    
    const addMagicItem = useContext(CartContext).addMagicItem;
    const removeMagicItem = useContext(CartContext).removeMagicItem;

    const [stats, setStats] = useState<magicItemStats>({
        index: "",
        name: "",
        equipment_category: {
            index: "",
            name: "",
            url: ""
        },
        rarity: {
            name: "",
        },
        variants: [{
            index: "",
            name: "",
            url: "",
        }],
        variant: false,
        desc: [""],
        url: "",
    });
    const [loading, setLoading] = useState<boolean>(true);

    const precoModal = preco ? preco : Math.floor(Math.random() * 10000);
    const magicItem: magicItemList = {
        index: stats.index,
        name: stats.name,
        url: stats.url,
        preco: precoModal.toString(),
    };

    useEffect(() => {
        setLoading(true);
        buscaMagicItensComIndex(index).then((res) => {
            setStats(res.data);
        }).catch((error) => {
            console.log("Erro " + error)
        }).finally(() => setLoading(false));
    }, [index])

    function handleButton() {
        if (shop) {
            addMagicItem(magicItem);
            setModal(false);
        } else {
            removeMagicItem(stats.index);
            setModal(false);
        }
    }

    return <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
            setModal(!modal);
        }}
        {...rest}
    >
        <View style={styles.modal}>
            <View style={styles.modalContainer}>
                {loading ? <Text style={styles.text}>
                    Carregando...
                </Text>
                    :
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.titleContainer} >
                                <Text style={styles.title}>
                                    {stats.name}
                                </Text>
                                <TouchableOpacity style={{ alignContent: "flex-end", width: "10%" }} onPress={() => setModal(false)}>
                                    <Image style={styles.closeIcon} source={CloseIcon} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.firstStatsContainer}>
                                <View style={styles.firstStats}>
                                    <Text style={styles.textTitle}>
                                        Rarity:
                                    </Text>
                                    <Text style={styles.text}>
                                        {stats.rarity.name}
                                    </Text>
                                </View>
                                <View style={styles.firstStats}>
                                    <Text style={styles.textTitle}>
                                        Type:
                                    </Text>
                                    <Text style={styles.text}>
                                        {stats.desc[0]}
                                    </Text>
                                </View>
                                <View style={styles.firstStats}>
                                    <Text style={styles.textTitle}>
                                        Price:
                                    </Text>
                                    <Text style={styles.text}>
                                        R$ {precoModal},00
                                    </Text>
                                </View>

                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.textTitle}>
                                    Description:
                                </Text>
                                <Text style={styles.text}>
                                    {stats.desc[1]}
                                </Text>
                            </View>
                            {stats.desc[2] && <View style={styles.descriptionContainer}>
                                <Text style={styles.textTitle}>
                                    Aditional Information:
                                </Text>
                                <Text style={styles.text}>
                                    {stats.desc.map((text, index) => {
                                        if (index > 1)
                                            return text + " "
                                    }
                                    )}
                                </Text>
                            </View>
                            }
                        </ScrollView>
                        <Button title={shop ? "Comprar" : "Deletar"} onPress={() => handleButton()} />
                    </>
                }
            </View>
        </View>
    </Modal>
}