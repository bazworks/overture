<template>
    <div class="form-control relative">
        <input type="text" v-model="searchQuery" @focus="showDropdown = true" @blur="handleBlur"
            class="input input-bordered w-full" :placeholder="field.label" :required="field.required" />

        <div v-if="showDropdown && filteredOptions.length"
            class="absolute top-full left-0 right-0 mt-1 bg-base-100 shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
            <ul class="menu menu-compact">
                <li v-for="option in filteredOptions" :key="option.id">
                    <a @mousedown="selectOption(option)" class="hover:bg-base-200">
                        {{ option.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Object],
        default: ''
    },
    field: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const showDropdown = ref(false)
const options = ref([])
const loading = ref(false)

const filteredOptions = computed(() => {
    return options.value.filter(option =>
        option.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const handleBlur = () => {
    setTimeout(() => {
        showDropdown.value = false
    }, 200)
}

const selectOption = (option) => {
    searchQuery.value = option.name
    emit('update:modelValue', option)
    showDropdown.value = false
}

// Load options from API if endpoint is provided
watch(searchQuery, async (newQuery) => {
    if (props.field.options?.apiEndpoint && newQuery.length > 2) {
        loading.value = true
        try {
            const response = await fetch(`${props.field.options.apiEndpoint}?q=${newQuery}`)
            options.value = await response.json()
        } catch (error) {
            console.error('Failed to fetch options:', error)
        } finally {
            loading.value = false
        }
    }
}, { debounce: 300 })
</script>