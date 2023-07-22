import { useFetchAlbumsQuery, useCreateAlbumMutation } from "../store"
import Skeleton from "./Skeleton";
import Expandable from "./Expandable";
import Button from "./Button";

function Albums({user}){
    const {data, isLoading, error} = useFetchAlbumsQuery(user);
    const [createAlbum, result] = useCreateAlbumMutation();

    const onCreateAlbum = ()=>{
        createAlbum(user);
    }

    let content;
    if(isLoading){
        content = <Skeleton className="h-10 w-full" times={3}/>;
    } else if(error){
        content = <div>Error loading Albums..</div>
    } else {
        content = data.map((album)=>{
            const header = <div>{album.title}</div>;
            return (
                <Expandable key={album.id} header={header}>
                    Photos..
                </Expandable>
            );
        });
    }
    return (
        <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums for {user.name}</h3>
            <Button loading={result.isLoading} onClick={onCreateAlbum}>
                + Add Album
            </Button>
        </div>
        <div>{content}</div>
    </div>
    );
}
export default Albums