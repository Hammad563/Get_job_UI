import {useSelector, useDispatch} from 'react-redux'


const HomePage = () => {
    const currentUser = useSelector( (state) => state.auth.user)
    console.log("current user in hompage", currentUser)
    return(
        
        <>
           
        </>
    )
}

export default HomePage