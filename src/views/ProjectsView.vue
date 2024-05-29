<template>
  <main class="bg-vologray-100 px-8">
    <div class="flex justify-between pt-6">
      <SearchBar placeholder="Suche nach Einsatzstellen" />
      <ButtonStandard @click.prevent="newProjectModal = true">Einsatzstelle anlegen</ButtonStandard>
      <ContainerModal v-if="newProjectModal">
        <ProjectFormular @close="newProjectModal = false" />
      </ContainerModal>
    </div>

    <ProjectTable class="w-full mt-12" />
  </main>
</template>

<script>
import ButtonStandard from '@/components/ButtonStandard.vue'
import ContainerModal from '@/components/ContainerModal.vue'
import ProjectTable from '@/components/ProjectTable.vue'
import { useProjectStore } from '@/stores/ProjectStore'
import SearchBar from '@/components/SearchBar.vue'
import ProjectFormular from '@/components/ProjectFormular.vue'

export default {
  name: 'ProjectsView',
  components: { ButtonStandard, ProjectTable, SearchBar, ContainerModal, ProjectFormular },
  setup: () => {
    const projectStore = useProjectStore()
    return { projectStore }
  },
  data() {
    return {
      newProjectModal: false
    }
  }
}
</script>
