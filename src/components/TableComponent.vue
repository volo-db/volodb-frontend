<template>
    <table>
    <thead>
      <tr>
        <td class="pr-8 pb-3 pl-3 text-gray-500 text-sm">Vorname<img :src="listSortArrows" class="pl-2 inline" /></td>
        <td class="pr-8 pb-3 text-gray-500 text-sm">Name<img :src="listSortArrows" class="pl-2 inline" /></td>
        <td class="pr-8 pb-3 text-gray-500 text-sm">Einsatzstelle<img :src="listSortArrows" class="pl-2 inline" /></td>
        <td class="pr-8 pb-3 text-gray-500 text-sm">Jahrgang<img :src="listSortArrows" class="pl-2 inline" /></td>
        <td class="pr-8 pb-3 text-gray-500 text-sm">Unterlagen<img :src="listSortArrows" class="pl-2 inline" /></td>
        <td class="pr-8 pb-3 text-gray-500 text-sm">
          gebuchte Seminare<img :src="listSortArrows" class="pl-2 inline" />
        </td>
      </tr>
    </thead>
    <tbody class="bg-white outline outline-white rounded">
      <tr class="border-b h-11">
        <td class="pr-8 pl-3 font-bold">Müller</td>
        <td class="pr-8 font-bold">Tobias</td>
        <td class="pr-8">München</td>
        <td class="pr-8">2023/24</td>
        <td class="pr-8">2/5</td>
        <td class="pr-8">25/25</td>
        <td class="text-blue-400">></td>
      </tr>
      <tr class="border-b h-11">
        <td class="pr-8 pl-3 font-bold">Friedmann</td>
        <td class="pr-8 font-bold">Felicitas</td>
        <td class="pr-8">Leipzig</td>
        <td class="pr-8">2023/24</td>
        <td class="pr-8">3/5</td>
        <td class="pr-8">10/25</td>
        <td class="pr-3 text-blue-400">></td>
      </tr>
      <tr class="border-b h-11">
        <td class="pl-3 font-bold">Volk</td>
        <td class="font-bold">Theresa</td>
        <td>Berlin</td>
        <td>2021/22</td>
        <td>5/5</td>
        <td>25/25</td>
        <td class="text-blue-400">></td>
      </tr>
      <tr>
        <td class="bg-white text-blue-600 text-center" colspan="7">Alle laden</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import listSortArrows from '../assets/logos/list-sort-arrows.svg'
export default {
    data() {
        return {
            listSortArrows
        }
    }
}
</script>
