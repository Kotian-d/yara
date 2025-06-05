import mongoose from "mongoose";

const apiSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPlanApi: {
        type: Boolean,
        default: false
    },
    isStopRecharge: {
        type: Boolean,
        default: false
    },
    host: {
        type: String,
        //required: true
    },
    param1: String,
    param2: String,
    param3: String,
    param4: String,
    param5: String,
    param6: String,
    param7: String,
    prepaid_api_method: {
        type: String,
        enum: ["GET", "POST"],
        default: "GET"
    },
    prepaidapi: String,
    dth_api_method: {
        type: String,
        enum: ["GET", "POST"],
        default: "GET"
    },
    dthapi: String,
    balance_api_method: {
        type: String,
        enum: ["GET", "POST"],
        default: "GET"
    },
    bal_check_api: String,
    balance_check_response: {
        balance_field: String,
    },
    recharge_response: {
        response_type: {
            type: String,
            enum: ["JSON", "CSV", "XML"],
            default: "JSON"
        },
        status_field: String,
        opid_field: String,
        apirefid_field: String,
        balance_field: String,
        remark_field: String,
        success_key: String,
        failure_key: String,
        pending_key: String,
    },
    callback_response: {
        reqid: String,
        status_field: String,
        opid_field: String,
        apirefid_field: String,
        balance_field: String,
        remark_field: String,
        success_key: String,
        failure_key: String,
        pending_key: String,
    },
    operator: [{
        opname: String,
        opcode: String,
        opparam1: String,
        opparam2: String,
        opparam3: String,
        opparam4: String,
        opparam5: String,
        limit: Number,
    }]

},{ timestamps: true});

export default mongoose.models.Api || mongoose.model("Api", apiSchema);