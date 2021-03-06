import {Severity} from "./components/Notification";

async function uploadViaPresignedPost(api: string, file: any, sessionId: string) {

  try {
    if (!file) return {msg: `Please select a file`, severity: Severity.INFO};
    if (!api) return {msg: `You should set the api url`, severity: Severity.ERROR};

    let response = await fetch(api + 'sign-post?' +  new URLSearchParams({
      sessionId,
      filename: file.name,
    }));
    console.log('sign response', response);
    let json = await response.json();
    console.log('sign json', json);
    if (json.error) {
      return {msg: json.error, severity: Severity.ERROR};
    }


    // Build a form for the request body
    let form = new FormData();
    Object.keys(json.data.fields).forEach(key => form.append(key, json.data.fields[key]));
    form.append('file', file);

    // Send the POST request
    response = await fetch(json.data.url, { method: 'POST', body: form });
    console.log('post response', response);
    if (!response.ok) return {msg: `Failed to upload: ${response.statusText}`, severity: Severity.ERROR};

    return {msg: `File uploaded with key: ${json.data.fields.key}`, severity: Severity.SUCCESS};

  } catch (e) {
    console.log(e);
    return {msg: `Upload unsuccessful`, severity: Severity.ERROR};
  }
}

export {
  uploadViaPresignedPost,
}
