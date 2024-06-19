import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabRoutes } from './BottomTabNavigator';

export const Routes = () => {
	return <NavigationContainer>
			<BottomTabRoutes />
	</NavigationContainer>
}