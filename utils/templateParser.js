export class TemplateParser {
    static PLACEHOLDER_REGEX = /\{\{([^}]+)\}\}/g;

    static extractFields(templateContent) {
        const matches = [...templateContent.matchAll(this.PLACEHOLDER_REGEX)];
        const fields = [];

        for (const match of matches) {
            const key = match[1].trim();
            const field = {
                key,
                label: this.generateLabel(key),
                type: this.inferFieldType(key),
                required: true
            };

            // Don't add duplicate fields
            if (!fields.find(f => f.key === key)) {
                fields.push(field);
            }
        }

        return fields;
    }

    static generateLabel(key) {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    static inferFieldType(key) {
        if (key.includes('table') || key.includes('items') || key.includes('bom')) {
            return 'table';
        }
        if (key.includes('amount') || key.includes('price') || key.includes('discount')) {
            return 'number';
        }
        if (key.includes('client') || key.includes('customer')) {
            return 'search';
        }
        return 'text';
    }
} 