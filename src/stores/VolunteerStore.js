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

// private function to use inside "getVolunteer"
const getAddressesOfVolunteer = async (volunteerId, token) => {
  //clear selected volunteer contacts like phoneNr, email, whatsap, etc...

  // If there's no token, something went wrong
  if (!token) throw Error('VoloDB-ERROR\n🙅‍♀️ ups! not logged in.')

  let tempAddresses = null

  await fetch(`${import.meta.env.VITE_BASE_URL}/volunteers/${volunteerId}/addresses`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok)
        throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching volunteer addresses failed! (${res.status}`)
      return res.json()
    })
    .then((addresses) => {
      tempAddresses = addresses
    })

  return tempAddresses
}

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => {
    return {
      fetching: false,
      token: JSON.parse(localStorage.getItem('user-store')).token,
      volunteersPage: null,
      selectedVolunteer: null,
      selectedVolunteerContacts: null,
      selectedVolunteerAddresses: null,
      sortOrder: 'asc',
      activeSortProperty: null
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
          this.selectedVolunteerAddresses = await getAddressesOfVolunteer(volunteerId, this.token)
        })
        .finally(() => (this.fetching = false))
    },
    async getVolunteers(pageNumber = 0) {
      this.fetching = true
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/volunteers?page=${pageNumber}&sortField=person.lastname&sortOrder=asc`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          if (!res.ok)
            throw Error(`VoloDB-ERROR\n🙅‍♀️ fetching new volunteers failed! (${res.status}`)
          return res.json()
        })
        .then((volunteersPage) => {
          this.volunteersPage = volunteersPage
        })
        .finally(() => (this.fetching = false))
    },
    async fetchSortedVolunteers(sortBy) {
      this.fetching = true
      // call function for sortOrder
      this.defineSortOrder(sortBy)
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/volunteers?page=0&sortField=${sortBy}&sortOrder=${this.sortOrder}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${this.token}`
          }
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(`ERROR:${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          this.volunteersPage = data
        })
        .finally(() => (this.fetching = false))
    },
    defineSortOrder(sortProperty) {
      if (sortProperty === this.activeSortProperty) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.activeSortProperty = sortProperty
        this.sortOrder = 'asc' // Reset sortOrder to 'asc' when a new sortProperty is selected
      }
    }
  }
})
