/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Types for the app
 */

type Project = {
  id: string | null
  name: string
  color_name: string
  color_hex: string
}

type ProjectForm = {
  id: string | null
  name: string
  color_name: string
  color_hex: string
  ai_task_gen: boolean
  task_gen_prompt: string
}

type Task = {
  id?: string
  content: string
  due_date: Date | null
  completed?: boolean
  project: Project | null
  userId: string
}

type TaskForm = {
  id?: string
  content: string
  due_date: Date | null
  completed?: boolean
  project: string | null
}

export type { Project, ProjectForm, Task, TaskForm }
