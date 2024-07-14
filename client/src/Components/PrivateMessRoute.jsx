import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
//useNavigate is a hook whereas Navigate is a component

function PrivateMessRoute() {
    const { currentUser } = useSelector((state) => state.user)
    
    return currentUser.category === 'mess' ? <Outlet /> : (
        <div>
            <p className='text-red-600 pt-4 text-xl font-bold text-center'>You are not Authorised
            !!</p>
            {/* {currentUser.category} */}
        </div>
    // <Navigate to='/mess-signin' />
    )
}

export default PrivateMessRoute