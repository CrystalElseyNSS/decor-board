import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RoomContext } from '../../providers/RoomProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { Button, Form, FormGroup, Input, Card, CardBody, CardHeader } from 'reactstrap';
import "./Room.css";

export const EditRoomForm = () => {
    const { currentRoomView, updateRoom, getRoomById } = useContext(RoomContext)
    const { addImg } = useContext(UploadImgContext)
    const history = useHistory()
    const roomName = useRef();
    const imageLocation = useRef();
    const [selectedFile, setSelectedFile] = useState(null)
    const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
    
    const { id } = useParams()
    useEffect(() => {
        getRoomById(id)
        // eslint-disable-next-line   
    }, [])

    const editRoom = (e) => {
        e.preventDefault()
        updateRoom({
            id: currentRoomView.id,
            userProfileId: currentUser.id,
            roomName: roomName.current.value,
            imageLocation: selectedFile.name
        })
        addImg(selectedFile)
        .then(() => history.push(`/room/room/${id}`))
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

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
                                    placeholder="New Room Name"
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