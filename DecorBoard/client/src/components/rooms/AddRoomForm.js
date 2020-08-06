// React imports:
import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Card, CardBody, CardHeader } from 'reactstrap';
// Component imports:
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
// Design import:
import "./Room.css";

export const AddRoomForm = () => {

    const { addRoom, getRooms } = useContext(RoomContext)
    const { addImg } = useContext(UploadImgContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const history = useHistory()
    const roomName = useRef();
    const imageLocation = useRef();
    // Sets state on user-uploaded image file to render onFileChange() and capture for database: 
    const [selectedFile, setSelectedFile] = useState(null)

    // addRoom function that executes on form submit: 
    const addNewUserRoom = (e) => {
        e.preventDefault()
        const newRoom = {
            userProfileId: userProfile.id,
            roomName: roomName.current.value,
            imageLocation: selectedFile.name
        }
        // Captures id of newRoom object and adds image to database:
        let newId;
        addRoom(newRoom)
            .then((addedRoom) => {
                newId = addedRoom.id
                addImg(selectedFile)
                return addedRoom
            })
        // Waits for returned "room" object resp from provider, gets/sets updated room data, returns to newly added Room board:
        .then((room) => getRooms())
        .then(() => history.push(`/room/room/${newId}`))
    }

    // Sets state of the selectedFile variable to the user-selected image file:
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    // Renders JSX for the AddRoomForm:
    return (
        <>
            <section className="addRoomForm">
                <Card>
                    <CardHeader>Design a Room Board:</CardHeader>
                    <CardBody>
                        <Form onSubmit={addNewUserRoom}>
                            <FormGroup>
                                <Input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="Enter the Name of the Room"
                                    innerRef={roomName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
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