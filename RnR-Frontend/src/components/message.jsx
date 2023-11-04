import "../styles/message.css"

export default function message({message, own}) {
  return (
    <div className={own ? "message own" : "message"} >
    <div className="messageTop">
      <img className='messageImg' src="https://images.pexels.com/photos/376729/pexels-photo-376729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="driver" />
      <p className='messageText'>
        {message.text}
        </p>
    </div>
    <div className="messageBottom">
      one hour ago
    </div>
  </div>
  )
}
