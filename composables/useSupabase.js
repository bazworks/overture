export const useSupabaseClient = () => {
    const client = useSupabaseClient()

    const templates = {
        async list() {
            const { data, error } = await client
                .from('templates')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data
        },

        async get(id) {
            const { data, error } = await client
                .from('templates')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data
        },

        async create(template) {
            const { data, error } = await client
                .from('templates')
                .insert(template)
                .select()
                .single()

            if (error) throw error
            return data
        }
    }

    const proposals = {
        async create(proposal) {
            const { data, error } = await client
                .from('proposals')
                .insert(proposal)
                .select()
                .single()

            if (error) throw error
            return data
        },

        async update(id, updates) {
            const { data, error } = await client
                .from('proposals')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },

        async list() {
            const { data, error } = await client
                .from('proposals')
                .select(`
                    *,
                    template:templates(*),
                    client:clients(*)
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            return data
        }
    }

    const clients = {
        async search(query) {
            const { data, error } = await client
                .from('clients')
                .select('*')
                .ilike('name', `%${query}%`)
                .limit(10)

            if (error) throw error
            return data
        },

        async create(client) {
            const { data, error } = await client
                .from('clients')
                .insert(client)
                .select()
                .single()

            if (error) throw error
            return data
        }
    }

    return {
        templates,
        proposals,
        clients
    }
} 