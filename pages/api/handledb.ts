
import { app, database } from '../../firebase/clientApp'
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'
import { useState } from 'react'

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

export default function handledb(currentEvent: string) {

    var event

    getDocs(dbEvent).then((data) => {
        
        const DataEvent = data.docs.map((item) => {
            return { ...item.data() } as Event
        })

        event = DataEvent

    })

    console.log(event)

    getDocs(dbContestant).then((data) => {

        const DataContestant = data.docs.map((item) => {
            return { ...item.data() } as Contestant
        })
        

    })


    getDocs(dbOrganization).then((data) => {
        const DataOrg = data.docs.map((item) => {
            return { ...item.data() } as Organization
        })

    })


}
