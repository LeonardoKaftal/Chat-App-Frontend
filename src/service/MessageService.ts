import axios from "axios";

interface Message {
    Payload: string
    DestinationRoom: string
    SenderName : string
};

export const saveMessage = async (token: string, message: Message) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };


    return await axios.post(`http://localhost:8080/api/v1/messages`, message, config);
};

export const getAllMessagesFromARoom = async (token: string, roomName: string) => {
    try {
        console.log("Getting all the data for room " + roomName)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        const response = await axios.get(`http://localhost:8080/api/v1/messages/${roomName}`, config);

        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }
    } catch (err) {
        console.error("Impossible to fetch the previous messages, probably the room is new or it does not exist: " + err);
    }
};

