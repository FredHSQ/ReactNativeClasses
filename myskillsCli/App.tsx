import React from 'react';
import { StatusBar } from 'react-native';

import { CartProvider } from './src/contexts/CartContext';
import { Routes } from './src/routes';

const App = () => {

  return (
    <CartProvider>
      <StatusBar
      hidden={false}
      translucent={true}
      backgroundColor={"#121015"}
      barStyle={'light-content'}
      />
      <Routes />
    </CartProvider>
  );
};

export default App;
