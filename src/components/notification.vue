<template>
    <div class="absolute flex justify-center items-center top-10 w-full">
        <div
            :class="`rounded-lg shadow-xl break-normal  truncate flex justify-center animate-fade items-center  w-90  px-10 py-4 h-auto  text-center text-white font-bold ${data.isEnter ? ' bg-green-500' : 'bg-red-500'}`"
        >{{ data.description }}</div>
    </div>
</template>

<script>
export default {
    props: ['data'],
}
</script>



 