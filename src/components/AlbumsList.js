import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {
  const {data, isLoading, error}=useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = ()=>{
    addAlbum(user);
  };
  let content;
  if(isLoading){
    content = <Skeleton times={5}/>
  } else if(error){
    content = <div>Error Loading Panels</div>
  } else if(data){
    content = data.map((album)=>{
      const header = album.title;
      return <ExpandablePanel key={album.id} header={header}>
        List of Photos in the album
      </ExpandablePanel>
    });
  }
  return (<>
    <div>Albums for {user.name}</div>
    <Button onClick={handleAddAlbum}>+Add Album</Button>
    <div>{content}</div>
  </>);
}

export default AlbumsList;
