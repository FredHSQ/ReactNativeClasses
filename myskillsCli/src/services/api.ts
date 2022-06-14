import axios from "axios";

const apiMagicItens = axios.create({
    baseURL: 'https://www.dnd5eapi.co/api/',
});

export const buscaMagicItens = () => {

    const url = `magic-items/`;

    return apiMagicItens.get(url);
};

export const buscaMagicItensComIndex = (index: string) => {

    const url = `magic-items/${index}`;

    return apiMagicItens.get(url);
};