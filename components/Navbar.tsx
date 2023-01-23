import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const NavbarDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-inline: 50px;
width: 100%;
height: 80px;
border-bottom: 1px solid #fff;
background: rgba(0, 0, 0, .3);
-webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px);
`

const NavTypo = styled(Typography)`
color: #fff;
:hover {
    color: #000;
    cursor: pointer;
}
`


export default function Navbar() {
    return (
        <NavbarDiv>
            <NavTypo>SQLweb</NavTypo>
        </NavbarDiv>
    )
}
