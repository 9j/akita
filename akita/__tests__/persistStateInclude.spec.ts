import { EntityStore } from '../src/entityStore';
import { persistState } from '../src/persistState';
import { Store } from '../src/store';
import { StoreConfig } from '../src/storeConfig';

@StoreConfig({
  name: 'todos'
})
class TodosStore extends EntityStore<any, any> {
  constructor() {
    super();
  }
}

@StoreConfig({
  name: 'products'
})
class ProductsStore extends EntityStore<any, any> {
  constructor() {
    super();
  }
}

@StoreConfig({
  name: 'cart'
})
class CartStore extends EntityStore<any, any> {
  constructor() {
    super();
  }
}

@StoreConfig({
  name: 'auth'
})
class AuthStore extends Store<any> {
  constructor() {
    super({});
  }
}

describe('persistState - Include', () => {
  const storage = persistState({
    include: ['todos']
  });

  afterAll(() => storage.destroy());

  const todos = new TodosStore();
  const products = new ProductsStore();
  const cart = new CartStore();
  const auth = new AuthStore();

  it('should start with initial state', () => {
    expect(JSON.parse(localStorage.getItem('AkitaStores'))).toEqual(null);
  });

  it('should NOT save if not in include', () => {
    products.add([{ id: 1 }]);
    cart.add([{ id: 1 }]);
    expect(JSON.parse(localStorage.getItem('AkitaStores'))).toEqual(null);
  });

  it('should save if in include', () => {
    todos.add([{ id: 1 }]);
    expect(JSON.parse(localStorage.getItem('AkitaStores'))).toEqual({
      todos: {
        entities: {
          '1': {
            id: 1
          }
        },
        error: null,
        ids: [1],
        loading: false
      }
    });
  });
});
