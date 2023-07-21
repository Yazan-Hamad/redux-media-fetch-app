import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function Users(){
    const dispatch = useDispatch();
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [loadingUsersError, setloadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(null);
    const {data} = useSelector((state)=>{
        return state.users;
    });
    useEffect(()=>{
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
        .unwrap()
        .catch( err => setloadingUsersError(err))
        .finally(() => setIsLoadingUsers(false));
    },[dispatch]);

    const addUser = ()=>{
        setIsCreatingUser(true);
        dispatch(createUser())
        .unwrap()
        .catch( err => setCreatingUserError(err))
        .finally(() => setIsCreatingUser(false));
    }

    if (isLoadingUsers){
        return <Skeleton times={6} className="h-10 w-full"/>
    }
    if (loadingUsersError){
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
                    {
                        isCreatingUser
                        ? "Creating User .."
                        :   <Button onClick={addUser}>
                                + Add User
                            </Button>
                    }
                    {
                        creatingUserError && "Error Creating User"
                    }
                </div>
        {renderedUsers}
        </div>
        );
}

export default Users;