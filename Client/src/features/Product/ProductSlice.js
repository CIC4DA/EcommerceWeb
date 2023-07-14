import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsbyFilters,fetchAllCategory,fetchAllBrands,fetchProductbyId,createProduct,updateProduct } from './ProductAPI';

const initialState = {
  products: [],
  brands : [],
  category: [],
  totalItems : 0,
  selectedProduct : null,
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsbyFiltersAsync = createAsyncThunk(
  'product/fetchProductsbyFilters',
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductsbyFilters(filter,sort,pagination,admin);
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const fetchAllCategoryAsync = createAsyncThunk(
  'product/fetchAllCategory',
  async () => {
    const response = await fetchAllCategory();
    return response.data;
  }
);

export const fetchProductbyIdAsync = createAsyncThunk(
  'product/fetchProductbyId',
  async (id) => {
    const response = await fetchProductbyId(id);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState: initialState,

  reducers: {
    clearSelectedProduct : (state) => {
      state.selectedProduct = null;
    }    
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsbyFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsbyFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductbyIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductbyIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(item => item.id === action.payload.id);
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllbrands = (state) => state.product.brands;
export const selectAllcategory = (state) => state.product.category;
export const selectProductbyId = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status


export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
