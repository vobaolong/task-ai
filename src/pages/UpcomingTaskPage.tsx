/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Upcoming task page for the app
 */

// Components
import Head from '@/components/Head'
import { Page, PageContent, PageHeader, PageList } from '@/components/Page'
import TaskCard from '@/components/TaskCard'
import TaskEmptyState from '@/components/TaskEmptyState'
import TopAppBar from '@/components/TopAppBar'
import { Models } from 'appwrite'
import { CheckCircle2 } from 'lucide-react'
import { useLoaderData } from 'react-router'

const UpcomingTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Upcoming - TaskAI' />
      <TopAppBar title='Upcoming' taskCount={tasks.total} />
      <Page>
        <PageHeader>
          <PageContent>Upcoming</PageContent>
          {tasks.total > 0 && (
            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
              <CheckCircle2 size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>
        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                dueDate={due_date}
                project={project}
              />
            )
          )}

          {!tasks.total && <TaskEmptyState type='upcoming' />}
        </PageList>
      </Page>
    </>
  )
}

export default UpcomingTaskPage
