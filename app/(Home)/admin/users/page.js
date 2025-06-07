import React from 'react'
import UserList from '../../component/userlist'
import Link from 'next/link'
import users from '@/app/model/users'
import ConnectDB from '@/app/db/connectDb'


const UsersPage = async() => {
  await ConnectDB();
  const userslist = await users.find({}).populate('parent').lean();
  return (
     <div className="w-full flex flex-col gap-3 p-8 bg-background">
       <Link
        className="w-fit mt-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm text-nowrap"
        href={"/admin/users/add"}
      >
        + Add New User
      </Link>
      <UserList userslist={JSON.parse(JSON.stringify(userslist))} pathName={"retailer"}/>
    </div>
  )
}

export default UsersPage
