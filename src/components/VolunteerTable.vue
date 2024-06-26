<template>
  <div class="overflow-auto" v-bind="$attrs">
    <div v-if="volunteerStore.volunteersPage">
      <table class="w-full">
        <thead>
          <tr>
            <td
              v-for="(title, index) in tableHead"
              @click="sortVolunteersList(sortParameter[index])"
              :key="index"
              class="pb-3 text-vologray-700 text-sm cursor-pointer"
              :class="{ 'pl-4': index === 0 }"
              :style="{
                color: sortBy === sortParameter[index] ? '#0025FF' : ''
              }"
            >
              {{ title }}
              <IconTableSortArrows
                :upArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'asc' ? '#0025FF' : 'lightgrey'
                "
                :downArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'desc' ? '#0025FF' : 'lightgrey'
                "
                class="pl-2 inline w-5"
              />
            </td>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(volunteer, index) of volunteerStore.volunteersPage.content"
            class="border-b h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50"
            :key="volunteer.id"
            @click="goToDetails(volunteer.id)"
          >
            <td class="font-bold pl-4" :class="{ 'rounded-tl-md': index === 0 }">
              {{ volunteer.person.lastname }}
            </td>
            <td class="font-bold">{{ volunteer.person.firstname }}</td>
            <td>{{ volunteer.birthplace }}</td>
            <td>2023/24</td>
            <td>2/5</td>
            <td>25/25</td>
            <td class="text-voloblue-200 pr-4 md:pr-1" :class="{ 'rounded-tr-md ': index === 0 }">
              <IconArrowGoto class="text-voloblue-200 opacity-50" />
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationController
        class="mt-1"
        :currentPage="volunteerStore.volunteersPage.pageable.pageNumber"
        :totalPages="volunteerStore.volunteersPage.totalPages"
        @updatePage="updateVolunteerPage"
      />
    </div>
  </div>
  <ModalContainer v-if="volunteerStore.fetching">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><IconSpinner />loading ...</div>
  </ModalContainer>
</template>

<script>
import IconArrowGoto from './IconArrowGoto.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import ModalContainer from '@/components/ContainerModal.vue'
import IconSpinner from '@/components/IconSpinner.vue'
import PaginationController from '@/components/PaginationController.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    IconArrowGoto,
    ModalContainer,
    IconSpinner,
    PaginationController,
    IconTableSortArrows
  },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  setup: () => {
    const volunteerStore = useVolunteerStore()
    const router = useRouter()
    return { volunteerStore, router }
  },
  data() {
    return {
      tableHead: [
        'Name',
        'Vorname',
        'Einsatzstelle',
        'Jahrgang',
        'Unterlagen',
        'gebuchte Seminare'
      ],
      sortParameter: [
        'person.lastname',
        'person.firstname',
        'project',
        'year',
        'documents',
        'seminars'
      ],
      sortOrder: 'asc',
      sortBy: 'person.lastname',
      page: 0,
      pageSize: 13
    }
  },
  methods: {
    goToDetails(volunteerId) {
      this.$router.push({ name: 'VolunteerDetailView', params: { volunteerId } })
    },
    updateVolunteerPage(pageNumber) {
      this.volunteerStore.volunteersPage.pageable.pageNumber = pageNumber
      let params = {
        sortOrder: this.sortOrder,
        sortBy: this.sortBy,
        page: pageNumber,
        pageSize: this.pageSize
      }
      this.volunteerStore.getVolunteers(params)
    },
    sortVolunteersList(sortBy) {
      if (this.sortBy !== sortBy) {
        this.sortOrder === 'asc'
      } else {
        if (this.sortOrder === 'asc') {
          this.sortOrder = 'desc'
        } else {
          this.sortOrder = 'asc'
        }
      }

      this.sortBy = sortBy

      this.getVolunteers()
    },
    async getVolunteers(params) {
      if (!params)
        params = {
          sortOrder: this.sortOrder,
          sortBy: this.sortBy,
          page: this.page,
          pageSize: this.pageSize,
          search: this.searchQuery
        }

      try {
        await this.volunteerStore.getVolunteers({
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          pageSize: params.pageSize,
          search: params.search
        })
      } catch (error) {
        console.error('Error fetching volunteers:', error)
      }
    }
  },
  watch: {
    searchQuery: {
      async handler() {
        await this.getVolunteers()
      },
      immediate: true // This option ensures that the api is called initially with the initial prop value
    }
  }
}
</script>
