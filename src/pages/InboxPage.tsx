/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Inbox page for the app
 */

// Components
import Head from '@/components/Head'
import { Page, PageContent, PageHeader, PageList } from '@/components/Page'
import TaskCard from '@/components/TaskCard'
import TaskCreateButton from '@/components/TaskCreateButton'
import TaskEmptyState from '@/components/TaskEmptyState'
import TaskForm from '@/components/TaskForm'
import TopAppBar from '@/components/TopAppBar'
import { Models } from 'appwrite'
import { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router'

const InboxPage = () => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const fetcher = useFetcher()

  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>
  }>()

  return (
    <>
      <Head title='Inbox - TaskAI' />
      <TopAppBar title='Inbox' taskCount={20} />
      <Page>
        <PageHeader>
          <PageContent>Inbox</PageContent>
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
          {!showTaskForm && (
            <>
              <TaskCreateButton onClick={() => setShowTaskForm(true)} />
              <TaskEmptyState type='inbox' />
            </>
          )}
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
            />
          )}
        </PageList>
      </Page>
    </>
  )
}

export default InboxPage
