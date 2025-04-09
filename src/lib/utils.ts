/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Utility functions for the app
 */

import { clsx, type ClassValue } from 'clsx'
import {
  format,
  formatRelative,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfToday
} from 'date-fns'
import { redirect } from 'react-router'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert a string to title case
export function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

// Format the date to a custom string (e.g. "Today", "Yesterday", "Tomorrow", "Next week", "Next month", "Next year")
export function formatCustomDate(date: string | number | Date) {
  const today = new Date()

  const relativeDay = formatRelative(date, today).split(' at ')[0]

  const relativeDays = [
    'Today',
    'Yesterday',
    'Tomorrow',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  if (relativeDays.includes(relativeDay)) {
    return relativeDay
  }

  if (isSameYear(date, today)) {
    return format(date, 'dd MMM')
  } else {
    return format(date, 'dd MMM yyyy')
  }
}

// Return the color class for the task due date
export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean
): string | undefined {
  if (dueDate === null || completed === undefined) return
  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500'
  }
  if (isToday(dueDate)) {
    return 'text-emerald-500'
  }
  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500'
  }
}

/**
 * @returns {string} The unique id for the task
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).slice(8) + Date.now().toString(36)
}

// Redirect user to the auth sync page if the userId is not found in the local storage or return the userId

export function getUserId(): string | null {
  const clerkUserId = localStorage.getItem('clerkUserId')
  if (!clerkUserId && window.location.pathname !== '/auth-sync') {
    redirect('/auth-sync')
    return ''
  }
  return clerkUserId
}

// Truncate a string to a maximum length
export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}
