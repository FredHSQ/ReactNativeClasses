import React, { useContext, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { CartContext } from "../../context/CartContext";
import { MagicItem } from "../../components/MagicItem";
import { ModalItemDetails } from "../../components/Modals/ModalItemDetails";

export const Cart = () => {
	const { magicItemList, precoTotal } = useContext(CartContext);

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<string>('');
	const [preco, setPreco] = useState<number>(0);

	return <View style={styles.container}>
		<Text style={styles.title}> Carrinho </Text>
		<FlatList
			data={magicItemList}
			showsHorizontalScrollIndicator={false}
			keyExtractor={(data)=> data.index}
			renderItem={({item})=>(
				<MagicItem setPreco={setPreco} item={item} setIsModalVisible={setIsModalVisible} setSelectedIndex={setSelectedIndex}/>
			)}
		/>
		<View style={styles.containerPreco}>
			<Text style={styles.title}>
				Price:
			</Text>
			<Text style={styles.title}>
				R$ {precoTotal}.00
			</Text>
		</View>
		{isModalVisible && <ModalItemDetails preco={preco} cart={true} index={selectedIndex} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />}
	</View>
}