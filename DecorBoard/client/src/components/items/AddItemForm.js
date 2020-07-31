import React, { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ItemContext } from '../../providers/ItemProvider';
import { UploadImgContext } from '../../providers/UploadImgProvider';
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap';
import "./Item.css";

export const AddItemForm = () => {
    const { addItem, getItems } = useContext(ItemContext)
    const { addImg } = useContext(UploadImgContext)
    const history = useHistory()
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const itemName = useRef()
    const imageLocation = useRef()
    const itemPrice = useRef()
    const [selectedFile, setSelectedFile] = useState(null)

    const addNewUserItem = (e) => {
        e.preventDefault()
        const newItem = {
            userProfileId: userProfile.id,
            itemName: itemName.current.value,
            imageLocation: selectedFile.name
        }
        let newId;
        addItem(newItem)
            .then((addedItem) => {
                newId = addedItem.id
                addImg(selectedFile)
                return addedItem
            })
        .then((item) => getItems())
        .then(() => history.push(`/item/item/${newId}`))
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    return (
        <>
            <section className="itemForm">
                <Card>
                    <CardBody>
                        <Form onSubmit={addNewUserItem}>
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
                            <Button>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </section>
        </>
    )
}