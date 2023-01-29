import { forwardRef } from 'react'
import { InputText } from './HandleComponent'

// const useStyles = makeStyles(theme => ({
//   input: {
//     backgroundColor: '#fff'
//   }
// }))

const PhoneInput = (props: any, ref: any) => {
    //   const classes = useStyles()

    return (
        <InputText
            {...props}
            //   InputProps={{
            //     className: classes.input
            //   }}
            inputRef={ref}
            fullWidth
            label="Phone Number"
        />
    )
}
export default forwardRef(PhoneInput)
