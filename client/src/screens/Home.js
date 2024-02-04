import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../context/socketprovider'
import { useNavigate } from "react-router-dom";


export const Home = () => {   

    const [email, setemail] = useState("");
    const [room, setroom] = useState("");
  
    const socket = useSocket();
    const navigate = useNavigate();
  
    const handleSubmitForm = useCallback(
      (e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
      },
      [email, room, socket]
    );
  
    const handleJoinRoom = useCallback(
      (data) => {
        console.log('hey')
        const { email, room } = data;
        console.log(email ,room)
        navigate(`/room/${room}`);
        console.log('why not navigate')
      },
      [navigate]
    );

    
  
    useEffect(() => {
      
      console.log('you are in useeffect')
      socket.on("room:join", handleJoinRoom);
      console.log('yess')
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }, [socket, handleJoinRoom]);
  
            

  return (
    <>   
      <div className='flex flex-col gap-y-10'>
         
         <form onSubmit={handleSubmitForm}>
            <div> 
            <label htmlFor='emailid'> Email </label> 
            <input
            type='email'
            placeholder='abc@gmail.com'
            id='emailid'
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            /> 
            </div>

            <div> 
            <label htmlFor='room'> Enter Room ID  </label> 
            <input
            type='number'
            id='room'
            value={room}
            onChange={(e)=>setroom(e.target.value)}
            /> 
            </div>

            <div> 
            <button 
            //call fuction
            > 
            Join Room 
            </button>
            </div>

         </form>
         

      </div>
    </>
  )
}
