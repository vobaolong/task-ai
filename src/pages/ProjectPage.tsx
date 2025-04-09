/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project page for the app
 */

import Head from '@/components/Head'
import { Page, PageHeader, PageContent, PageList } from '@/components/Page'
import ProjectCard from '@/components/ProjectCard'

import ProjectFormDialog from '@/components/ProjectFormDialog'
import ProjectSearchField from '@/components/ProjectSearchField'
import TopAppBar from '@/components/TopAppBar'
import { Button } from '@/components/ui/button'
import { Models } from 'appwrite'
import { Plus } from 'lucide-react'
import { useFetcher, useLoaderData } from 'react-router'
import type { SearchingState } from '@/components/ProjectSearchField'
import { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
type DateType = {
  projects: Models.DocumentList<Models.Document>
}

const ProjectPage = () => {
  const fetcher = useFetcher()
  const fetcherData = fetcher.data as DateType
  const loaderData = useLoaderData() as DateType
  const { projects } = fetcherData || loaderData
  const [searchingState, setSearchingState] = useState<SearchingState>('idle')

  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleProjectSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
      const submitTarget = e.currentTarget?.form

      searchTimeout.current = setTimeout(async () => {
        setSearchingState('searching')
        await fetcher.submit(submitTarget)
        setSearchingState('idle')
      }, 1000)
      setSearchingState('loading')
    },
    []
  )
  return (
    <>
      <Head title='My projects - TaskAI' />
      <TopAppBar title='My Projects' />
      <Page>
        <PageHeader>
          <div className='flex items-center gap-3'>
            <PageContent>My Projects</PageContent>

            <ProjectFormDialog method='POST'>
              <Button variant='secondary' size='icon'>
                <Plus />
              </Button>
            </ProjectFormDialog>
          </div>
          <fetcher.Form method='get' action='/app/projects'>
            <ProjectSearchField
              searchingState={searchingState}
              handleChange={handleProjectSearch}
            />
          </fetcher.Form>
        </PageHeader>

        <PageList>
          <div className='flex items-center h-8 border-b'>
            <div className='text-sm'>{projects.total} projects</div>
          </div>
          <div className={cn(searchingState === 'searching' && 'opacity-25')}>
            {projects.documents.map((project) => (
              <ProjectCard key={project.$id} project={project} />
            ))}

            {projects.total === 0 && (
              <div className='flex items-center justify-center mt-4 text-center text-muted-foreground h-14'>
                No projects found
              </div>
            )}
          </div>
        </PageList>
      </Page>
    </>
  )
}

export default ProjectPage
