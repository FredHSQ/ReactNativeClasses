import { Image } from 'react-native';
import { Shop } from '../../screens/Shop';
import { Skills } from '../../screens/Skills';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SkillIcon from '../../assets/fact_check_FILL0_wght400_GRAD0_opsz48.png';
import ShopIcon from '../../assets/storefront_FILL0_wght400_GRAD0_opsz48.png';
import CartIcon from '../../assets/shopping_cart_FILL0_wght400_GRAD0_opsz48.png';
import { Cart } from '../../screens/Cart';

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
	Skills: {};
	Shop: {};
	Cart: { id: string };
}

export function BottomTabRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: { backgroundColor: '#000', paddingBottom: 2 },
				tabBarInactiveTintColor: '#aaa',
				tabBarActiveTintColor: '#fff'
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={SkillIcon}
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="Skills"
				component={Skills}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={ShopIcon}
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="Shop"
				component={Shop}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color }) => (
						<Image
							resizeMode='contain'
							source={CartIcon}
							style={{ tintColor: color, width: 30 }}
						/>
					)
				}}
				name="Cart"
				component={Cart}
			/>
		</Tab.Navigator>
	);
}