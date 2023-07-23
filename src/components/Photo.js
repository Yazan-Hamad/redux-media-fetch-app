import { GoTrash } from "react-icons/go";
import Expandable from "./Expandable";
import Button from "./Button";
import { useRemovePhotoMutation } from "../store";


function Photo({photo}){
    const [removePhoto] = useRemovePhotoMutation();
    const onDeletePhoto = ()=>{
        removePhoto(photo)
    };
            return (
                <div onClick={onDeletePhoto} className="relative m-2 cursor-pointer">
                    <img className="h-20 w-20" src={photo.url} alt="random picture"/>
                    <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
                        <GoTrash className="text-3xl" />
                    </div>
                </div>
            );
}
export default Photo