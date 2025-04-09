/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description App loader for the app
 */

import { databases, Query } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { Models } from 'appwrite'
import { startOfToday, startOfTomorrow } from 'date-fns'
import { redirect, type LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID
const PROJECTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID

type TaskCounts = {
  inboxTasks: number
  todayTasks: number
}

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>
  taskCounts: TaskCounts
}

const getProjects = async () => {
  try {
    return await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION_ID, [
      Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
      Query.equal('userId', getUserId() as string),
      Query.orderDesc('$createdAt'),
      Query.limit(100)
    ])
  } catch (error) {
    console.error(error)
    throw new Error('Error getting projects')
  }
}

const getTaskCounts = async () => {
  const taskCounts: TaskCounts = {
    inboxTasks: 0,
    todayTasks: 0
  }
  try {
    const today = startOfToday().toISOString()
    const tomorrow = startOfTomorrow().toISOString()

    const { total: totalTodayTasks } = await databases.listDocuments(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      [
        Query.select(['$id']),
        Query.equal('completed', false),
        Query.equal('userId', getUserId() as string),
        Query.limit(1),
        Query.and([
          Query.greaterThanEqual('due_date', today),
          Query.lessThan('due_date', tomorrow)
        ])
      ]
    )
    taskCounts.todayTasks = totalTodayTasks

    const { total: totalInboxTasks } = await databases.listDocuments(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      [
        Query.select(['$id']),
        Query.equal('completed', false),
        Query.equal('userId', getUserId() as string),
        Query.limit(1),
        Query.isNull('project')
      ]
    )
    taskCounts.inboxTasks = totalInboxTasks
  } catch (error) {
    console.error(error)
    throw new Error('Error getting task counts')
  }
  return taskCounts
}
const appLoader: LoaderFunction = async () => {
  const userId = getUserId()

  if (!userId) {
    return redirect('/login')
  }

  const projects = await getProjects()
  const taskCounts = await getTaskCounts()

  return { projects, taskCounts }
}

export default appLoader
