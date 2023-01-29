import { Box, Button, Modal, Typography, Dialog, SxProps, Theme, Slide, TextField, MenuItem } from "@mui/material"
import styled from '@emotion/styled'
import { Contestant, dbContestant, dbEvent, Event } from '../pages/index'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { addDoc, doc, increment, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { PlusOutlined } from "@ant-design/icons"
import React from 'react'
import { TransitionProps } from "@mui/material/transitions"
import { database } from "@/firebase/clientApp"
import { Event as FirebaseEventItem } from "../pages/index"
import { toast } from 'react-toastify'
import PhoneInput from 'react-phone-number-input/input'
import { E164Number } from "libphonenumber-js/types"
import PhoneNumber from "./PhoneNumber"

const ContBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: space-between;
height: auto;
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

export const InputText = styled(TextField)`
// height: 40px;
width: 100%;
// background-color: rgba(0,0,0,0);
border-radius: 20px;
// border: 1px solid #000;
margin-bottom: 10px;
// color: #000;
// padding-inline: 20px;
// font-size: 1rem;
// :active: {
//     border-width: 0;
// }
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
width: 100%;
`

const boxStyle: SxProps<Theme> = {
    width: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: '#000',
    borderRadius: '30px',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
}

interface IHandleComponent {
    eventItem: FirebaseEventItem;
    contestantItems: Contestant[];
    eventID: string;
}

const genderOptions = [
    {
        name: 'Choose a gender',
        value: ''
    },
    {
        name: 'Male',
        value: 'M'
    },
    {
        name: 'Female',
        value: 'F'
    }
]

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HandleComponent = ({ eventItem, contestantItems, eventID }: IHandleComponent) => {

    const { 
        name: currentEventName, 
        location: currentLocation,
        _firestoreID: firestoreID,
        ID: currentEvent
    } = eventItem;

    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false);

    const [enteredName, setEnteredName] = useState('')
    const [enteredLoc, setEnteredLoc] = useState('')

    const [ contestantName, setContestantName ] = useState('')
    const [ contestantAge, setContestantAge ] = useState<number>(18)
    const [ contestantGender, setContestantGender ] = useState('')
    const [ phoneNumber, setPhoneNumber ] = useState<any>()

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

        if (currentEventName?.length !== 0 || currentLocation?.length !== 0) {
            setEnteredName(currentEventName)
            setEnteredLoc(currentLocation)
        }

    }, [currentEventName, currentLocation])

    const updateEvent = async () => {

        const eventRef = doc(database, 'Event', eventID)

        const updatedItem = {
            ...eventItem,
            name: enteredName,
            location: enteredLoc
        }

        toast.promise(
            updateDoc(eventRef, updatedItem),
            {
                success: 'Event updated successfully!',
                error: 'An error has occured :/ Please try again.',
                pending: 'We are updating your data!'
            }
        )
        .then(() => {
            handleClose()
        })

    }

    const addParticipant = async () => {

        const eventNameCode = currentEventName.split(' ').slice(0, 2).map((item) => item[0]).join('')

        const contestantData: Contestant = {
            ID: `${eventNameCode}${eventItem.participantNumber}`,
            age: contestantAge,
            event_id: currentEvent,
            f_name: contestantName,
            gender: contestantGender,
            tel_no: phoneNumber,
        }

        // await addDoc(dbContestant, contestantData)

        const eventDocRef = doc(dbEvent, eventID)

        // await updateDoc(eventDocRef, {
        //     participantNumber: increment(1)
        // })

        toast.promise(
            Promise.all([
                addDoc(dbContestant, contestantData),
                updateDoc(eventDocRef, {
                    participantNumber: increment(1)
                })
            ]),
            {
                success: 'Participants updated successfully!',
                error: 'An error has occured :/ Please try again.',
                pending: 'We are adding a participant. Please wait...'
            }
        )
        .then(() => {
            setContestantName('')
            setContestantAge(18)
            setContestantGender('')
            setPhoneNumber('')
            return
        })
        .then(() => {

            handleCloseAdd()

        })

    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ flexGrow: 1 }}>
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
            {contestantItems.filter((item) => item.event_id === currentEvent).map((item) => (

                <ContBox key={item._firestoreID}>
                    <Row>
                        <Typography style={{ fontSize: '1.5rem' }}>{item.f_name}</Typography>
                        <Typography>{item.age} years old</Typography>
                    </Row>
                    <Row>
                        <Typography>{item.gender === 'M' ? 'Male' : 'Female'}</Typography>
                        <Typography>{item.tel_no}</Typography>
                    </Row>
                </ContBox>

            ))}
            <React.Fragment>
                <Dialog
                    TransitionComponent={Transition}
                    open={showModal}
                    onClose={() => handleClose()}
                >
                    <Box sx={boxStyle}>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 2 }}>Edit Event</Typography>
                        <InputText label='Event Name' type='text' value={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
                        <InputText label='Event Location' type='text' value={enteredLoc} onChange={(e) => setEnteredLoc(e.target.value)} />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '500px' }}>
                            <CancelBtn onClick={() => handleClose()}>
                                <Typography>Cancel</Typography>
                            </CancelBtn>
                            <ConfirmBtn onClick={updateEvent}>
                                <Typography>Confirm edit</Typography>
                            </ConfirmBtn>
                        </div>

                    </Box>
                </Dialog>
            </React.Fragment>
            <Dialog
                open={showAddModal}
                TransitionComponent={Transition}
                onClose={() => handleCloseAdd()}
            >
                <Box sx={boxStyle}>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 2 }}>Add Contestant</Typography>
                    <InputText type='text' label='Name' value={contestantName} onChange={e => setContestantName(e.target.value)} />
                    <InputText type='number' label='Age' value={contestantAge} onChange={e => setContestantAge(parseInt(e.target.value))} />
                    <InputText
                        select
                        value={contestantGender}
                        onChange={(e) => setContestantGender(e.target.value)}
                        label="Gender"
                        defaultValue=""
                    >
                        {genderOptions.map((option, key) => (
                            <MenuItem key={option.value} value={option.value} disabled={key === 0}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </InputText>
                    <PhoneInput 
                        defaultCountry='MY'
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        // @ts-ignore
                        inputComponent={PhoneNumber}
                    />
                    <ConfirmBtn onClick={addParticipant}>
                        <Typography>Add participant</Typography>
                    </ConfirmBtn>
                </Box>
            </Dialog>
        </>
    )

}

export default HandleComponent