<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-for="field in fields" :key="field.key" class="space-y-2">
            <label :for="field.key" class="block text-sm font-medium text-gray-700">
                {{ field.label }}
            </label>

            <TextInput v-if="field.type === 'text'" v-model="formData[field.key]" :field="field" />

            <NumberInput v-else-if="field.type === 'number'" v-model="formData[field.key]" :field="field" />

            <TableInput v-else-if="field.type === 'table'" v-model="formData[field.key]" :field="field" />

            <SearchableDropdown v-else-if="field.type === 'search'" v-model="formData[field.key]" :field="field" />
        </div>

        <div class="flex justify-end space-x-4">
            <button type="button" class="btn btn-outline" @click="$emit('cancel')">
                Cancel
            </button>
            <button type="submit" class="btn btn-primary">
                Generate Proposal
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    fields: {
        type: Array,
        required: true
    },
    initialData: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['submit', 'cancel'])

const formData = ref(props.initialData)

const handleSubmit = () => {
    emit('submit', formData.value)
}
</script>