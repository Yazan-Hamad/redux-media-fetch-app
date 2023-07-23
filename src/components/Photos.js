import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Skeleton from "./Skeleton";
import Button from "./Button";
import Photo from "./Photo";
import Panel from "./Panel";

function Photos({album}){
    const {data, isFetching, error} = useFetchPhotosQuery(album);
    const [addPhoto, result] = useAddPhotoMutation();

    const onAddPhoto = ()=>{
        addPhoto(album);
    }

    let content;
    if(isFetching){
        content = <Skeleton className="h-8 w-8" times={4}/>;
    } else if(error){
        content = <div>Error loading Photos..</div>
    } else {
        content = data.map((photo)=>{
            return (
                <Photo photo={photo} key={photo.id}/>
            );
        });
    }
    return (
        <Panel>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos in {album.title}</h3>
            <Button loading={result.isLoading} onClick={onAddPhoto}>
                + Add Photo
            </Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap items-center justify-center">{content}</div>
    </Panel>
    );
}
export default Photos