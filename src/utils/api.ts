const apiURL = "https://d706d748-0586-4c2b-9d30-288f5d3b0630.mock.pstmn.io";

export async function client(endpoint: string, { data }: { data?: any } = {}) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": data ? "application/json" : undefined,
    },
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config as RequestInit)
    .then(async (response) => {
      if (response.status === 401) {
        console.log("data");
        return Promise.reject({ message: "Please re-authenticate." });
      }
      if (response.status === 405) {
        return Promise.reject({ message: "Method not allowed !" });
      }

      const data = await response?.json();
      console.log("data");
      if (response.ok) {
        return data.data;
      } else {
        return Promise.reject(data);
      }
    });
}
