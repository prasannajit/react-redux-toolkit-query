import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
const albumsApi = createApi({
    reducerPath:'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints: (builder)=>{
        return {
            addAlbum: builder.mutation({
                //invalidatesTags: ['Album'],
                invalidatesTags: (result,error,user)=>{
                    return [{type: 'Album', id: user.id}];
                },
                query:(user)=>{
                    return{
                        url: '/albums',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        },
                        method: 'POST'
                    }
                }
            }),
            fetchAlbums: builder.query({
                //providesTags: ['Album'],
                providesTags: (result,error,user)=>{
                    return [{type: 'Album', id: user.id}];
                },
                query: (user)=>{
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    };
                }
            })
        }
    }
});

export const {useFetchAlbumsQuery, useAddAlbumMutation} = albumsApi;
export {albumsApi};