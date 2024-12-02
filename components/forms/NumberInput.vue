<template>
    <div class="form-control">
        <input type="number" :value="modelValue" @input="handleInput" class="input input-bordered w-full"
            :placeholder="field.label" :required="field.required" :min="field.options?.validation?.min"
            :max="field.options?.validation?.max" :step="field.options?.validation?.step || 'any'" />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: ''
    },
    field: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
    const value = event.target.value === '' ? '' : Number(event.target.value)
    emit('update:modelValue', value)
}
</script>