import { useUserStore } from '@/stores/UserStore'

const baseUrl = import.meta.env.VITE_BASE_URL

export const vdbFetchData = async (subdirectory, method, data) => {
  const token = useUserStore().token

  // If first character is a slash -> delete it
  if (String(subdirectory).charAt(0) === '/') subdirectory = String(subdirectory).substring(1)

  // Determine if the data is a FormData object
  const isFormData = data instanceof FormData

  // Create fetch options
  const fetchOptions = {
    method,
    headers: {
      // Only set Content-Type if data is not FormData and method is not DELETE
      ...(isFormData ? {} : method === 'DELETE' ? {} : { 'Content-type': 'application/json' }),
      authorization: `Bearer ${token}`
    },
    body: isFormData ? data : JSON.stringify(data)
  }

  // Fetch Data from the Backend
  return (
    fetch(`${baseUrl}/${subdirectory}`, fetchOptions)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`VoloDB-ERROR\n🙅‍♀️ fetching failed! (${res.status}): ${errorText}`)
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
      // .then((data) => {
      //   // If response is JSON, parse it
      //   if (typeof data === 'object' && data !== null) {
      //     return data
      //   }
      //   // If it's text, just return it
      //   return data
      // })
      .catch((error) => {
        console.error('Fetch error:', error)
        throw error
      })
  )
}
