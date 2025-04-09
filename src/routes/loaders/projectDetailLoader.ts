import { databases } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID

const getProject = async (projectId: string) => {
  try {
    const project = await databases.getDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      projectId
    )

    if (project.userId !== getUserId()) {
      throw new Error('Project not found')
    }

    return project
  } catch (error) {
    console.error(error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error('Error getting project')
  }
}

const projectDetailLoader: LoaderFunction = async ({ params }) => {
  const { projectId } = params as { projectId: string }
  const project = await getProject(projectId)
  return { project }
}

export default projectDetailLoader
