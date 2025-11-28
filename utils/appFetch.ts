
export type AppRequestInit = Omit<RequestInit, "signal"> & { timeoutSeconds?: number };

export type AppFetchParams = {
  url: string;
} & AppRequestInit;
export type AppFetchAs = "json" | "formdata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function appFetch<T = any>({ url, timeoutSeconds = 40, body, ...init }: AppFetchParams, fetchAs: AppFetchAs = "json"): Promise<ApiResponse<T> | null> {
  const contentType: Record<string, string> = fetchAs === 'json' ? {
    "Content-Type": "application/json",
  } : {}

  const controller = new AbortController();
  const { signal } = controller;

  const timeoutId = setTimeout(() => controller.abort(), timeoutSeconds * 1000);
  try {
    // console.log({init});
    
    const req = await fetch(url, {
      ...init,
      signal,
      body,
      // method: "POST",
      headers: {
        ...contentType,
        ...init.headers,
      },
    });
    return await req.json()
  } catch (error) {
    console.error("Error in appFetch:", error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function get(url: string, init?: AppRequestInit) {
  return appFetch({ url, method: "GET", ...init });
}

function post<K>(url: string, body: K, init?: AppRequestInit) {
  return appFetch({ url, method: "POST", body: JSON.stringify(body), ...init });
}

function patch<K>(url: string, body: K, init?: AppRequestInit) {
  return appFetch({ url, method: "PATCH", body: JSON.stringify(body), ...init });
}

function put<K>(url: string, body: K, init?: AppRequestInit) {
  return appFetch({ url, method: "PUT", body: JSON.stringify(body), ...init });
}

function del<K>(url: string, body?: K, init?: AppRequestInit) {
  return appFetch({ url, method: "DELETE", body: JSON.stringify(body), ...init });
}

function postForm(url: string, body: BodyInit, init: AppRequestInit) {
  return appFetch({ url, method: "POST", body, ...init }, "formdata");
}

function patchForm(url: string, body: BodyInit, init: AppRequestInit) {
  return appFetch({ url, method: "PATCH", body, ...init }, "formdata");
}

function putForm(url: string, body: BodyInit, init: AppRequestInit) {
  return appFetch({ url, method: "PUT", body, ...init }, "formdata");
}


export const AppFetch = {
  get,
  post,
  put,
  del,
  patch,
  postForm,
  patchForm,
  putForm,
};