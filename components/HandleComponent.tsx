import { Box, Button, Modal, Typography } from "@mui/material"
import styled from '@emotion/styled'
import { Contestant } from '../pages/index'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Timestamp } from "firebase/firestore"
import { PlusOutlined } from "@ant-design/icons"

const ContBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
height: auto;
width: 50%;
border-radius: 30px;
background: rgba(255, 255, 255, 0.3);
-webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px);
padding: 20px;
color: #000;
margin-top: 10px;
:hover {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    cursor: pointer;
}
`

const EditBtn = styled(Box)`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
height: 30px;
width: auto;
border-radius: 30px;
background: rgba(255, 255, 255, 0.3);
-webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px);
padding: 20px;
color: #000;
margin-left: 10px;
:hover {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    cursor: pointer;
}
`

const Row = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InputText = styled.input`
height: 40px;
width: 500px;
background-color: rgba(0,0,0,0);
border-radius: 20px;
border: 1px solid #000;
margin-bottom: 10px;
color: #000;
padding-inline: 20px;
font-size: 1rem;
:active: {
    border-width: 0;
}
`

const ConfirmBtn = styled.div`
height: auto;
padding: 10px;
padding-inline: 20px;
background-color: rgba(12,71,166,0.9);
color: #fff;
border-radius: 30px;
:hover {
    cursor: pointer;
    background-color: rgba(12,71,166,1);
    color: #fff;
}
`

const CancelBtn = styled.div`
height: auto;
padding: 10px;
padding-inline: 20px;
color: #fff;
border-radius: 30px;
border: 1px solid #fff;
:hover {
    cursor: pointer;
    background: red;
}
`

const FormTitle = styled(Typography)`
font-size: 1rem;
font-weight: 500;
`

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#000',
    borderRadius: '30px',
    boxShadow: 24,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    height: 'auto',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    padding: '20px'
}

interface IHandleComponent {
    id: string;
    currentEventName: string;
    currentEvent: string;
    contestantArr: Contestant[];
    cGender: string;
    setCGender: Dispatch<SetStateAction<string>>;
    currentDate?: Timestamp;
    currentLocation: string;
}

const HandleComponent = ({ id, currentEventName, currentEvent, contestantArr, cGender, setCGender, currentDate, currentLocation }: IHandleComponent) => {

    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false);


    const [enteredName, setEnteredName] = useState('')
    const [enteredLoc, setEnteredLoc] = useState('')

    const handleOpen = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const handleOpenAdd = () => {
        setShowAddModal(true)
    }

    const handleCloseAdd = () => {
        setShowAddModal(false)
    }

    useEffect(() => {
        setEnteredName(currentEventName)
        setEnteredLoc(currentLocation)
    })

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
                <div>
                    <Typography style={{ fontSize: '2rem', fontWeight: 600 }}>{currentEventName}</Typography>
                    <Typography style={{ fontSize: '1.5rem', fontWeight: 500 }}>{currentLocation}</Typography>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <EditBtn onClick={() => handleOpen()}>
                        <Typography style={{  }}>Edit event</Typography>
                    </EditBtn>
                    <EditBtn onClick={() => handleOpenAdd()}>
                        <PlusOutlined />
                    </EditBtn>
                </div>
            </div>
            {contestantArr.map((e, key) => {
                if (e.event_id === currentEvent) {                    
                    // if (e.gender === 'M') setCGender("Male")
                    return (
                        <ContBox key={key}>
                            <Row>
                                <Typography style={{ fontSize: '1.5rem' }}>{e.f_name}</Typography>
                                <Typography>{e.age} years old</Typography>
                            </Row>
                            <Row>
                                <Typography>{cGender}</Typography>
                                <Typography>{e.tel_no}</Typography>
                            </Row>
                        </ContBox>
                    )
                }
            })}
            <Modal
                open={showModal}
                onClose={() => handleClose()}
            >
                <Box sx={boxStyle}>
                    <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>Edit Event</Typography>
                    <InputText type='text' placeholder={enteredName} />
                    <InputText type='text' placeholder={enteredLoc} />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '500px' }}>
                        <CancelBtn onClick={() => handleClose()}>
                            <Typography>Cancel</Typography>
                        </CancelBtn>
                        <ConfirmBtn>
                            <Typography>Confirm edit</Typography>
                        </ConfirmBtn>
                    </div>

                </Box>
            </Modal>
            <Modal
                open={showAddModal}
                onClose={() => handleCloseAdd()}
            >
                <Box sx={boxStyle}>
                    <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>Add Contestant</Typography>
                    <div>
                        <FormTitle>Name</FormTitle>
                        <InputText type='text' />
                    </div>
                    <div>
                        <FormTitle>Age</FormTitle>
                        <InputText type='number' />
                    </div>
                    <div>
                        <FormTitle>Gender</FormTitle>
                        <InputText type='text' />
                    </div>
                    <div>
                        <FormTitle>Phone number</FormTitle>
                        <InputText type='number' />
                    </div>
                    <ConfirmBtn>
                        <Typography>Add participant</Typography>
                    </ConfirmBtn>
                </Box>
            </Modal>
        </>
    )

}

export default HandleComponent