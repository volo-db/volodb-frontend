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
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`VoloDB-ERROR\n🙅‍♀️ fetching failed! (${res.status}): ${responseBody}`)
      }

      const contentType = res.headers.get('Content-Type') || ''
      let responseBody

      if (contentType.includes('application/json')) {
        // Parse JSON response
        responseBody = await res.json()
      } else {
        // Get text response for non-JSON
        responseBody = await res.text()
      }

      return responseBody
    })
    .then((data) => {
      return data
    })
}
