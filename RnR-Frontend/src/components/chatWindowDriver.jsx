import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "../styles/chatWindow.css"
import Header2 from "./header2";
import Message from "./Message";
import axios from "axios";


const chatWindow = (own) => {
  const [messages, setMessages] = useState([]);
  const passengerId = localStorage.getItem("driverid");
  const token = localStorage.getItem("token");
  const [textm, settext] = useState('');
  const location = useLocation();
  const data = location.state;
  const { conversationId } = data;

    console.log(data);
    console.log(conversationId);
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
        settext('');
      })
      .catch((err) => {
        console.log(err);
      })
    };

  return (

    <div className='messenger'>
      <Header2/>

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

      

    </div>
  )
}

export default chatWindow
