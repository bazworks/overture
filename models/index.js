/**
 * @typedef {Object} Template
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} googleDocsId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} FormField
 * @property {string} key
 * @property {string} label
 * @property {'text'|'table'|'number'|'search'} type
 * @property {boolean} required
 * @property {Object} [options]
 * @property {string} [options.apiEndpoint]
 * @property {*} [options.defaultValue]
 * @property {Object} [options.validation]
 * @property {number} [options.validation.min]
 * @property {number} [options.validation.max]
 * @property {string} [options.validation.pattern]
 */

/**
 * @typedef {Object} Proposal
 * @property {string} id
 * @property {string} templateId
 * @property {string} clientId
 * @property {'draft'|'sent'|'accepted'|'rejected'} status
 * @property {Object.<string,*>} formData
 * @property {string} googleDocsId
 * @property {string} [pdfId]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} company
 * @property {string} [phone]
 * @property {string} [address]
 */

export const Models = {} // Empty export just to make the file a module 