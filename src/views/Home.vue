
<template>
    <div
        class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:(py-4 flex items-center space-y-0 space-x-6)"
    >
        <div class="text-center space-y-2 sm:text-left">
            <div class="space-y-0.5">
                <p class="text-lg text-black font-semibold">Erin Lindford</p>
                <p class="text-gray-500 font-medium">Product Engineer</p>
            </div>
            <button
                class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
            >{{ $store.state.name }}</button>
        </div>
    </div>
</template>



<script >

</script>
