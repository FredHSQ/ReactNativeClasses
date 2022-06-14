import Realm from 'realm';

const Cart = {
  name: 'Cart',
  primaryKey: 'index',
  properties: {
    index: 'string',
    name: 'string',
    url: 'string',
    preco: 'string',
  },
};

let realm = new Realm({
  schema: [Cart],
});

let consultaCart = () => {
  return realm.objects('Cart');
};

let adiconaItemCart = (
  index: string,
  name: string,
  url: string,
  preco: string
) => {

  realm.write(() => {
    realm.create('Cart', {
      index: index,
      name: name,
      url: url,
      preco: preco
    });
  });
};

let deleteItemCart = (index: string) => {
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey('Cart', index));
  });
};

export {
  deleteItemCart,
  adiconaItemCart,
  consultaCart,
};


