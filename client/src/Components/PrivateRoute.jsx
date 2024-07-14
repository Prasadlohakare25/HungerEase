import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
//useNavigate is a hook whereas Navigate is a component

function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
    return currentUser.category === 'ngo' ? <Outlet /> :(
        <div>
            <p className='text-red-600 text-xl font-bold text-center'> You are not authorised!!</p>
        </div>
    ) 
    // <Navigate to='/ngo-signin' />
}

export default PrivateRoute