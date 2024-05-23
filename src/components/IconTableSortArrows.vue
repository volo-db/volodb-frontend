<template>

<svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.201242" fill-rule="evenodd" clip-rule="evenodd" d="M4.24268 0.575928L8.48532 4.81857H4.24268H3.51667e-05L4.24268 0.575928Z" :fill="upArrowColor"/>
<path opacity="0.201242" fill-rule="evenodd" clip-rule="evenodd" d="M4.24268 11.0613L3.51667e-05 6.81864H4.24268H8.48532L4.24268 11.0613Z" :fill="downArrowColor"/>
</svg>

</template>

<script>
    export default {
        props: {
    upArrowColor: String,
    downArrowColor: String
  } 
    }
</script>