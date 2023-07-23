import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albums";
import { setupListeners } from "@reduxjs/toolkit/query";
import { photosApi } from "./apis/photos";

export const store = configureStore({
    reducer:
    {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(albumsApi.middleware)
        .concat(photosApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/createUser";
export * from "./thunks/removeUser";
export { useFetchAlbumsQuery, useCreateAlbumMutation,useRemoveAlbumMutation } from "./apis/albums";
export { useFetchPhotosQuery, useAddPhotoMutation ,useRemovePhotoMutation } from "./apis/photos";