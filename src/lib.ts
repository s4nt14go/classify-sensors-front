import {Severity} from "./components/Notification";

async function uploadViaPresignedPost(api: string, file: any) {

  if (!file) return {msg: `Please enter a file`, severity: Severity.INFO};
  if (!api) return {msg: `You should set the api url`, severity: Severity.ERROR};

  // Get presigned POST URL and form fields
  let response = await fetch(api + 'signed-post');
  let json = await response.json();

  // Build a form for the request body
  let form = new FormData();
  Object.keys(json.data.fields).forEach(key => form.append(key, json.data.fields[key]));
  form.append('file', file);

  // Send the POST request
  response = await fetch(json.data.url, { method: 'POST', body: form });
  if (!response.ok) return {msg: `Failed to upload: ${JSON.stringify(response, null, 2)}`, severity: Severity.ERROR};

  // Done!
  return {msg: `File uploaded with key: ${json.id}`, severity: Severity.SUCCESS};
}

export {
  uploadViaPresignedPost,
}
