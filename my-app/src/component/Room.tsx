import { useState } from "react"

interface Props {
    roomName :string
}

const Room: React.FC<Props> = ({roomName}) => {
    const [notificationCount, notificationSetCount] = useState(0)
    

  return (
    <div className="room">
        <h1>{roomName}</h1>
    </div>
  )
}

export default Room