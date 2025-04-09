/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project context for the app
 */

import type { Models } from 'appwrite'
import { createContext, useContext } from 'react'

type ProjectProviderProps = {
  project: Models.DocumentList<Models.Document>
  children: React.ReactNode
}

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null)

export const ProjectProvider = ({
  project,
  children
}: ProjectProviderProps) => {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => useContext(ProjectContext)
