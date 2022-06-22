import React, { createContext, useState, FC, useEffect } from 'react';

import { magicItemList } from '../../pages/Shop';

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

export const CartProvider: FC<ICardContext> = ({ children }) => {
    const [magicItemList, setMagicItemList] = useState<magicItemList[]>([]);
    const [precoTotal, setPrecoTotal] =useState<number>(0);

    useEffect(()=>{
        let soma = 0;
        magicItemList.map((magicItem: magicItemList)=>{
            soma = soma + Number(magicItem.preco)
        });
        setPrecoTotal(soma);
    },[magicItemList]);

    const addMagicItem = (magicItem:magicItemList) => {
        setMagicItemList([...magicItemList, magicItem]);
    };
    
    const removeMagicItem = (index: string) => {
        setMagicItemList(magicItemList.filter((magicItemList: magicItemList)=> {
            return magicItemList.index !== index
        }));
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