const baseUrl = import.meta.env.VITE_BASE_URL

export const vdbFetchData = async (subdirectory, method, token, data) => {
  // If there's no token, something went wrong
  if (!token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! No token provided or not logged in.')

  // If first character is a slash -> delete it
  if (String(subdirectory).charAt(0) === '/') subdirectory = String(subdirectory).substring(1)

  // Fetch Data from the Backend
  return fetch(`${baseUrl}/${subdirectory}`, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching failed! (${res.status}`)
      if (res.headers.get('Content-Length') == 0) return
      return res.json()
    })
    .then((data) => {
      return data
    })
}
