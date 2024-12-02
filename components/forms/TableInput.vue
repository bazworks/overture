<template>
    <div class="overflow-x-auto">
        <table class="table w-full">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows" :key="index">
                    <td v-for="col in columns" :key="col.key">
                        <input :type="col.type || 'text'" v-model="row[col.key]"
                            class="input input-bordered input-sm w-full" :required="col.required" />
                    </td>
                    <td>
                        <button @click="removeRow(index)" class="btn btn-error btn-sm">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <button @click="addRow" class="btn btn-primary btn-sm mt-2">
            Add Row
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    field: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const columns = ref(props.field.options?.columns || [
    { key: 'item', label: 'Item', required: true },
    { key: 'quantity', label: 'Quantity', type: 'number', required: true },
    { key: 'price', label: 'Price', type: 'number', required: true }
])

const rows = ref(props.modelValue.length ? [...props.modelValue] : [{}])

const addRow = () => {
    rows.value.push({})
}

const removeRow = (index) => {
    rows.value.splice(index, 1)
}

watch(rows, (newValue) => {
    emit('update:modelValue', newValue)
}, { deep: true })
</script>