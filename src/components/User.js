import {GoTrash} from "react-icons/go";
import Button from "./Button";
import useThunk from "../hooks/useThunk";
import { removeUser } from "../store";
function User({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const onRemoveUser = () =>{
        doRemoveUser(user);
    }
  return (
    <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <Button className="mr-3" loading={isLoading} onClick={onRemoveUser} >
                    <GoTrash/>
                </Button>
                
                {error && <div>Error Deleting User..</div>}
              {user.name}
            </div>
            </div>
    </div>
  );
}

export default User;
