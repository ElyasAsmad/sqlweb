import { useEffect, useState, Suspense } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import styled from '@emotion/styled'
import Navbar from '@/components/Navbar'
import { Typography, Box, Button, Container } from '@mui/material'
import { app, database } from '../firebase/clientApp'
import { collection, addDoc, getDocs, Timestamp, onSnapshot } from 'firebase/firestore'
import { Router, useRouter } from 'next/router'
import { eventNames } from 'process'
import HandleComponent from '@/components/HandleComponent'
import HomeLoading from '@/components/HomeLoading'
import { ToastContainer } from 'react-toastify'

export const DisplayContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    height: auto;
    justify-content: center;
    margin-top: 120px;
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
    font-size: 1.2rem;
    font-weight: 600;
`

export const EventContainer = styled.div`
color: #fff;
display: flex;
flex-direction: column;
justify-content: space-between;
`

export const EventDetailsContainer = styled.div`
color: #fff;
display: flex;
flex-direction: column;
width: 100%;
margin-left: 100px;
`

export const dbEvent = collection(database, 'Event')
const dbOrganization = collection(database, 'Organization')
export const dbContestant = collection(database, 'Contestant')

export interface Event {
    _firestoreID: string;
    ID: string;
    date?: Timestamp;
    location: string;
    name: string;
    org_id: string;
    total_contestant: number;
    participantNumber: number;
}

export interface Organization {
	ID: string
	email: string
	name: string
	tel_no: number
}

export interface Contestant {
	_firestoreID?: string;
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

type EventMap = {
    [id: string]: Event;
}

export default function Home() {

	const [orgArr, setOrgArr] = useState<Organization[]>([])
	const [contestantArr, setContestantArr] = useState<Contestant[]>([])

	const [eventMap, setEventMap] = useState<EventMap>({})

    const [ eventLoading, setEventLoading ] = useState(true)
    
    const [currentFirestoreID, setCurrentFirestoreID] = useState('')

	const router = useRouter()

    const getDbEvent = () => {

		getDocs(dbOrganization).then((data) => {
			const DataOrg = data.docs.map((item) => {
				return { ...item.data() } as Organization
			})

			setOrgArr(DataOrg)
		})
	
    }

    const onClickHandler = (id: string) => {
        setCurrentFirestoreID(id)
    }

    useEffect(() => {
        getDbEvent()

        const eventUnsubscribe = onSnapshot(dbEvent, (snapshot) => {

            setEventLoading(true)

            let eventMap: EventMap = {};

            snapshot.forEach((doc) => {
                eventMap[doc.id] = doc.data() as Event
            })

            setEventMap(eventMap)

            setEventLoading(false)

        });

        const contestantsUnsubscribe = onSnapshot(dbContestant, (snapshot) => {
            
            const items: Contestant[] = []

            snapshot.forEach((doc) => {
                items.push({ ...doc.data() as Contestant, _firestoreID: doc.id })
            })

            setContestantArr(items)

        });

        return () => {
            eventUnsubscribe()
            contestantsUnsubscribe()
        }
        
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
                <DisplayContainer maxWidth='xl'>
                    <EventContainer>
                        {Object.entries(eventMap).map(([firestoreID, item]) => {
                            return (
                                <EventBox key={firestoreID} onClick={() => {
                                    onClickHandler(firestoreID)
                                }} selected={currentFirestoreID === firestoreID}
                                style={{ width: '250px', height: '80px' }}
                                >
                                    <InBoxRow>
                                        <InBoxTypo style={{ fontWeight: 600, fontSize: '1.2rem' }}>{item.name}</InBoxTypo>
                                    </InBoxRow>
                                </EventBox>
                            )
                        })}
                    </EventContainer>
                    <EventDetailsContainer>
                        {
                            (!eventLoading && currentFirestoreID.length > 0) ? (
                                <HandleComponent 
                                    eventItem={eventMap[currentFirestoreID]}
                                    eventID={currentFirestoreID}
                                    contestantItems={contestantArr}
                                />
                            ) : null
                        }
                    </EventDetailsContainer>
                </DisplayContainer>
            </main>
            <ToastContainer
                bodyStyle={{
                    fontFamily: 'Satoshi'
                }}
            />
        </>
    )
}
