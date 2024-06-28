<template>
  <!-- SVG NOT READY YET -->
  <svg
    v-if="false"
    :width="`${diagramWidth}px`"
    :height="`${diagramWidth * 0.55}px`"
    xmlns="http://www.w3.org/2000/svg"
    viewbox="0 0 1 1"
  >
    <defs>
      <!-- Diagonal hatch pattern -->
      <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
        <path d="M0,0 L5,5" stroke="#000" stroke-width="2" />
      </pattern>
      <!-- Horizontal hatch pattern -->
      <pattern id="horizontalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
        <path d="M0,5 L10,5" stroke="black" stroke-width="1" />
      </pattern>
      <!-- Vertical hatch pattern -->
      <pattern id="verticalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
        <path d="M5,0 L5,10" stroke="black" stroke-width="1" />
      </pattern>
      <pattern id="dottedPattern" patternUnits="userSpaceOnUse" width="10" height="10">
        <!-- Small circle for the dot -->
        <circle cx="5" cy="5" r="1" fill="black" />
      </pattern>
    </defs>
    <!-- BACKGROUND CIRCLE -->
    <circle
      :cx="center.x"
      :cy="center.y"
      :r="radius"
      stroke="#ddd"
      fill="transparent"
      :stroke-width="strokeWidth"
      :stroke-dasharray="`${radius * pi * 1} ${1000}`"
      stroke-linecap="round"
      :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
    />
    <!-- LAST CIRCLE -->
    <circle
      :cx="center.x"
      :cy="center.y"
      :r="radius"
      stroke="#0025ff"
      fill="transparent"
      :stroke-width="strokeWidth * 0.72"
      :stroke-dasharray="`${radius * pi * 0.8} ${1000}`"
      stroke-linecap="round"
      :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
    />
    <!-- POCKETMONEY -->
    <circle
      :cx="center.x"
      :cy="center.y"
      :r="radius"
      stroke="#FCD12E"
      fill="transparent"
      :stroke-width="strokeWidth * 0.72"
      :stroke-dasharray="`${radius * pi * pocketMoney} ${1000}`"
      stroke-linecap="round"
      :transform="`scale(-1 -1) translate(-${diagramWidth} -${diagramWidth})`"
    />
  </svg>

  <!-- TEXT-VARIANT FOR TRANSITION  -->
  <div>
    <div class="grid grid-cols-[1fr,auto] gap-x-6 w-[250px]">
      <p v-if="salary.pocketMoney != 0">Taschengeld:</p>
      <p v-if="salary.pocketMoney != 0" class="font-medium">
        {{ Number(salary.pocketMoney).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeService != 0">Sachleistungen i.W.v.:</p>
      <p v-if="salary.freeOfChargeService != 0" class="font-medium">
        {{ Number(salary.freeOfChargeService).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeFood != 0">Verpflegung i.W.v.:</p>
      <p v-if="salary.freeOfChargeFood != 0" class="font-medium">
        {{ Number(salary.freeOfChargeFood).toFixed(2) }} €
      </p>
      <p v-if="salary.foodAllowance != 0">Verpflegungszuschuss:</p>
      <p v-if="salary.foodAllowance != 0" class="font-medium">
        {{ Number(salary.foodAllowance).toFixed(2) }} €
      </p>
      <p v-if="salary.freeOfChargeAccommodation != 0">Unterkunft i.W.v.:</p>
      <p v-if="salary.freeOfChargeAccommodation != 0" class="font-medium">
        {{ Number(salary.freeOfChargeAccommodation).toFixed(2) }} €
      </p>
      <p v-if="salary.accomodationAllowance != 0">Unterkunftszuschuss:</p>
      <p v-if="salary.accomodationAllowance != 0" class="font-medium">
        {{ Number(salary.accomodationAllowance).toFixed(2) }} €
      </p>
    </div>
    <hr class="mt-2 mb-2" />
    <div class="flex justify-between">
      <p>Summe:</p>
      <p>{{ Number(sum).toFixed(2) }} €</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const pi = 3.1415926536

    return { pi }
  },
  props: {
    diagramWidth: {
      type: Number,
      default: 250
    },
    salary: {
      type: Object,
      required: true
    }
  },
  computed: {
    center() {
      return { x: this.diagramWidth / 2, y: this.diagramWidth / 2 }
    },
    radius() {
      return this.diagramWidth / 2 - this.strokeWidth / 2
    },
    sum() {
      return (
        this.salary.pocketMoney +
        this.salary.freeOfChargeService +
        this.salary.foodAllowance +
        this.salary.freeOfChargeFood +
        this.salary.accomodationAllowance +
        this.salary.freeOfChargeAccommodation
      )
    },
    strokeWidth() {
      return this.diagramWidth * 0.1
    },
    pocketMoney() {
      return this.salary.pocketMoney / this.sum
    }
  }
}
</script>
