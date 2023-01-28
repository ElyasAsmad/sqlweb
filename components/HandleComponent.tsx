import { Box, Typography } from "@mui/material"
import styled from '@emotion/styled'
import { Contestant } from '../pages/index'
import { Dispatch, SetStateAction } from "react"

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

interface IHandleComponent {
    id: string;
    currentEventName: string;
    currentEvent: string;
    contestantArr: Contestant[];
    cGender: string;
    setCGender: Dispatch<SetStateAction<string>>;
}

const HandleComponent = ({ id, currentEventName, currentEvent, contestantArr, cGender, setCGender }: IHandleComponent) => {

    return (
        <>
            <Typography style={{ fontSize: '2rem', fontWeight: 600 }}>
                {currentEventName}
            </Typography>
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
        </>
    )

}

export default HandleComponent