import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albums";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer:
    {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(albumsApi.middleware);
    }
});

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/createUser";
export * from "./thunks/removeUser";
export { useFetchAlbumsQuery, useCreateAlbumMutation } from "./apis/albums";