import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';
import "./Room.css";

export const AddRoomForm = () => {
    const { addRoom, getRooms } = useContext(RoomContext)
    const { addImg } = useContext(UploadImgContext)
    const history = useHistory()
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const roomName = useRef();
    const imageLocation = useRef();
    const [selectedFile, setSelectedFile] = useState(null)

    const addNewUserRoom = (e) => {
        e.preventDefault()
        const newRoom = {
            userProfileId: userProfile.id,
            roomName: roomName.current.value,
            imageLocation: selectedFile.name
        }
        let newId;
        addRoom(newRoom)
            .then((addedRoom) => {
                newId = addedRoom.id
                addImg(selectedFile)
                return addedRoom
            })
        .then((room) => getRooms())
        .then(() => history.push(`/room/room/${newId}`))
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <section className="addRoomForm">
                <Card>
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