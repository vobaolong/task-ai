/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project actions for the app
 */

import { redirect, type ActionFunction } from 'react-router'
import { databases } from '@/lib/appwrite'
import { generateUniqueId, getUserId } from '@/lib/utils'
import type { Project, ProjectForm } from '@/types'
import { Models } from 'appwrite'
import { generateProjectTask } from '@/apis/googleAI'

type aiGenTask = {
  content: string
  due_date: Date | null
}
// Environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID

// Create a project
const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null
  const aiTaskGen = data.ai_task_gen
  const taskGenPrompt = data.task_gen_prompt

  let aiGeneratedTasks: aiGenTask[] = []
  // Create a project
  try {
    project = await databases.createDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      generateUniqueId(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId()
      }
    )
  } catch (error) {
    console.error('Error creating project', error)
  }
  // Generate project tasks
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse(
        (await generateProjectTask(taskGenPrompt)) || '[]'
      )
    } catch (error) {
      console.error('Error generating project tasks', error)
    }
  }

  if (aiGeneratedTasks.length > 0) {
    const promises = aiGeneratedTasks.map((task) => {
      return databases.createDocument(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        generateUniqueId(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId()
        }
      )
    })

    try {
      await Promise.all(promises)
    } catch (error) {
      console.error('Error creating project tasks', error)
    }
  }
  return redirect(`/app/projects/${project?.$id}`)
}

const updateProject = async (data: Project) => {
  const documentId = data.id
  if (!documentId) throw new Error('Project id not found')

  try {
    return await databases.updateDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      documentId,
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex
      }
    )
  } catch (error) {
    console.error(error)
  }
}

const deleteProject = async (data: Project) => {
  const documentId = data.id
  if (!documentId) throw new Error('Project id not found')
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      documentId
    )
  } catch (error) {
    console.error(error)
  }
}

const projectAction: ActionFunction = async ({ request }) => {
  const data = (await request.json()) as Project
  if (request.method === 'POST') {
    return await createProject(data as ProjectForm)
  }
  if (request.method === 'PUT') {
    return await updateProject(data)
  }
  if (request.method === 'DELETE') {
    return await deleteProject(data)
  }
  throw new Error('Invalid request method')
}

export default projectAction
