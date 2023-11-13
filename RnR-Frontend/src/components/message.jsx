import "../styles/message.css"
import pic from "../assets/user.png"
export default function message({message, own}) {
  return (
    <div className={own ? "message own" : "message"} >
    <div className="messageTop">
      <img className='messageImg' src={pic} alt="driver" />
      <p className='messageText'>
        {message.text}
        </p>
    </div>
    {/* <div className="messageBottom">
      one hour ago
    </div> */}
  </div>
  )
}
