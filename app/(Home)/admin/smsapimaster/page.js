import React from 'react'
import SMSApiForm from '../../component/smsapiform'
import smstemplates from '@/app/model/smstemplates'

const SMSApiMaster = async() => {
  const data = await smstemplates.findOne({});
  console.log(data);
  return (
    <div>
      <SMSApiForm data={JSON.parse(JSON.stringify(data))}/>
    </div>
  )
}

export default SMSApiMaster
