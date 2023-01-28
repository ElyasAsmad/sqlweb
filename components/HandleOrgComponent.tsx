import { Typography } from '@mui/material'
import { fontWeight } from '@mui/system'
import React, { useEffect } from 'react'

interface OrgComponent {
    id: string
    name: string
    email: string
    tel_no: number
}

function HandleOrgComponent({ id, name, email, tel_no }: OrgComponent) {

    useEffect(() => {
        console.log(id,name,email,tel_no)
    }, [])

    return (
        <>
            <div>
                <Typography style={{ fontSize: '2rem', fontWeight: 600 }}>{`${name} (${id})`}</Typography>
                <Typography style={{ fontSize: '1.5rem', fontWeight: 600 }}>{email}</Typography>
                <Typography style={{ fontSize: '1.5rem', fontWeight: 500 }}>{tel_no}</Typography>
            </div>
        </>
    )
}

export default HandleOrgComponent