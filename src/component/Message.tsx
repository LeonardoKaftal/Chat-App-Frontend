interface MessageProps {
    sender : string,
    content: string,
    username: string
}


const Message: React.FC<MessageProps> = ({sender, content, username}) => {
    const messageClassName = username === sender ? "your-message" : "others-message" 
    return (
        <div className="message-container">
            <div className={"message " + messageClassName}>
                <div className="message-sender"><h3 style={{color: "white"}}>{sender}</h3></div>
                <div className="message-content"><p style={{color: "white", marginTop: "5px", fontSize: "20px"}}>{content}</p></div>
            </div>
        </div>
    )
}

export default Message