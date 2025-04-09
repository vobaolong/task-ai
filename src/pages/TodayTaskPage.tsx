/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Today task page for the app
 */

// Components
import Head from '@/components/Head'
import { Page, PageContent, PageHeader, PageList } from '@/components/Page'
import TaskCard from '@/components/TaskCard'
import TaskCardSkeleton from '@/components/TaskCardSkeleton'
import TaskCreateButton from '@/components/TaskCreateButton'
import TaskEmptyState from '@/components/TaskEmptyState'
import TaskForm from '@/components/TaskForm'
import TopAppBar from '@/components/TopAppBar'
import { Models } from 'appwrite'
import startOfToday from 'date-fns/startOfToday'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

const TodayTaskPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const fetcher = useFetcher()

  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Today - TaskAI' />
      <TopAppBar title='Today' taskCount={tasks.total} />
      <Page>
        <PageHeader>
          <PageContent>Today</PageContent>
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
          {fetcher.state !== 'idle' && <TaskCardSkeleton />}
          {!showTaskForm && (
            <TaskCreateButton onClick={() => setShowTaskForm(true)} />
          )}

          {!tasks.total && !showTaskForm && <TaskEmptyState type='today' />}

          {showTaskForm && (
            <TaskForm
              className='mt-5'
              mode='create'
              onCancel={() => setShowTaskForm(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData), {
                  method: 'POST',
                  action: '/app',
                  encType: 'application/json'
                })
              }}
              defaultFormData={{
                content: '',
                due_date: startOfToday(),
                project: null
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  )
}

export default TodayTaskPage
