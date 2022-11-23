import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loader = () => {
    return (
        <ThreeDots
            height="20"
            width="20"
            radius="9"
            color="#fff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ display : 'block'}}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default Loader