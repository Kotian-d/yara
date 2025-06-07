"use server";

import { auth, signIn, signOut } from "@/auth";
import users from "../model/users";
import { RegisterSchema } from "../zodschema/userSchema";
import ConnectDB from "../db/connectDb";
import { getUserByEmail, getUserByMobile } from "../queries/userquery";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getApiById } from "../queries/apiquery";
import operator from "../model/operators";
import { revalidatePath } from "next/cache";
import smstemplates from "../model/smstemplates";
import { smsformschema } from "../zodschema/smsformSchema";
import siteconfig from "../model/siteconfig";
import api from "../model/apis";

export async function signupUser(formData) {
  try {
    await ConnectDB();
    const result = RegisterSchema.safeParse(formData);
    if (result.success) {
      const emailexits = await getUserByEmail(result.data.email);
      if (emailexits) throw new Error("Email id already exists in the system");

      const mobileexits = await getUserByMobile(result.data.mobile);
      if (mobileexits)
        throw new Error("Mobile Number already exists in the system");

      const hashedpassword = await bcrypt.hash(result.data.password, 10);
      const api_token = uuidv4();
      await users.create({
        name: result.data.username,
        email: result.data.email,
        password: hashedpassword,
        api_token: api_token,
        isactive: true,
        mobile: Number(result.data.mobile),
      });
      return "Account Created Successfully";
    }

    throw new Error(result.error);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(formData) {
  await ConnectDB();

  const session = await auth();
  if (!session?.user?.role == "ADMIN")
    return "You are not authorized to perform this action";

  try {
    console.log("delete user");
    const _id = formData.get("id");
    await users.findByIdAndDelete({ _id });

    revalidatePath("/user/routeSetting");
    return "User Deleted Successfully";
  } catch (error) {
    console.log(error);
  }
}

export async function signInUser(formData) {
  try {
    await signIn("credentials", formData, { redirectTo: "/user/dashboard" });
  } catch (error) {
    if (isRedirectError(error)) {
      return;
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut({
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }
}

//Api Actions
export async function addApi(formData) {
  await ConnectDB();

  const session = await auth();
  if (!session?.user?.role == "ADMIN")
    return "You are not authorized to perform this action";

  try {
    const id = uuidv4();
    const {
      api_name: name,
      isactive: isActive,
      isplanapi: isPlanApi,
      host,
      param1,
      param2,
      param3,
      param4,
      param5,
      param6,
      param7,
      prepaidApiMethod,
      prepaidApi,
      dthApiMethod,
      dthApi,
      balanceApiMethod,
      balanceApi,
      balancecheckResponse,
      RcResponseMethod,
      RcResponseStatus,
      RcResponseOpid,
      RcResponseApirefid,
      RcResponsebalance,
      RcResponseSuccess,
      RcResponseFailure,
      RcResponsePending,
      RcResponseRemark,
      CbResponseReqid,
      CbResponseStatus,
      CbResponseOpid,
      CbResponseApirefid,
      CbResponsebalance,
      CbResponseSuccess,
      CbResponseFailure,
      CbResponsePending,
      CbResponseRemark,
      operator,
    } = formData;

    await api.create({
      id,
      name,
      isActive,
      isPlanApi,
      host,
      param1,
      param2,
      param3,
      param4,
      param5,
      param6,
      param7,
      prepaid_api_method: prepaidApiMethod,
      prepaidapi: prepaidApi,
      dth_api_method: dthApiMethod,
      dthapi: dthApi,
      balance_api_method: balanceApiMethod,
      bal_check_api: balanceApi,
      balance_check_response: {
        balance_field: balancecheckResponse,
      },
      recharge_response: {
        response_type: RcResponseMethod,
        status_field: RcResponseStatus,
        opid_field: RcResponseOpid,
        apirefid_field: RcResponseApirefid,
        balance_field: RcResponsebalance,
        success_key: RcResponseSuccess,
        failure_key: RcResponseFailure,
        pending_key: RcResponsePending,
        remark_field: RcResponseRemark,
      },
      callback_response: {
        reqid: CbResponseReqid,
        status_field: CbResponseStatus,
        opid_field: CbResponseOpid,
        apirefid_field: CbResponseApirefid,
        balance_field: CbResponsebalance,
        success_key: CbResponseSuccess,
        failure_key: CbResponseFailure,
        pending_key: CbResponsePending,
        remark_field: CbResponseRemark,
      },
      operator,
    });

    revalidatePath("/user/apimaster");
    return "add successfully";
  } catch (error) {
    console.log(error);
  }
}

export async function updateApi(_id, formData) {
  try {
    await ConnectDB();

    const session = await auth();
    if (!session?.user?.role == "ADMIN")
      return "You are not authorized to perform this action";

    const exists = await api.findById({ _id });
    if (!exists) return "Api doesn't exists";

    const {
      api_name: name,
      isactive: isActive,
      isplanapi: isPlanApi,
      host,
      param1,
      param2,
      param3,
      param4,
      param5,
      param6,
      param7,
      prepaidApiMethod,
      prepaidApi,
      dthApiMethod,
      dthApi,
      balanceApiMethod,
      balanceApi,
      balancecheckResponse,
      RcResponseMethod,
      RcResponseStatus,
      RcResponseOpid,
      RcResponseApirefid,
      RcResponsebalance,
      RcResponseSuccess,
      RcResponseFailure,
      RcResponsePending,
      RcResponseRemark,
      CbResponseReqid,
      CbResponseStatus,
      CbResponseOpid,
      CbResponseApirefid,
      CbResponsebalance,
      CbResponseSuccess,
      CbResponseFailure,
      CbResponsePending,
      CbResponseRemark,
      operator,
    } = formData;

    await api.findByIdAndUpdate(
      { _id },
      {
        name,
        isActive,
        isPlanApi,
        host,
        param1,
        param2,
        param3,
        param4,
        param5,
        param6,
        param7,
        prepaid_api_method: prepaidApiMethod,
        prepaidapi: prepaidApi,
        dth_api_method: dthApiMethod,
        dthapi: dthApi,
        balance_api_method: balanceApiMethod,
        bal_check_api: balanceApi,
        balance_check_response: {
          balance_field: balancecheckResponse,
        },
        recharge_response: {
          response_type: RcResponseMethod,
          status_field: RcResponseStatus,
          opid_field: RcResponseOpid,
          apirefid_field: RcResponseApirefid,
          balance_field: RcResponsebalance,
          success_key: RcResponseSuccess,
          failure_key: RcResponseFailure,
          pending_key: RcResponsePending,
          remark_field: RcResponseRemark,
        },
        callback_response: {
          reqid: CbResponseReqid,
          status_field: CbResponseStatus,
          opid_field: CbResponseOpid,
          apirefid_field: CbResponseApirefid,
          balance_field: CbResponsebalance,
          success_key: CbResponseSuccess,
          failure_key: CbResponseFailure,
          pending_key: CbResponsePending,
          remark_field: CbResponseRemark,
        },
        operator,
      },
      { upsert: true }
    );
    revalidatePath("/admin/apimaster");
    return "API updated successfully";
  } catch (error) {
    console.log(error);
  }
}

export async function deleteApi(formData) {
  try {
    await ConnectDB();

    const session = await auth();
    if (!session?.user?.role == "ADMIN")
      return "You are not authorized to perform this action";

    const { _id } = await getApiById(formData.get("id"));

    await api.findByIdAndDelete({ _id });

    revalidatePath("/admin/apimaster");
  } catch (error) {
    console.log(error);
  }
}

//

export async function addOperator(formData) {
  await ConnectDB();
  const session = await auth();
  if (!session?.user?.role == "ADMIN")
    return "You are not authorized to perform this action";
  try {
    const Api1 = await getApiById(formData.get("api1"));
    const Api2 = await getApiById(formData.get("api2"));
    const Planapi = await getApiById(formData.get("planapi"));
    const logo = formData.get("logo");
    const name = formData.get("name");
    const opcode = formData.get("opcode");
    const providertype = formData.get("providertype");
    const api1 = Api1._id;
    const api2 = Api2._id;
    const planapi = Planapi._id;
    const isenabled = formData.get("isactive");
    const denomination = formData.get("denomination");
    let file_path = "/uploads/thumbnail.png";

    if (logo instanceof File) {
      const buffer = Buffer.from(await logo.arrayBuffer());

      file_path = "/uploads/" + logo.name;
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + logo.name),
        buffer
      );
    }

    await operator.create({
      logo: file_path,
      name,
      opcode,
      providertype,
      api1,
      api2,
      planapi,
      isenabled,
      denomination,
    });

    revalidatePath("/admin/providerSetting");
  } catch (error) {
    console.log(error);
  }
}

export async function editOperator(_id, formData) {
  await ConnectDB();

  const session = await auth();
  if (!session?.user?.role == "ADMIN")
    return "You are not authorized to perform this action";

  try {
    console.log(formData);
    const Api1 = await getApiById(formData.get("api1"));
    const Api2 = await getApiById(formData.get("api2"));
    const Planapi = await getApiById(formData.get("planapi"));
    const logo = formData.get("logo");
    const name = formData.get("name");
    const opcode = formData.get("opcode");
    const providertype = formData.get("providertype");
    const api1 = Api1._id;
    const api2 = Api2._id;
    const planapi = Planapi._id;
    const isenabled = formData.get("isactive");
    const denomination = formData.get("denomination");

    if (logo instanceof File) {
      const buffer = Buffer.from(await logo.arrayBuffer());

      file_path = "/uploads/" + logo.name;
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + logo.name),
        buffer
      );
    }

    await operator.findByIdAndUpdate(
      { _id: _id },
      {
        logo,
        name,
        opcode,
        providertype,
        api1,
        api2,
        planapi,
        isenabled,
        denomination,
      }
    );

    revalidatePath("/admin/providerSetting");
    return "Update Successfull";
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOperator(formData) {
  await ConnectDB();

  const session = await auth();
  if (!session?.user?.role == "ADMIN")
    return "You are not authorized to perform this action";

  try {
    const _id = formData.get("id");
    await operator.findByIdAndDelete({ _id });

    revalidatePath("/admin/providerSetting");
    return "Operator Deleted Successfully";
  } catch (error) {
    console.log(error);
  }
}

//

export async function updateRoute(formData) {
  try {
    await ConnectDB();

    const session = await auth();
    if (!session?.user?.role == "ADMIN")
      return "You are not authorized to perform this action";

    const _id = formData.get("id");
    const api1 = await getApiById(formData.get("api1"));
    const api2 = await getApiById(formData.get("api2"));
    const api3 = await getApiById(formData.get("api3"));
    const api4 = await getApiById(formData.get("api4"));
    const api5 = await getApiById(formData.get("api5"));

    const planapi = await getApiById(formData.get("planapi"));
    const isenabled = formData.get("isActive") ? true : false;

    await operator.findByIdAndUpdate(
      { _id: _id },
      {
        api1: api1._id,
        api2: api2?._id,
        api3: api3?._id,
        api4: api4?._id,
        api5: api5?._id,
        planapi: planapi._id,
        isenabled,
      }
    );

    revalidatePath("/admin/providerSetting");
  } catch (error) {
    console.log(error);
  }
}

export async function addSMSApi(formData) {
  try {
    await ConnectDB();

    const session = await auth();
    if (!session?.user?.role == "ADMIN")
      return "You are not authorized to perform this action";

    const result = smsformschema.safeParse(formData);

    if (result.success) {
      const {
        textsmsapi,
        whatsappapi,
        registrationtemplate,
        registrationtemplateid,
        balancetransfertemplate,
        balancetransfertemplateid,
        balancerecievedtemplate,
        balancerecievedtemplateid,
        balancereversetemplate,
        balancereversetemplateid,
      } = formData;

      await smstemplates.findOneAndUpdate(
        {},
        {
          textsmsapi,
          whatsappapi,
          registrationtemplate,
          registrationtemplateid,
          balancetransfertemplate,
          balancetransfertemplateid,
          balancerecievedtemplate,
          balancerecievedtemplateid,
          balancereversetemplate,
          balancereversetemplateid,
        },
        { upsert: true }
      );

      revalidatePath("/admin/smsapimaster");
      return "Saved Successfully";
    }
    throw new Error(result.error);
  } catch (error) {
    throw error;
  }
}

export async function UpdateConfig(formData) {
  try {
    await ConnectDB();

    const session = await auth();
    if (!session?.user?.role == "ADMIN")
      return "You are not authorized to perform this action";

    let apiroutescount = formData.get("apiroutescount");
    if (apiroutescount < 1) {
      apiroutescount = 1;
    }
    if (apiroutescount > 5) {
      apiroutescount = 5;
    }
    const successretry = formData.get("successretry");
    const addbalanceretry = formData.get("addbalanceretry");
    const issameamtpending = formData.get("sameamtpending") ? true : false;

    await siteconfig.findOneAndUpdate(
      {},
      {
        sameamtpending: issameamtpending,
        successRetry: Number(successretry),
        numberOfApiRoutes: Number(apiroutescount),
        addbalanceRetry: Number(addbalanceretry),
      },
      { upsert: true }
    );
  } catch (error) {
    throw error;
  } finally {
    revalidatePath("(Home)/admin/settings");
  }
}
