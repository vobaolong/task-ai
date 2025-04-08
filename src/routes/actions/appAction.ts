/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App actions for the app
 */

import { databases } from '@/lib/appwrite'
import { generateUniqueId, getUserId } from '@/lib/utils'
import { Task } from '@/types'
import type { ActionFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID
//
const createTask = async (data: Task) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      generateUniqueId(),
      { ...data, userId: getUserId() }
    )
  } catch (error) {
    console.error(error)
  }
}

const updateTask = async (data: Task) => {
  const documentId = data.id
  if (!documentId) throw new Error('Task id not found')
  delete data.id

  try {
    return await databases.updateDocument(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      documentId,
      data
    )
  } catch (error) {
    console.error(error)
  }
}

const appAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Task
  if (request.method === 'POST') {
    return await createTask(data)
  }
  if (request.method === 'PUT') {
    return await updateTask(data)
  }
}

export default appAction
