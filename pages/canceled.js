import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagDash } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const cancel = () => {

    return (
        <div className='cancel-wrapper'>
            <div className='cancel'>
                <p className='icon'>
                    <BsBagDash />
                </p>
                <h2>Your order has been canceled!</h2>
                <p className='description'>
                    If you have any questions, please email <a className='email' href='mailto:order@example.com'>order@example.com</a>
                </p>
                <Link href='/'>
                    <button className='btn' type='button' width='300px'>
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default cancel