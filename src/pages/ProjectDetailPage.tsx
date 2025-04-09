/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Project detail page for the app
 */

import Head from '@/components/Head'
import { Page, PageContent, PageHeader, PageList } from '@/components/Page'
import ProjectActionMenu from '@/components/ProjectActionMenu'
import TaskCard from '@/components/TaskCard'
import TaskCardSkeleton from '@/components/TaskCardSkeleton'
import TaskCreateButton from '@/components/TaskCreateButton'
import TaskEmptyState from '@/components/TaskEmptyState'
import TaskForm from '@/components/TaskForm'
import TopAppBar from '@/components/TopAppBar'
import { Button } from '@/components/ui/button'
import type { Models } from 'appwrite'
import { MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

const ProjectDetailPage = () => {
  const { project } = useLoaderData<{ project: Models.Document }>()
  console.log(project)

  const projectTasks = project.tasks.filter(
    (i: Models.Document) => !i.completed
  ) as Models.Document[]

  projectTasks.sort((a, b) => {
    return a.due_date < b.due_date ? -1 : 1
  })

  const fetcher = useFetcher()

  const [showTaskForm, setShowTaskForm] = useState<boolean>(false)

  return (
    <>
      <Head title={`${project.name} - TaskAI`} />
      <TopAppBar title={project.name} />
      <Page>
        <PageHeader>
          <div className='flex items-center justify-between'>
            <PageContent>{project.name}</PageContent>
            <ProjectActionMenu
              defaultFormData={{
                id: project.$id,
                name: project.name,
                color_name: project.color_name,
                color_hex: project.color_hex
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                aria-label='More actions'
                className='w-8 h-8 shrink-0'
              >
                <MoreHorizontal />
              </Button>
            </ProjectActionMenu>
          </div>
        </PageHeader>

        <PageList>
          {projectTasks.map(({ $id, content, completed, due_date }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
            />
          ))}

          {fetcher.state !== 'idle' && <TaskCardSkeleton />}
          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!projectTasks.length && !showTaskForm && (
            <TaskEmptyState type='project' />
          )}

          {showTaskForm && (
            <TaskForm
              className='mt-5'
              mode='create'
              onCancel={() => setShowTaskForm(false)}
              defaultFormData={{
                content: '',
                due_date: null,
                project: project.$id
              }}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  method: 'POST',
                  action: '/app',
                  encType: 'application/json'
                })
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  )
}

export default ProjectDetailPage
