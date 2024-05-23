import { defineStore } from 'pinia'

// private function to use inside "getVolunteer"
const getContactsOfVolunteer = async (volunteerId, token) => {
  //clear selected volunteer contacts like phoneNr, email, whatsap, etc...

  // If there's no token, something went wrong
  if (!token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

  let tempContacts = null

  await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers/${volunteerId}/contacts`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok)
        throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching volunteer contacts failed! (${res.status}`)
      return res.json()
    })
    .then((contacts) => {
      tempContacts = contacts
    })

  return tempContacts
}

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteersPage: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null
    }
  },
  actions: {
    async saveVolunteer(volunteer) {
      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify(volunteer)
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ posting new volunteer failed! (${res.status}`)
          return res.json()
        })
        .finally(() => (this.fetching = false))
    },
    async getVolunteer(volunteerId) {
      //clear selected volunteer
      this.selectedVolunteer = null

      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      this.fetching = true
      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers/${volunteerId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching volunteer failed! (${res.status}`)
          return res.json()
        })
        .then(async (volunteer) => {
          this.selectedVolunteer = volunteer
          this.selectedVolunteerContacts = await getContactsOfVolunteer(volunteerId, this.token)
        })
        .finally(() => (this.fetching = false))
    },
    async getVolunteers(pageNumber = 0) {
      this.fetching = true

      // If there's no token, something went wrong
      if (!this.token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

      await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers?page=${pageNumber}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${this.token}`
        }
      })
        .then((res) => {
          if (!res.ok)
            throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching new volunteers failed! (${res.status}`)
          return res.json()
        })
        .then((volunteersPage) => {
          this.volunteersPage = volunteersPage
        })
        .finally(() => (this.fetching = false))
    }
  },
  getters: {}
})
