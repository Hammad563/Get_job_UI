import { Button, Input, Option, Textarea } from '@material-tailwind/react'
import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ProfileHeader from '../../components/profileHeader'
import {roles as roleOptions, experience} from '../../helpers/roles'
import Select from 'react-select'



const ProfileEdit = () => {
    const [roles, setRoles] = useState(null)
    const [exp, setExp] = useState(null)

    const handleChange = (selected) => {
        const newValuesArr = selected ? selected.map(item => item.value) : [];
        setRoles(newValuesArr)
      };
    const handleExpChange = (selected) => {
        console.log("selected", selected)
        setExp(selected.value)
    }
   
    console.log("exp", exp);

    return(
        
        <>
          <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Update your profile</h1>
          </div>
          <ProfileHeader></ProfileHeader>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div>
                        {/* About */}
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    {/* Right side  */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-lg font-bold leading-6 text-gray-900">About</h2>
                            <p className="mt-1 text-sm text-gray-600">Tell us about yourself!</p>
                        </div>
                    </div>
                    {/* Left side  */}
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                            <div className="shadow  sm:rounded-md">
                                <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 sm:col-span-2">
                                            <Input type='name' label="Full Name" ></Input>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 sm:col-span-2">
                                            <Input type='name' label="Where are you located?" ></Input>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="grid">
                                            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">
                                                Select roles you are interested in 
                                            </label>
                                            <Select values={roles} onChange={handleChange} name="roles" className="basic-multi-select" isMulti options={roleOptions} />
                                        </div>
                                        
                                        <div className="grid">
                                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                                Years of experience
                                            </label>
                                            <Select value={{label: exp, value: exp}} onChange={handleExpChange} name="experience" className="basic-multi-select" options={experience} />
                                            </div>
                                        
                                    </div>
                                </div>

                                <div className="space-y-5 bg-white px-6 py-6 sm:p-6">
                                   
                                        <div className="col-span-3 sm:col-span-3">
                                            <Textarea label="Bio"></Textarea>
                                        </div>
                                    
                                </div>

                                <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 sm:col-span-2">
                                            <Input type="website" label="Github" ></Input>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 sm:col-span-2">
                                            <Input type='website' label="Website" ></Input>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
                    {/* Right side  */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-lg font-bold leading-6 text-gray-900">Experience</h2>
                            <p className="mt-1 text-sm text-gray-600">Please list your experiences</p>
                        </div>
                    </div>
                    {/* Left side  */}
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                            <div className="shadow  sm:rounded-md">
                                <Button size="sm" variant='text'>+ Add work experience</Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-1 md:grid md:grid-cols-3 md:gap-6">
                    {/* Right side  */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-lg font-bold leading-6 text-gray-900">Education</h2>
                            <p className="mt-1 text-sm text-gray-600">Please list your educations</p>
                        </div>
                    </div>
                    {/* Left side  */}
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                            <div className="shadow  sm:rounded-md">
                                <Button size="sm" variant='text'>+ Add education</Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-1 md:grid md:grid-cols-3 md:gap-6">
                    {/* Right side  */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-lg font-bold leading-6 text-gray-900">Skills</h2>
                            <p className="mt-1 text-sm text-gray-600">This will allow companies to see your skills</p>
                        </div>
                    </div>
                    {/* Left side  */}
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                            <div className="shadow  sm:rounded-md">
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 sm:col-span-2">
                                            <Input type="skills" label="Skills" ></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-5 md:grid md:grid-cols-3 md:gap-6">
                    {/* Right side  */}
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-lg font-bold leading-6 text-gray-900">Achievements</h2>
                            <p className="mt-1 text-sm text-gray-600">Showcase your achievements!</p>
                        </div>
                    </div>
                    {/* Left side  */}
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form>
                            <div className="shadow  sm:rounded-md">
                            <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-3">
                                            <Textarea label="Achievements"></Textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                

            </div>
            
          </div>
        </main>
        </>
    )
}

export default ProfileEdit