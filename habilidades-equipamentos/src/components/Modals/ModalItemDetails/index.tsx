import React, { useEffect, useState, useContext } from "react";
import { View, Modal, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import CloseIcon from '../../../assets/close_FILL0_wght400_GRAD0_opsz48.png'
import { getMagicItemDetails, getMagicItemDetailsResponse } from "../../../services/apiDnd";
import { CartContext } from "../../../context/CartContext";
import { Button } from "../../Button";
import { MagicItemListProps } from "../../MagicItem";

interface ModalItemDetailsProps {
	isModalVisible: boolean,
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
	index: string,
	cart?: boolean,
	preco?: number
}

export const ModalItemDetails = ({ isModalVisible, setIsModalVisible, index, cart, preco }: ModalItemDetailsProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [magicItem, setMagicItem] = useState<getMagicItemDetailsResponse>({
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
	const { addMagicItemToCart, removeMagicItemFromCart } = useContext(CartContext);

	useEffect(() => {
		writeMagicItemDetails(index)
	}, []);

	const precoModal = preco ? preco : Math.floor(Math.random() * 10000);
	let magicItemWithPrice: MagicItemListProps  = {
		index: magicItem.index,
		name: magicItem.name,
		url: magicItem.url,
		preco: precoModal
	};

	function writeMagicItemDetails(index: string) {
		getMagicItemDetails(index)
			.then(response => {
				setMagicItem(response.data);
				magicItemWithPrice
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function handleButton() {
		if (cart) {
			removeMagicItemFromCart(magicItem.index);
			setIsModalVisible(false);
		} else {
			addMagicItemToCart(magicItemWithPrice);
			setIsModalVisible(false);
		}
	}

	return <Modal
		animationType="slide"
		transparent={true}
		visible={isModalVisible}
		onRequestClose={() => {
			setIsModalVisible(false);
		}}
	>
		<View style={styles.modal}>
			<View style={styles.modalContainer}>
				{
					isLoading ?
						<ActivityIndicator
							size={"large"}
						/>
						:
						<>
							<ScrollView showsVerticalScrollIndicator={false}>
								<View style={styles.titleContainer}>
									<Text style={styles.title}>{magicItem.name}</Text>
									<TouchableOpacity onPress={() => setIsModalVisible(false)}>
										<Image source={CloseIcon} style={styles.closeIcon} />
									</TouchableOpacity>
								</View>
								<View style={styles.firstStatsContainer}>
									<View style={styles.firstStats}>
										<Text style={styles.textTitle}>Rarity: </Text>
										<Text style={styles.textTitle}>{magicItem.rarity.name}</Text>
									</View>
									<View style={styles.firstStats}>
										<Text style={styles.textTitle}>Type: </Text>
										<Text style={styles.textTitle}>{magicItem.equipment_category.name}</Text>
									</View>
									<View style={styles.firstStats}>
										<Text style={styles.textTitle}>Price: </Text>
										<Text style={styles.textTitle}>R${precoModal},00</Text>
									</View>
								</View>
								<View style={styles.descriptionContainer}>
									<Text style={styles.textTitle}>
										Descrição:
									</Text>
									<Text style={styles.text}>
										{magicItem.desc[1]}
									</Text>
									{magicItem.desc.length > 2 && magicItem.desc.map((description,index) => {
										if (index > 1)
											return <Text style={styles.text}>
												{description}
											</Text>
									})
									}
								</View>
							</ScrollView>
							<Button title={cart ? "Remover do carrinho" : "Adicionar ao Carrinho"} onPress={handleButton}/>
						</>
				}
			</View>
		</View>
	</Modal>
}