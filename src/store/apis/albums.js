import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
const albumsApi = createApi({
    reducerPath:"albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005"
    }),
    endpoints(builder){
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album)=>{
                    return[{type:"album",id:album.id}];
                },
                query: (album)=>{
                    return{
                        url: `/albums/${album.id}`,
                        method: "DELETE"
                    }
                }
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user)=>{
                    const tags = result.map((album)=>{
                        return { type:'album', id:album.id };
                    });
                    tags.push({type: 'UsersAlbums', id: user.id});
                    return tags;
                },
                query: (user)=>{
                    return{
                        url: "/albums",
                        params: {
                            userId: user.id
                        },
                        method: "GET"
                    }
                }
            }),
            createAlbum: builder.mutation({
                invalidatesTags: (result, error, user)=>{
                    return[{type:"UsersAlbums",id:user.id}];
                },
                query: (user)=>{
                    return{
                        url: "/albums",
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        },
                        method: "POST"
                    }
                }
            }),
        }
    }
});

export const { useFetchAlbumsQuery, useCreateAlbumMutation, useRemoveAlbumMutation }  = albumsApi;
export {albumsApi};