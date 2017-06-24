type RequestParams = {
  url: string,
  parameters?: Object
};
type MethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' ;

function createHeaders() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('Accept', 'application/json,');
  return headers;
}

type doRequestParams = { url: string, method: MethodType, body?: string | null, accessToken?: string | undefined };
async function doRequest(params: doRequestParams): Promise<Response> {
  const { url, method, body, accessToken } = params;
  const request = new Request(url, { headers: createHeaders(), method, body });
  try {
    const response = await fetch(request);
    if (!(response.status >= 200 && response.status < 400)) {
      return Promise.reject(response);
    }
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
}

export function buildQueryURL(params: RequestParams) {
  const searchParams = new URLSearchParams();
  const parameters: { [key: string]: any } = params.parameters || {};
  parameters['key'] = 'AIzaSyBPPaZXM9pXvNP7CsUmWULpKTtU630skrk';
  Object.keys(parameters).forEach((key) => {
    searchParams.append(key, parameters[key] || '');
  });
  const url = searchParams.toString() ? `${params.url}?${searchParams.toString()}` : params.url;
  return url;
}

async function get(params: RequestParams): Promise<Response> {
  return doRequest({ url: buildQueryURL(params), method: 'GET', body: null });
}

async function post(params: RequestParams): Promise<Response> {
  const body = params.parameters ? JSON.stringify(params.parameters) : null;
  return doRequest({ url: params.url, method: 'POST', body });
}

async function put(params: RequestParams): Promise<Response> {
  const body = params.parameters ? JSON.stringify(params.parameters) : null;
  return doRequest({ url: params.url, method: 'PUT', body });
}

async function patch(params: RequestParams): Promise<Response> {
  const body = params.parameters ? JSON.stringify(params.parameters) : null;
  return doRequest({ url: params.url, method: 'PATCH', body });
}

async function destroy(params: RequestParams): Promise<Response> {
  const body = params.parameters ? JSON.stringify(params.parameters) : null;
  return doRequest({ url: params.url, method: 'DELETE', body });
}

export default { get, post, put, patch, delete: destroy };
