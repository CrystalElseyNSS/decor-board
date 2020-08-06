// React imports:
import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Card, CardBody, CardHeader } from 'reactstrap';
// Component imports:
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
// Design import:
import "./Room.css";

export const EditRoomForm = () => {
    const { currentRoomView, updateRoom, getRoomById } = useContext(RoomContext)
    const { addImg } = useContext(UploadImgContext)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))    
    const history = useHistory()
    const roomName = useRef();
    const imageLocation = useRef();
    const { id } = useParams()
    // Sets state on user-uploaded image file to render onFileChange() and capture for database:
    const [selectedFile, setSelectedFile] = useState(null)
    
    // On page load, sets state on room variable to display defaultValue in edit field:
    const [room, setRoom] = useState({})
    useEffect(() => {
        setRoom(currentRoomView)
        // eslint-disable-next-line  
    }, [])

    // editRoom function that executes on form submit: 
    const editRoom = (e) => {
        e.preventDefault()
        updateRoom({
            id: currentRoomView.id,
            userProfileId: currentUser.id,
            roomName: roomName.current.value,
            imageLocation: selectedFile.name
        })
        // Adds image to database and returns to newly updated Room board:
        addImg(selectedFile)
        .then(() => history.push(`/room/room/${id}`))
    }

    // Sets state of the selectedFile variable to the user-selected image file:
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    // Renders JSX for the EditRoomForm:
    return (
        <>
            <section className="editRoomForm">
                <Card>
                    <CardHeader>Edit {currentRoomView.roomName} Board:</CardHeader>
                    <CardBody>
                        <Form onSubmit={editRoom}>
                            <FormGroup>
                                <Input
                                    autoFocus
                                    type="text"
                                    defaultValue={room.roomName}
                                    innerRef={roomName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="file"
                                    placeholder="Upload an image"
                                    innerRef={imageLocation}
                                    onChange={onFileChange}
                                />
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </section>
        </>
    )
}