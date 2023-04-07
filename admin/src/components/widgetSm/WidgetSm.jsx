import { useState ,useEffect} from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {userRequest} from "../../requestMethods"

export default function WidgetSm() {
  const [users,setUsers]=useState([])

useEffect(()=>{
const getUsers= async()=>{
try{
  const res = await userRequest.get("users/?nwe=true")
  setUsers(res)
} catch(err){
  setUsers('At this time connection is not established')
}}
getUsers();
},[]);
return (
  <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.data?.map((user) => 
        (       
          <li className="widgetSmListItem" key={user._id}>
     
          <img
            src={user.img||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        )
        
        )}
      </ul>
    </div>
  );
}
