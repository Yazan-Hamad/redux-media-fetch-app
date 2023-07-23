import { GoTrash } from "react-icons/go";
import Expandable from "./Expandable";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import { Fragment } from "react";
import Photos from "./Photos";

function Album({album}){
    const [removeAlbum, result] = useRemoveAlbumMutation();
    const onDeleteAlbum = ()=>{
        removeAlbum(album)
    };
    const header = <Fragment>
        <Button loading={result.isLoading} onClick={onDeleteAlbum} className="mr-3">
        <GoTrash />
        </Button>
        {album.title}
        </Fragment>;
            return (
                <Expandable key={album.id} header={header}>
                    <Photos album={album}/>
                </Expandable>
            );
}
export default Album