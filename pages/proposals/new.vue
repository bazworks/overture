<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">New Proposal</h1>
            <button @click="router.back()" class="btn btn-ghost">
                Back
            </button>
        </div>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <span class="loading loading-spinner loading-lg"></span>
        </div>

        <div v-else-if="error" class="alert alert-error">
            {{ error }}
        </div>

        <div v-else>
            <ProposalForm :fields="fields" :initial-data="formData" @submit="handleSubmit" @cancel="router.back()" />
        </div>
    </div>
</template>

<script setup>
import { TemplateParser } from '~/utils/templateParser'

const router = useRouter()
const route = useRoute()
const loading = ref(true)
const error = ref(null)
const fields = ref([])
const formData = ref({})

const fetchTemplateAndAnalyze = async () => {
    try {
        const templateId = route.query.templateId
        if (!templateId) {
            throw new Error('Template ID is required')
        }

        // TODO: Replace with actual API call to get template content
        const templateContent = `
            Dear {{client_name}},
            
            Thank you for considering our services. Here's our proposal for {{project_name}}.
            
            Project Details:
            {{project_description}}
            
            Bill of Materials:
            {{items_table}}
            
            Total Amount: {{total_amount}}
            Discount: {{discount_percentage}}%
            
            Best regards,
            {{sender_name}}
        `

        fields.value = TemplateParser.extractFields(templateContent)
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
}

const handleSubmit = async (data) => {
    try {
        // TODO: Implement proposal creation
        console.log('Proposal data:', data)
        router.push('/proposals')
    } catch (e) {
        error.value = e.message
    }
}

onMounted(() => {
    fetchTemplateAndAnalyze()
})
</script>