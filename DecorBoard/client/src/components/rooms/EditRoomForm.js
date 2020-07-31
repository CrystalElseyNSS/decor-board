import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';
import "./Room.css";

export const EditRoomForm = () => {
    const { updateRoom, getRooms } = useContext(RoomContext)
    const { addImg } = useContext(UploadImgContext)
    const history = useHistory()
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const roomName = useRef();
    const imageLocation = useRef();
    const [selectedFile, setSelectedFile] = useState(null)

    const editRoom = (e) => {
        e.preventDefault()
        const selectedRoom = {
            userProfileId: userProfile.id,
            roomName: roomName.current.value,
            imageLocation: selectedFile.name
        }
        let newId;
        updateRoom(selectedRoom)
            .then((editedRoom) => {
                newId = editedRoom.id
                addImg(selectedFile)
                return editedRoom
            })
        .then((room) => getRooms())
        .then(() => history.push(`/room/room/${newId}`))
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <section className="editRoomForm">
                <Card>
                    <CardBody>
                        <Form onSubmit={editRoom}>
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