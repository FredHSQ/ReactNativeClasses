import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { magicItemList } from '../../pages/Shop';

interface ConxtextProps {
    children: React.ReactNode
}

export interface ICardContext {
    magicItemList?: magicItemList[],
    addMagicItem: (magicItem: magicItemList) => void,
    removeMagicItem: (index: string) => void,
    precoTotal: number,
};

export const CartContext = createContext<ICardContext>({
    magicItemList: [{
        index: "",
        name: "",
        url: "",
    }],
    addMagicItem: (magicItem: magicItemList) => { },
    removeMagicItem: (index: string) => { },
    precoTotal: 0,
});

// ver tipo children
export const CartProvider = ( { children }  : ConxtextProps) => {
    const [magicItemList, setMagicItemList] = useState<magicItemList[]>([]);
    const [precoTotal, setPrecoTotal] = useState<number>(0);

    const storeData = async (value: magicItemList[]) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }
    
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key')
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
      }

    useEffect(() => {
        getData().then((res)=>{
            setMagicItemList(res? res : []);
        })
    },[])

    useEffect(() => {
        let soma = 0;
        magicItemList[0] && magicItemList.map((magicItem: magicItemList) => {
            soma = soma + Number(magicItem.preco)
        });
        setPrecoTotal(soma);
    }, [magicItemList]);

    const addMagicItem = (magicItem: magicItemList) => {
        setMagicItemList([...magicItemList, magicItem]);
        storeData([...magicItemList, magicItem])
    };

    const removeMagicItem = (index: string) => {
        let newMagicItemList =  magicItemList.filter((magicItemList: magicItemList) => {
            return magicItemList.index !== index
        })
        setMagicItemList(newMagicItemList);
        storeData(newMagicItemList);
    };

    return (
        <CartContext.Provider
            value={{
                magicItemList,
                addMagicItem,
                removeMagicItem,
                precoTotal
            }}>
            {children}
        </CartContext.Provider>
    );
};