import smstemplates from "@/app/model/smstemplates";

export async function sendWhatsappMsg(number, username, password) {
  const smstemplate = await smstemplates.findOne({});
  const message = smstemplate.registrationtemplate
    .replace("@retailername", username)
    .replace("@websitename", "Ezeecharge")
    .replace("@username", number)
    .replace("@password", password)
    .replace("@websiteurl", "www.ezeecharge.com");

  const url = smstemplate.whatsappapi
    .replace("@number", `91${number}`)
    .replace("@message", encodeURI(message));

  try {
    const res = await fetch(url);
    console.log(res);
  } catch (error) {
    console.log("Error in Sending whatsapp message: ", error);
  }
}

export async function sendTextSMS(number, username, password) {
  const smstemplate = await smstemplates.findOne({});
  const templateId = smstemplate.registrationtemplateid;
  const message = smstemplate.registrationtemplate
    .replace("@retailername", username)
    .replace("@websitename", "Pavathi")
    .replace("@username", number)
    .replace("@password", password)
    .replace("@websiteurl", "pavathi.com");

  const url = smstemplate.textsmsapi
    .replace("@number", number)
    .replace("@message", message)
    .replace("@templateid", templateId);

  try {
    const res = await fetch(url);
    console.log(res);
  } catch (error) {
    console.log("Error in Sending Text SMS: ", error);
  }
}
