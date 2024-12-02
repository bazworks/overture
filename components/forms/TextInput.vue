<template>
    <div class="form-control">
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            class="input input-bordered w-full" :placeholder="field.label" :required="field.required"
            :pattern="field.options?.validation?.pattern" />
        <label class="label" v-if="field.options?.validation?.pattern">
            <span class="label-text-alt text-error">{{ validationMessage }}</span>
        </label>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    field: {
        type: Object,
        required: true
    }
})

defineEmits(['update:modelValue'])

const validationMessage = computed(() => {
    if (props.field.options?.validation?.pattern) {
        return props.field.options.validation.message || 'Please match the requested format'
    }
    return ''
})
</script>