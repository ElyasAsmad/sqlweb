import React, { useEffect, useState } from 'react'


function ModalDetails() {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {

        setIsShow(true)

    }, [])
  
    return (
        <>
            <div>
                ModalDetails
            </div>
        </>
    )
}


export default ModalDetails