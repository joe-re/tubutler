export default async function deserializeJSONResponse<T>(
  promise: Promise<Response>, cb?: Function
): Promise<T> {
  try {
    const response = await promise;
    const json = await response.json().catch(() => null);
    if (cb) {
      return cb(json);
    }
    return json;
  } catch (e) {
    if (e.json) {
      const errResponse = await e.json();
      return Promise.reject(new Error(errResponse));
    }
    return Promise.reject(e);
  }
}
