import React from "react";
import { Routes } from "./src/routes";
import { CartProvider } from "./src/context/CartContext";
import { StatusBar } from "expo-status-bar";

const App = () => {
	return (
		<CartProvider>
			<StatusBar
				hidden={false}
				translucent={true}
				style={"light"}
			/>
			<Routes />
		</CartProvider>
	)
};

export default App;