/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Loader for the today task page
 */

import { databases, Query } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import startOfToday from 'date-fns/startOfToday'
import startOfTomorrow from 'date-fns/startOfTomorrow'
import type { LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID

const getTasks = async () => {
  try {
    return await databases.listDocuments(DATABASE_ID, TASKS_COLLECTION_ID, [
      Query.equal('completed', false), // get only uncompleted tasks
      Query.and([
        Query.greaterThanEqual('due_date', startOfToday().toISOString()),
        Query.lessThan('due_date', startOfTomorrow().toISOString())
      ]), // get task for today
      Query.equal('userId', getUserId() as string) // get only tasks for the current user
    ])
  } catch (error) {
    console.error(error)
    throw new Error('Error getting today task')
  }
}

const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks()
  return { tasks }
}

export default todayTaskLoader
