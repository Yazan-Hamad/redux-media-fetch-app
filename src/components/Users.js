import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function Users(){
    const dispatch = useDispatch();
    const {isLoading, data, error} = useSelector((state)=>{
        return state.users;
    });
    useEffect(()=>{
        dispatch(fetchUsers());
    },[dispatch]);

    const addUser = ()=>{
        dispatch(createUser());
    }

    if (isLoading){
        return <Skeleton times={6} className="h-10 w-full"/>
    }
    if (error){
        return <div>Error..</div>
    }

    const renderedUsers = data.map((user)=>{
        return (
                
        <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                {user.name}
            </div>
        </div>
        );
    });

    return (
        <div>
            <div className="flex flex-row justify-between">
                    <h1 className="m-2 text-xl">Users</h1>
                    <Button onClick={addUser}>
                        + Add User
                    </Button>
                </div>
        {renderedUsers}
        </div>
        );
}

export default Users;