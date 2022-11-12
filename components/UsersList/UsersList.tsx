import React from 'react'
import { IUserProfile } from '../../typescript'

interface IUserList {
    userList: IUserProfile[]
}

const UsersList = ({ userList }: IUserList) => {
    return (
        <>
            {/* <h1 className='font-light text-6xl py-2'>Parallax Explorers</h1>
            <ul className='space-y-'>
                {userList.map((item: { username: string, id: string }) => (
                    <li key={item.id}>{item.username}</li>
                ))}
            </ul> */}
            <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-black/50 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Community Members</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {userList.map((user: IUserProfile) => (
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={user.avatar_url} alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user.website}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        Total Imaginations : {user.submissions}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}

export default UsersList