import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ItemContext } from '../../providers/ItemProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { RoomContext } from '../../providers/RoomProvider';
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';
import "./Item.css";

export const EditItemForm = () => {
    const { updateItem, getItemsByRoom } = useContext(ItemContext)
    const { addImg } = useContext(UploadImgContext)
    const { currentRoomView, getRoomById } = useContext(RoomContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const history = useHistory()
    const itemName = useRef()
    const itemUrl = useRef()
    const imageLocation = useRef()
    const itemPrice = useRef()
    const category = useRef()
    const [selectedFile, setSelectedFile] = useState(null)
    const [roomId, setRoomId] = useState(0)

    const { id } = useParams()
    useEffect(() => {
        getRoomById(currentRoomView.id)
        setRoomId(currentRoomView.id)
        getCategories()
        getItemsByRoom(currentRoomView.id)
        // eslint-disable-next-line   
    }, [])

    const editItem = (e) => {
        e.preventDefault()
        updateItem({
            id: id,
            roomId: roomId,
            categoryId: parseInt(category.current.value),
            itemName: itemName.current.value,
            imageLocation: selectedFile.name,
            itemPrice: itemPrice.current.value,
            itemUrl: itemUrl.current.value
        })
        .then(addImg(selectedFile))
        .then(() => history.push(`/room/room/${roomId}`))
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <section className="itemForm">
                <Card>
                    <CardBody>
                        <Form onSubmit={editItem}>
                            <FormGroup>
                                <Input
                                    autoFocus
                                    required
                                    type="text"
                                    placeholder="Enter Item Description"
                                    innerRef={itemName}
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
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    placeholder="Price"
                                    innerRef={itemPrice}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    placeholder="Purchase Link"
                                    innerRef={itemUrl}
                                />
                            </FormGroup>
                            <FormGroup className="form--field">
                                <select
                                    required
                                    defaultValue=""
                                    ref={category}
                                >
                                    <option>Select a Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.categoryName}</option>
                                    ))}
                                </select>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </section>
        </>
    )
}