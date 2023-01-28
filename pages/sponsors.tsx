import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import { Organization, EventContainer, EventDetailsContainer, DisplayContainer } from '.'

import { app, database } from '../firebase/clientApp'
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore'
import { Box, Typography } from '@mui/material'
import styled from '@emotion/styled'
import HandleOrgComponent from '@/components/HandleOrgComponent'

interface SelectedBtn {
    selected: boolean;
}

const EventBox = styled(Box)<SelectedBtn>`
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
	cursor: pointer;
}
`

const dbOrganization = collection(database, 'Organization')

function sponsors() {

	const [orgArr, setOrgArr] = useState<Organization[]>([])

	const [currentSponsor, setCurrentSponsor] = useState('');
	const [currentSponsorName, setCurrentSponsorName] = useState('');
	const [currentSponsorEmail, setCurrentSponsorEmail] = useState('')
	const [currentSponsorTel, setCurrentSponsorTel] = useState(0);

	const getDbEvent = () => {

		getDocs(dbOrganization).then((data) => {
			const DataOrg = data.docs.map((item) => {
				return { ...item.data() } as Organization
			})

			setOrgArr(DataOrg)
			setCurrentSponsor(DataOrg[0].ID)
			setCurrentSponsorName(DataOrg[0].name)
			setCurrentSponsorEmail(DataOrg[0].email)
			setCurrentSponsorTel(DataOrg[0].tel_no)
		})


	}

	const handleOnclick = (id: string, name: string, email: string, tel_no: number) => {
		if(id !== null) {
			setCurrentSponsor(id)
			setCurrentSponsorName(name)
			setCurrentSponsorEmail(email)
			setCurrentSponsorTel(tel_no)
		}
	}

	useEffect(() => {
		getDbEvent()
	}, [])

	return (
		<>
			<div className={styles.mainContainer}>
				<Navbar />
				<DisplayContainer style={{ marginTop: '200px' }}>
					<EventContainer>
						{orgArr.map((e, key) => {
							return (
								<EventBox key={key} selected={currentSponsor === e.ID} onClick={() => handleOnclick(e.ID, e.name, e.email, e.tel_no)} style={{ width: '250px', height: '80px' }}>
									<Typography style={{ fontSize: '1.2rem', fontWeight: 600 }}>{e.name}</Typography>
								</EventBox>
							)
						})}
					</EventContainer>
					<EventDetailsContainer>
						<HandleOrgComponent id={currentSponsor} name={currentSponsorName} email={currentSponsorEmail} tel_no={currentSponsorTel} />
					</EventDetailsContainer>
				</DisplayContainer>
			</div>
		</>
	)
}

export default sponsors