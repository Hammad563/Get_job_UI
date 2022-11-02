
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ProfileHeader from '../../components/profileHeader'

const ProfileSummary = () => {
   
    return(
        
        <>
          <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Profile Summary</h1>
          </div>
          <ProfileHeader></ProfileHeader>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            
            {/* /End replace */}
          </div>
        </main>
        </>
    )
}

export default ProfileSummary