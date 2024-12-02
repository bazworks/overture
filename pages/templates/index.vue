<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Proposal Templates</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="template in templates" :key="template.id" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ template.name }}</h2>
                    <p>{{ template.description }}</p>
                    <div class="card-actions justify-end">
                        <button @click="createProposal(template)" class="btn btn-primary">
                            Use Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()
const templates = ref([])
const { templates: templatesApi } = useSupabaseClient()

const fetchTemplates = async () => {
    try {
        templates.value = await templatesApi.list()
    } catch (error) {
        console.error('Failed to fetch templates:', error)
    }
}

const createProposal = (template) => {
    router.push({
        path: '/proposals/new',
        query: { templateId: template.id }
    })
}

onMounted(() => {
    fetchTemplates()
})
</script>