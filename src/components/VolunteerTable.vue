<template>
  <div v-bind="$attrs">
    <div v-if="volunteerStore.volunteersPage">
      <table class="w-full">
        <thead>
          <tr>
            <td
              v-for="(title, index) in tableHead"
              @click="sortVolunteersList(sortParameter[index])"
              :key="index"
              class="pb-3 text-sm cursor-pointer"
              :class="{
                'pl-4': index === 0,
                'text-voloblue-200': sortBy === sortParameter[index],
                'text-black opacity-80': !(sortBy === sortParameter[index])
              }"
            >
              {{ title }}
              <IconTableSortArrows
                :upArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'asc' ? '#0025FF' : 'darkgray'
                "
                :downArrowColor="
                  sortParameter[index] === sortBy && sortOrder === 'desc' ? '#0025FF' : 'darkgray'
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
        class="mt-[2px]"
        :currentPage="volunteerStore.volunteersPage.pageable.pageNumber"
        :totalPages="volunteerStore.volunteersPage.totalPages"
        :pageLength="pageSize"
        @updatePage="updateVolunteerPage"
        @updateLength="(length) => updateVolunteerListLenght(length)"
      />
    </div>
  </div>
  <ContainerModal v-if="volunteerStore.fetching" :delay="500">
    <div class="p-4 flex flex-row gap-2 items-center text-md"><IconSpinner />loading ...</div>
  </ContainerModal>
</template>

<script>
import IconArrowGoto from './IconArrowGoto.vue'
import { useVolunteerStore } from '@/stores/VolunteerStore'
import ContainerModal from '@/components/ContainerModal.vue'
import IconSpinner from '@/components/IconSpinner.vue'
import PaginationController from '@/components/PaginationController.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    IconArrowGoto,
    ContainerModal,
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
      pageSize: 15
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
    updateVolunteerListLenght(length) {
      this.pageSize = length
      this.volunteerStore.volunteersPage.pageable.pageNumber = 0
      let params = {
        sortOrder: this.sortOrder,
        sortBy: this.sortBy,
        page: this.volunteerStore.volunteersPage.pageable.pageNumber,
        pageSize: length
      }
      this.volunteerStore.getVolunteers(params)
    },
    sortVolunteersList(sortBy) {
      if (this.sortBy === sortBy) {
        // Toggle sort order if the sortBy is the same
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        // Keep the current sort order when changing the sortBy
        this.sortBy = sortBy
      }

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
