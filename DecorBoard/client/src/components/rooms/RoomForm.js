import React, { useRef, useContext } from 'react';
import { RoomContext } from '../../providers/RoomProvider';
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';
import "./Room.css";

export const RoomForm = () => {
    const { addRoom } = useContext(RoomContext)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const roomName = useRef();
    const imageLocation = useRef();

    const addNewUserRoom = (e) => {
        e.preventDefault()
        const newRoom = {
            userProfileId: userProfile.id,
            roomName: roomName.current.value,
            imageLocation: imageLocation.current.value
        }
        addRoom(newRoom)
    }

    return (
        <>
            <section className="roomForm">
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
                                    type="text"
                                    placeholder="Enter your Image Location"
                                    innerRef={imageLocation}
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