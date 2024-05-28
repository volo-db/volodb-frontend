<template>
 <div class="overflow-x-auto" v-bind="$attrs">
    <table class="w-full" v-if="projectStore.projectsPage">
      <thead>
        <tr>
          <td
            v-for="(title, index) in tableHead"
            @click="projectStore.fetchSortedProjects(sortParameter[index])"
            :key="index"
            class="pb-3 text-vologray-700 text-sm cursor-pointer"
            :class="{ 'pl-4': index === 0 }"
            :style="{
              color: projectStore.activeSortProperty === sortParameter[index] ? 'blue' : ''
            }"
          >
            {{ title }}
            <IconTableSortArrows
              :upArrowColor="
                sortParameter[index] === projectsStore.activeSortProperty &&
                projectStore.sortOrder === 'asc'
                  ? 'blue'
                  : 'lightgrey'
              "
              :downArrowColor="
                sortParameter[index] === projectsStore.activeSortProperty &&
                projectsStore.sortOrder === 'desc'
                  ? 'blue'
                  : 'lightgrey'
              "
              class="pl-2 inline w-5"
            />
          </td>
        </tr>
      </thead>
      <tbody class="bg-white outline outline-white rounded">
        <tr
          class="border-b h-14 cursor-pointer hover:text-voloblue-100 hover:bg-gray-50"
          v-for="project of projectStore.projectsPage.content"
          :key="project.id"
          @click="goToDetails(project.id)"
        >
          <td class="font-bold pl-4">{{ project.person.lastname }}</td>
          <td class="font-bold">{{ project.person.firstname }}</td>
          <td>{{ project.birthplace }}</td>
          <td>2023/24</td>
          <td>2/5</td>
          <td>25/25</td>
          <td class="text-voloblue-200"><IconArrowGoto /></td>
        </tr>
        <PaginationController class="w-full" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { useProjectStore } from '@/stores/ProjectStore.js'
import { useRouter } from 'vue-router'
import PaginationController from '@/components/PaginationController.vue'
import IconTableSortArrows from './IconTableSortArrows.vue'
import IconArrowGoto from './IconArrowGoto.vue'
// import ModalContainer from '@/components/ContainerModal.vue'
// import IconSpinner from '@/components/IconSpinner.vue'

export default {
    components: {
    IconArrowGoto,
    // ModalContainer,
    // IconSpinner,
    PaginationController,
    IconTableSortArrows
  },
    setup: () => {
    const projectStore = useProjectStore()
    const router = useRouter()
    return { projectStore, router }
  },
}
</script>
