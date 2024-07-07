<template>
  <div @mousemove="(mouseX = $event.pageX), (mouseY = $event.pageY)" class="relative">
    <div class="" v-if="true">
      <!-- SVG NOT READY YET -->
      <svg
        :width="`${diagramWidth}px`"
        :height="`${diagramWidth * 0.55}px`"
        xmlns="http://www.w3.org/2000/svg"
        viewbox="0 0 1 1"
      >
        <!-- SERVICE -->
        <!-- Free of charge -->
        <path
          id="freeOfChargeService"
          :d="generateHalfRingPath(startingPoints.freeOfChargeService, ratios.freeOfChargeService)"
          fill="#FEF6D8"
          :stroke="strokeColors.freeOfChargeService"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.freeOfChargeService = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'freeOfChargeService'),
              (tooltipText = `Zusätzliche unentgeltliche Leistungen i.W.v.: ${toValidEuro(salary.freeOfChargeService)}`)
          "
          @mouseleave="(strokeColors.freeOfChargeService = ''), (tooltip = false)"
        />
        <!-- Pocketmoney -->
        <path
          id="pocketMoney"
          :d="generateHalfRingPath(startingPoints.pocketMoney, ratios.pocketMoney)"
          fill="#FCD12E"
          :stroke="strokeColors.pocketMoney"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.pocketMoney = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'pocketMoney'),
              (tooltipText = `Taschengeld i.H.v.: ${toValidEuro(salary.pocketMoney)}`)
          "
          @mouseleave="(strokeColors.pocketMoney = ''), (tooltip = false)"
        />
        <!-- ACCOMODATIN -->
        <!-- Free of charge -->
        <path
          id="freeOfChargeAccommodation"
          :d="
            generateHalfRingPath(
              startingPoints.freeOfChargeAccommodation,
              ratios.freeOfChargeAccommodation
            )
          "
          fill="#A0B9FF"
          :stroke="strokeColors.freeOfChargeAccommodation"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.freeOfChargeAccommodation = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'freeOfChargeAccommodation'),
              (tooltipText = `Unterkunft i.W.v.: ${toValidEuro(salary.freeOfChargeAccommodation)}`)
          "
          @mouseleave="(strokeColors.freeOfChargeAccommodation = ''), (tooltip = false)"
        />
        <!-- Allowance -->
        <path
          id="accomodationAllowance"
          :d="
            generateHalfRingPath(startingPoints.accomodationAllowance, ratios.accomodationAllowance)
          "
          fill="#0025FF"
          :stroke="strokeColors.accomodationAllowance"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.accomodationAllowance = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'accomodationAllowance'),
              (tooltipText = `Unterkunftszuschuss i.H.v.: ${toValidEuro(salary.accomodationAllowance)}`)
          "
          @mouseleave="(strokeColors.accomodationAllowance = ''), (tooltip = false)"
        />
        <!-- FOOD -->
        <!-- Free of charge -->
        <path
          id="freeOfChargeFood"
          :d="generateHalfRingPath(startingPoints.freeOfChargeFood, ratios.freeOfChargeFood)"
          fill="#ffd3ad"
          :stroke="strokeColors.freeOfChargeFood"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.freeOfChargeFood = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'freeOfChargeFood'),
              (tooltipText = `Verpflegung i.W.v.: ${toValidEuro(salary.freeOfChargeFood)}`)
          "
          @mouseleave="(strokeColors.freeOfChargeFood = ''), (tooltip = false)"
        />
        <!-- Allowance -->
        <path
          id="foodAllowance"
          :d="generateHalfRingPath(startingPoints.foodAllowance, ratios.foodAllowance)"
          fill="orange"
          :stroke="strokeColors.foodAllowance"
          :stroke-width="strokeWidth"
          @mouseenter="
            (strokeColors.foodAllowance = strokeColors.hovered),
              (tooltip = true),
              (hoverdArc = 'foodAllowance'),
              (tooltipText = `Verpflegungszuschuss i.H.v.: ${toValidEuro(salary.foodAllowance)}`)
          "
          @mouseleave="(strokeColors.foodAllowance = ''), (tooltip = false)"
        />
        <use :xlink:href="`#${hoverdArc}`" />
      </svg>
      <!-- Salary-Sums -->
      <div class="absolute top-0 w-[100%] text-center mt-20 pointer-events-none">
        <p class="text-3xl">{{ toValidEuro(sum) }}</p>
        <p class="text-sm">Auszahlungsbetrag: {{ toValidEuro(cash) }}</p>
      </div>
      <!-- Tooltip -->
      <div
        v-if="tooltip"
        class="fixed flex items-center transform translate-x-4 -translate-y-1 text-white"
        :style="`top: ${mouseY}px; left: ${mouseX - 4}px`"
      >
        <div class="w-2 h-2 border-[6px] border-transparent border-r-black/80"></div>
        <p class="px-2 max-w-60 bg-black/80">{{ tooltipText }}</p>
      </div>
    </div>

    <!-- TEXT-VARIANT FOR TRANSITION  -->
    <div v-if="false">
      <div class="grid grid-cols-[1fr,auto] gap-x-6 w-[290px]">
        <p v-if="salary.pocketMoney != 0">Taschengeld:</p>
        <p v-if="salary.pocketMoney != 0" class="font-medium">
          {{ toValidEuro(salary.pocketMoney) }}
        </p>
        <p v-if="salary.freeOfChargeService != 0">Sachleistungen i.W.v.:</p>
        <p v-if="salary.freeOfChargeService != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeService) }}
        </p>
        <p v-if="salary.freeOfChargeFood != 0">Verpflegung i.W.v.:</p>
        <p v-if="salary.freeOfChargeFood != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeFood) }}
        </p>
        <p v-if="salary.foodAllowance != 0">Verpflegungszuschuss:</p>
        <p v-if="salary.foodAllowance != 0" class="font-medium">
          {{ toValidEuro(salary.foodAllowance) }}
        </p>
        <p v-if="salary.freeOfChargeAccommodation != 0">Unterkunft i.W.v.:</p>
        <p v-if="salary.freeOfChargeAccommodation != 0" class="font-medium">
          {{ toValidEuro(salary.freeOfChargeAccommodation) }}
        </p>
        <p v-if="salary.accomodationAllowance != 0">Unterkunftszuschuss:</p>
        <p v-if="salary.accomodationAllowance != 0" class="font-medium">
          {{ toValidEuro(salary.accomodationAllowance) }}
        </p>
      </div>
      <hr class="mt-2 mb-2" />
      <div class="flex justify-between">
        <p>Summe:</p>
        <p>{{ toValidEuro(sum) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toValidEuro } from '@/utils/currency'

export default {
  setup() {
    const pi = Math.PI

    return { pi, toValidEuro }
  },
  props: {
    diagramWidth: {
      type: Number,
      default: 290
    },
    salary: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hoverdArc: '',
      strokeWidth: 2,
      strokeColors: {
        freeOfChargeService: '',
        pocketMoney: '',
        freeOfChargeAccommodation: '',
        accomodationAllowance: '',
        freeOfChargeFood: '',
        foodAllowance: '',
        hovered: '#555'
      },
      mouseX: 0,
      mouseY: 0,
      tooltip: false,
      tooltipText: 'Hey ho lets go!'
    }
  },
  computed: {
    sum() {
      return (
        this.salary.pocketMoney +
        this.salary.freeOfChargeService +
        this.salary.accomodationAllowance +
        this.salary.freeOfChargeAccommodation +
        this.salary.foodAllowance +
        this.salary.freeOfChargeFood
      )
    },
    cash() {
      return this.salary.pocketMoney + this.salary.accomodationAllowance + this.salary.foodAllowance
    },
    ratios() {
      const freeOfChargeService = Number(this.salary.freeOfChargeService / this.sum)
      const pocketMoney = Number(this.salary.pocketMoney / this.sum)
      const freeOfChargeAccommodation = Number(this.salary.freeOfChargeAccommodation / this.sum)
      const accomodationAllowance = Number(this.salary.accomodationAllowance / this.sum)
      const freeOfChargeFood = Number(this.salary.freeOfChargeFood / this.sum)
      const foodAllowance = Number(this.salary.foodAllowance / this.sum)
      return {
        freeOfChargeService,
        pocketMoney,
        freeOfChargeAccommodation,
        accomodationAllowance,
        freeOfChargeFood,
        foodAllowance
      }
    },
    startingPoints() {
      const freeOfChargeService = 0
      const pocketMoney = freeOfChargeService + this.ratios.freeOfChargeService
      const freeOfChargeAccommodation = pocketMoney + this.ratios.pocketMoney
      const accomodationAllowance =
        freeOfChargeAccommodation + this.ratios.freeOfChargeAccommodation
      const freeOfChargeFood = accomodationAllowance + this.ratios.accomodationAllowance
      const foodAllowance = freeOfChargeFood + this.ratios.freeOfChargeFood

      return {
        freeOfChargeService,
        pocketMoney,
        freeOfChargeAccommodation,
        accomodationAllowance,
        freeOfChargeFood,
        foodAllowance
      }
    }
  },
  methods: {
    polarToCartesian(cx, cy, r, angleInDegrees) {
      const angleInRadians = (angleInDegrees * this.pi) / 180.0
      return {
        x: cx + r * Math.cos(angleInRadians),
        y: cy + r * Math.sin(angleInRadians)
      }
    },
    generateHalfRingPath(start, ratio) {
      const strokeWidth = this.strokeWidth
      const width = this.diagramWidth - 2 * strokeWidth
      const center = { x: width / 2 + strokeWidth, y: width / 2 + strokeWidth }
      const outerR = width / 2
      const innerR = outerR - width * 0.11 // arc-width

      // Calculate the end angle based on the ratio
      const startAngle = 180 + 180 * start // Starting from the top of the circle
      const sweepAngle = 180 * ratio // Sweep angle based on the ratio
      const endAngle = startAngle + sweepAngle // Ending angle

      // Outer arc start and end points
      const outerStart = this.polarToCartesian(center.x, center.y, outerR, startAngle)
      const outerEnd = this.polarToCartesian(center.x, center.y, outerR, endAngle)

      // Inner arc start and end points (drawn in reverse order)
      const innerStart = this.polarToCartesian(center.x, center.y, innerR, endAngle)
      const innerEnd = this.polarToCartesian(center.x, center.y, innerR, startAngle)

      // Generate the path string
      return [
        'M',
        outerStart.x,
        outerStart.y, // Move to the start point of the outer arc
        'A',
        outerR,
        outerR,
        0,
        sweepAngle > 180 ? 1 : 0,
        1,
        outerEnd.x,
        outerEnd.y, // Draw the outer arc
        'L',
        innerStart.x,
        innerStart.y, // Line to the start of the inner arc
        'A',
        innerR,
        innerR,
        0,
        sweepAngle > 180 ? 1 : 0,
        0,
        innerEnd.x,
        innerEnd.y, // Draw the inner arc
        'Z' // Close the path to complete the ring shape
      ].join(' ')
    }
  }
}
</script>
