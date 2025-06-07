import React from 'react'
import SMSApiForm from '../../component/smsapiform'
import smstemplates from '@/app/model/smstemplates'
import ConnectDB from '@/app/db/connectDb';

const SMSApiMaster = async() => {
  await ConnectDB();
  const data = await smstemplates.findOne({});
  return (
    <div>
      <SMSApiForm data={JSON.parse(JSON.stringify(data))}/>
    </div>
  )
}

export default SMSApiMaster
