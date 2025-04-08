/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Loader for the upcoming task page
 */

import { databases, Query } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import { startOfToday } from 'date-fns'
import type { LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID

const getTasks = async () => {
  try {
    return await databases.listDocuments(DATABASE_ID, TASKS_COLLECTION_ID, [
      Query.equal('completed', false), // get only uncompleted tasks
      Query.isNotNull('due_date'), // get only tasks with a due date
      Query.greaterThanEqual('due_date', startOfToday().toISOString()), // get only tasks with a due date greater than or equal to today
      Query.orderAsc('due_date'), // order tasks by due date
      Query.equal('userId', getUserId() as string) // get only tasks for the current user
    ])
  } catch (error) {
    console.error(error)
    throw new Error('Error getting upcoming task')
  }
}

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}

export default upcomingTaskLoader
