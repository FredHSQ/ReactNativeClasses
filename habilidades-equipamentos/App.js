import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { CartProvider } from './src/contexts/CartContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <CartProvider>
      <StatusBar
      hidden={false}
      translucent={true}
      style={'light'}
      />
      <Routes />
    </CartProvider>
  );
}