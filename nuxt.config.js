export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss'
    ],
    supabase: {
        redirect: false
    }
}) 