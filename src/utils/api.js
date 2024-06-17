import { useUserStore } from '@/stores/UserStore'

const baseUrl = import.meta.env.VITE_BASE_URL

export const vdbFetchData = async (subdirectory, method, data) => {
  const token = useUserStore().token

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
