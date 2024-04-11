import { useState, createContext, useEffect, useContext } from "react";
import io from 'socket.io-client'
import {useSelector} from 'react-redux'

export const SocketContext=createContext()

export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    let authUser=useSelector(state=>state.user.userDetails)

    useEffect(()=>{
        if(authUser){
            const socket=io('http://localhost:3000');
            setSocket(socket)
            return ()=>{
                socket.close()
            }
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[])
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}