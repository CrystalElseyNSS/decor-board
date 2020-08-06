import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ItemContext } from '../../providers/ItemProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { CategoryContext } from '../../providers/CategoryProvider';
import { RoomContext } from '../../providers/RoomProvider';
import { Button, Form, FormGroup, Input, Card, CardBody, Select } from 'reactstrap';
import "./Item.css";

export const EditItemForm = () => {
    const { updateItem, getItemsByRoom, getItemById } = useContext(ItemContext)
    const { addImg } = useContext(UploadImgContext)
    const { currentRoomView, getRoomById } = useContext(RoomContext)
    const { categories, getCategories, getCategoryById } = useContext(CategoryContext)
    const history = useHistory()
    const itemName = useRef()
    const itemUrl = useRef()
    const imageLocation = useRef()
    const itemPrice = useRef()
    const category = useRef()
    const [selectedFile, setSelectedFile] = useState(null)
    const [roomId, setRoomId] = useState(0)
    const { id } = useParams()
    const intId = parseInt(id)
    const [item, setItem] = useState({})
    const [currentCategory, setCategory] = useState(0)

    console.log(currentRoomView.id)

    useEffect(() => {
        if (currentRoomView.id !== 0) {
            getCategories()
            getRoomById(currentRoomView.id)
            setRoomId(currentRoomView.id)
            getItemsByRoom(currentRoomView.id)
        } else {
            getCategories()
            setRoomId(0)
            getItemsByRoom(0)
        }
        getItemById(intId)
        .then(setItem)
        // eslint-disable-next-line  
    }, [])

    useEffect(() => {
        if (item.hasOwnProperty("itemName")) {
            getCategoryById(item.categoryId)
                .then((cat) => setCategory(cat.id))
        }
    }, [item])
    

    const editItem = (e) => {
        if (currentRoomView.id !== 0) {
            e.preventDefault()
            updateItem({
                id: id,
                roomId: roomId,
                categoryId: parseInt(currentCategory),
                itemName: itemName.current.value,
                imageLocation: selectedFile.name,
                itemPrice: itemPrice.current.value,
                itemUrl: itemUrl.current.value
            })
                .then(addImg(selectedFile))
                .then(() => history.push(`/room/room/${roomId}`))
        } else {
            e.preventDefault()
            updateItem({
                id: id,
                roomId: 0,
                categoryId: parseInt(currentCategory),
                itemName: itemName.current.value,
                imageLocation: selectedFile.name,
                itemPrice: itemPrice.current.value,
                itemUrl: itemUrl.current.value
            })
            .then(addImg(selectedFile))
            .then(() => history.push(`/stockRoom`))
        }
    }
    
    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }
    
    const handleChange = (evt) => {
        setCategory(evt.target.value)
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
                                    defaultValue={item.itemName}
                                    placeholder="Enter Item Description"
                                    innerRef={itemName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="file"
                                    defaultValue={item.imageLocation}
                                    innerRef={imageLocation}
                                    onChange={onFileChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    defaultValue={item.itemPrice}
                                    placeholder="Price"
                                    innerRef={itemPrice}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    required
                                    type="text"
                                    defaultValue={item.itemUrl}
                                    placeholder="Purchase Link"
                                    innerRef={itemUrl}
                                />
                            </FormGroup>
                            <FormGroup className="form--field">
                                <Input
                                    required
                                    type="select" 
                                    value={currentCategory}
                                    ref={category}
                                    onChange={handleChange}
                                >
                                    <option key="0" value="0">Select a Category</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.categoryName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </section>
        </>
    )
}