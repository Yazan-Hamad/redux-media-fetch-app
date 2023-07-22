import { GoTrash } from "react-icons/go";
import Button from "./Button";
import useThunk from "../hooks/useThunk";
import { removeUser } from "../store";
import Expandable from "./Expandable";
import { Fragment } from "react";
import Albums from "./Albums";

function User({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);
  const onRemoveUser = () => {
    doRemoveUser(user);
  };
  const header = (
    <Fragment>
      <Button className="mr-3" loading={isLoading} onClick={onRemoveUser}>
        <GoTrash />
      </Button>
      {error && <div>Error Deleting User..</div>}
      {user.name}
    </Fragment>
  );
  return (
  <Expandable header={header}>
    <Albums user={user} />
  </Expandable>);
}

export default User;
