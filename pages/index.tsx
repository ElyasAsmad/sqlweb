import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import styled from '@emotion/styled'
import Navbar from '@/components/Navbar'
import { Typography, Box, Button } from '@mui/material'
import { app, database } from '../firebase/clientApp'
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import handledb from './api/handledb'
import { eventNames } from 'process'

const DisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: auto;
    justify-content: center;
    margin-top: 200px;
`

interface SelectedBtn {
    selected: boolean;
}

const EventBox = styled(Button)<SelectedBtn>`
color: ${props => props.selected ? '#000' : 'rgb(255,255,255, 1)'};
background: ${props => props.selected ? 'rgb(255,255,255, 0.7)' : 'rgb(255,255,255, 0.2)'};
backdrop-filter: ${props => props.selected ? 'blur(10px)' : ''};
-webkit-backdrop-filter: ${props => props.selected ? 'blur(10px)' : ''};
padding: 0;
width: 200px;
height: 80px;
margin-bottom: 10px;
display: flex;
justify-content: center;
align-items: center;
text-transform: none;
padding: 5px;
border-radius: 50px;
&:hover {
    color: #000;
    background: rgb(255,255,255, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}
`

const InBoxRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const InBoxTypo = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 500;
`

const EventContainer = styled.div`
color: #fff;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const EventDetailsContainer = styled.div`
color: #fff;
display: flex;
flex-direction: column;
width: 100%;
margin-left: 100px;
`

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

const Row = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

const dbEvent = collection(database, 'Event')
const dbOrganization = collection(database, 'Organization')
const dbContestant = collection(database, 'Contestant')

interface Event {
    ID: string
    date: Timestamp
    location: string
    name: string
    org_id: string
    total_contestant: number
}

interface Organization {
	ID: string
	email: string
	name: string
	tel_no: number
}

interface Contestant {
	ID: string
	age: number
	event_id: string
	f_name: string
	gender: string
	tel_no: number
}

interface Res {
    currentEventName: string
    currentEventLocation: string
    currentEventDate: Timestamp
    currentEventOrgId: string
    currentEventOrgName: string
}

export default function Home() {

    const [eventArr, setEventArr] = useState<Event[]>([])
	const [orgArr, setOrgArr] = useState<Organization[]>([])
	const [contestantArr, setContestantArr] = useState<Contestant[]>([])
    const [mainState, setMainState] = useState(true)
    const [currentEvent, setCurrentEvent] = useState('')

    const [currentEventName, setCurrentEventName] = useState('')
    const [currentEventLocation, setCurrentEventLocation] = useState('')
    const [currentEventDate, setCurrentEventDate] = useState<Timestamp>()
    const [currentEventOrgId, setCurrentEventOrgId] = useState('')
    const [currentEventOrgName, setCurrentEventOrgName] = useState('')

    const [cGender, setCGender] = useState("Female")

	const router = useRouter()

    const HandleComponent = (id: string) => {

        return (
            <>
                <Typography style={{ fontSize: '2rem', fontWeight: 600 }}>{currentEventName}</Typography>
                {contestantArr.map((e, key) => {
                    if(e.event_id === currentEvent) {
                        
                        if(e.gender === 'M') setCGender("Male")

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
            </>
        )

    }

    const getDbEvent = () => {
        getDocs(dbEvent).then((data) => {
            
			const DataEvent = data.docs.map((item) => {
                return { ...item.data() } as Event
            })

			setEventArr(DataEvent)

        })

		getDocs(dbOrganization).then((data) => {
			const DataOrg = data.docs.map((item) => {
				return { ...item.data() } as Organization
			})

			setOrgArr(DataOrg)
		})
	
		getDocs(dbContestant).then((data) => {

			const DataContestant = data.docs.map((item) => {
				return { ...item.data() } as Contestant
			})
			
			setContestantArr(DataContestant)
		})
	
    }

    const handleOnClick = (id: string) => {
        // BABI BUG
        if(currentEvent !== null) {
            setCurrentEvent(id)
        }
        handledb(currentEvent)
    }

    useEffect(() => {
        getDbEvent()
        
    }, [])

    return (
        <>
            <Head>
                <title>Sqlweb</title>
                <meta name="description" content="Oracle Sql web" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.mainContainer}>
                <Navbar />
                <DisplayContainer>
                    <EventContainer>
                        {eventArr.map((item, key) => {						  
                            return (
                                <EventBox key={key} onClick={() => {
                                    handleOnClick(item.ID)
                                }} selected={currentEvent === item.ID ? true : false}>
                                    <InBoxRow>
                                        <InBoxTypo style={{ fontWeight: 500, fontSize: '1rem' }}>{item.name}</InBoxTypo>
                                    </InBoxRow>
                                </EventBox>
                            )
                        })}
                    </EventContainer>
                    <EventDetailsContainer>
                        {HandleComponent(currentEvent)}
                    </EventDetailsContainer>
                </DisplayContainer>
            </main>
        </>
    )
}
