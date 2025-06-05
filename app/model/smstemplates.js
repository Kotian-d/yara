import mongoose from "mongoose";

const smstemplate = mongoose.Schema({
    textsmsapi: String,
    whatsappapi: String,
    registrationtemplate: String,
    registrationtemplateid: String,
    balancetransfertemplate: String,
    balancetransfertemplateid: String,
    balancerecievedtemplate: String,
    balancerecievedtemplateid: String,
    balancereversetemplate: String,
    balancereversetemplateid: String,
   
},{ timestamps: true});

export default mongoose.models.smstemplate || mongoose.model("smstemplate", smstemplate);