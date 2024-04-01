import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (selectedProduct) => ({
        url: '/orders',
        method: 'POST',
        body: selectedProduct, // Assuming selectedProduct contains the necessary data for creating an order
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      providesTags: ['Order'],
    }),
    // Add other endpoints as needed for your application
  }),
});
