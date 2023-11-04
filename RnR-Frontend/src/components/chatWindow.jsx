import { useEffect, useState } from 'react';

import "../styles/chatWindow.css"
import Header2 from "./header2";
import Message from "./message";
import axios from "axios";


const chatWindow = (own) => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const passengerId = localStorage.getItem("passengerid");
  const rideId = localStorage.getItem("rideid");
  const token = localStorage.getItem("token");
  const [textm, settext] = useState('');
  useEffect(() => {
    axios.post(`http://localhost:4000/chatWindow/${rideId}`,null,{
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const convId = response.data.conversationId;
        
        

        setConversationId(convId);
        console.log(conversationId);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[]);

  useEffect(() => {
    
    axios.get(`http://localhost:4000/messages/${conversationId}`,{
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const msg = response.data;
        setMessages(msg);
        console.log(messages);
      })
      .catch((error)=>{
        console.log(error);
      })
  });
  const handleSend = (e) => {
    const data = {
      conversationId,
      passengerId,
      textm
    };

    axios
      .post(`http://localhost:4000/messages/${conversationId}`, data)
      .then(() => {
        
        
        
      })
      .catch((err) => {
        console.log(err);
      })
    };

  return (

    

    <div className='messenger'>
      <Header2/>
      
      <div className="chat-left">
      {conversationId} 

      </div>
      <div className="chat-box">
      <div className="chat-box-wrapper">
        {messages.map((m)=>(
          <Message message = {m} own={m.sender === passengerId}/>
        ))}
      
      </div>
      
      <div className="chat-box-bottom">
        <input
         value={textm}
         onChange={(e) => settext(e.target.value)}
                 
        className="chat-input" type="text" placeholder="Type a message..." />
        <button onClick={handleSend} className='chat-send-button'>Send</button>

      </div>
      </div>
      

      <div className="chat-right">
      box 

      </div>
      

    </div>
  )
}

export default chatWindow
