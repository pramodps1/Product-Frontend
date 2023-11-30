import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './product.css';

// Action types
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

// Action creators
const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

const editProduct = (productId, updatedProduct) => ({
  type: EDIT_PRODUCT,
  payload: { productId, updatedProduct },
});

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

// Reducer
const initialState = { products: [] };

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId ? action.payload.updatedProduct : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };

    default:
      return state;
  }
};

// Create Redux store
const store = createStore(productReducer);

// Product component
const Product = ({ product, editProduct, deleteProduct }) => {
  const handleEdit = () => {
    // Implement edit functionality
  };

  const handleDelete = () => {
    // Implement delete functionality
  };

  return (
    <tr>
      <td>{product.description}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.isOnSpecial ? 'Yes' : 'No'}</td>
      <td>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

// ProductList component
const ProductList = ({ products, categoryFilter }) => {
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  return (
    <table id="productTable">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Special</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product, index) => (
          <Product key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

// App component
const App = ({ products, addProduct, editProduct, deleteProduct }) => {
  const [newProduct, setNewProduct] = useState({
    description: '',
    canExpire: false,
    expiryDate: null,
    category: '',
    price: 0,
    isOnSpecial: false,
  });

  const handleAddProduct = () => {
    // Generate a unique ID for the new product (you can use a library like uuid)
    const newProductId = Date.now().toString();
    const productToAdd = { ...newProduct, id: newProductId };
    
    // Dispatch the addProduct action to update the Redux store
    addProduct(productToAdd);

    // Clear the form after adding a new product
    setNewProduct({
      description: '',
      canExpire: false,
      expiryDate: null,
      category: '',
      price: 0,
      isOnSpecial: false,
    });
  };

  const handleCategoryFilter = (category) => {
    // Implement category filter functionality
  };

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>Category Filter: </label>
        <select onChange={(e) => handleCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="vegetables">Vegetables</option>
          <option value="meat">Meat</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>
      <h2>Add New Product</h2>
      <form>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </div>

          <div>
            <label>Can Expire:</label>
            <input
              type="checkbox"
              checked={newProduct.canExpire}
              onChange={() => setNewProduct({ ...newProduct, canExpire: !newProduct.canExpire })}
            />
          </div>

          <div>
            <label>Expiry Date:</label>
            <input
              type="date"
              value={newProduct.expiryDate}
              onChange={(e) => setNewProduct({ ...newProduct, expiryDate: e.target.value })}
            />
          </div>

          <div>
            <label>Category:</label>
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </div>

          <div>
            <label>On Special:</label>
            <input
              type="checkbox"
              checked={newProduct.isOnSpecial}
              onChange={() => setNewProduct({ ...newProduct, isOnSpecial: !newProduct.isOnSpecial })}
            />
          </div>

          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </form>
      <br/>
      <ProductList products={products} />
    </div>
  );
};

// Connect components to Redux store
const ConnectedProductList = connect((state) => ({ products: state.products }))(ProductList);
const ConnectedApp = connect((state) => ({ products: state.products }), {
  addProduct,
  editProduct,
  deleteProduct,
})(App);

// Render the app
const ReduxApp = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default ReduxApp;
