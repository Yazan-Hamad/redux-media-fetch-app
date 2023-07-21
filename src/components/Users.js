import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, createUser } from "../store";
import useThunk from "../hooks/useThunk";
import Skeleton from "./Skeleton";
import Button from "./Button";

function Users() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] =
    useThunk(createUser);
  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const addUser = () => doCreateUser();

  let content;


  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else
  if (loadingUsersError) {
    content = <div>Error..</div>;
  } else {
    content = data.map((user) => {
        return (
          <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
              {user.name}
            </div>
          </div>
        );
      });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={addUser}>
          + Add User
        </Button>
        {creatingUserError && "Error Creating User"}
      </div>
      {content}
    </div>
  );
}

export default Users;
