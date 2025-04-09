import { databases, Query } from '@/lib/appwrite'
import { getUserId } from '@/lib/utils'
import type { LoaderFunction } from 'react-router'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PROJECTS_COLLECTION_ID

const getProjects = async (query: string) => {
  try {
    return await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION_ID, [
      Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']), // get only projects for the current user
      Query.equal('userId', getUserId() as string), // get only projects for the current user
      Query.orderDesc('$createdAt'), // order by created at in descending order
      Query.contains('name', query)
    ])
  } catch (error) {
    console.error(error)
    throw new Error('Error getting projects')
  }
}

const projectsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const projects = await getProjects(query)
  return { projects }
}

export default projectsLoader
