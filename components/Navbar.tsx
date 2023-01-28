import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const NavbarDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-inline: 50px;
width: 100%;
height: 80px;
border-bottom: 1px solid #fff;
background: rgba(0, 0, 0, .3);
-webkit-backdrop-filter: blur(15px);
backdrop-filter: blur(15px);
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 9999;
`

const NavTypo = styled(Typography)`
color: #fff;
font-size: 2rem;
:hover {
    color: #000;
    cursor: pointer;
}
`

const Title = styled(Typography)`
color: #fff;
font-size: 2rem;
font-weight: 700;
:hover {
    cursor: pointer;
}
`

interface Pages {
    PageName: string,
    link: string,
}

const list: Pages[] = [
    {
        PageName: "Sponsors",
        link: "/sponsors"
    },
    {
        PageName: "About us",
        link: "/about"
    }
]


export default function Navbar() {

    const router = useRouter()

    return (
        <NavbarDiv>
            <Title onClick={() => router.push('/')}>Marathon Record System</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {list.map((e, key) => {
                    return (
                        <NavTypo style={{ fontSize: '1.5rem', margin: '10px' }} key={key} onClick={() => router.push(e.link)}>{e.PageName}</NavTypo>
                    )
                })}
            </div>
        </NavbarDiv>
    )
}
