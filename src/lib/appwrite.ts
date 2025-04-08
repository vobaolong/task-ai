/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Appwrite client for the app
 */

import { Client, Databases, ID, Query } from 'appwrite'

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client()
client.setProject(APPWRITE_PROJECT_ID)
client.setEndpoint(APPWRITE_ENDPOINT)

const databases = new Databases(client)
export { databases, ID, Query }
