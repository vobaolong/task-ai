/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Loader for the completed task page
 */

import { databases, Query } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID

const getTasks = async () => {
  try {
    return await databases.listDocuments(DATABASE_ID, TASKS_COLLECTION_ID, [
      Query.equal('completed', true), // get only completed tasks
      Query.orderDesc('$updatedAt'), // order tasks by updated at
      Query.equal('userId', getUserId() as string) // get only tasks for the current user
    ])
  } catch (error) {
    console.error(error)
    throw new Error('Error getting completed task')
  }
}

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}

export default completedTaskLoader
