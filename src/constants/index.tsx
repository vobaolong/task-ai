/**
 * @copyright 2025 danielDev
 * @license Apache-2.0
 * @description Constants for the app
 */

import { Calendar1, CircleCheck, CalendarDays, Inbox } from 'lucide-react'

export const SOCIAL_LINKS = [
  {
    href: 'https://youtube.com/vobaolong317',
    label: 'YouTube'
  },
  {
    href: 'https://linkedin.com/in/vobaolong317',
    label: 'LinkedIn'
  },
  {
    href: 'https://github.com/vobaolong317',
    label: 'GitHub'
  }
] as const

export const SIDEBAR_LINKS = [
  {
    href: '/app/inbox',
    label: 'Inbox',
    icon: Inbox
  },
  {
    href: '/app/today',
    label: 'Today',
    icon: Calendar1
  },
  {
    href: '/app/upcoming',
    label: 'Upcoming',
    icon: CalendarDays
  },
  {
    href: '/app/completed',
    label: 'Completed',
    icon: CircleCheck
  }
] as const

export const PROJECT_COLORS = [
  {
    name: 'Slate',
    hex: '#64748b'
  },
  {
    name: 'Red',
    hex: '#ef4444'
  },
  {
    name: 'Orange',
    hex: '#f97316'
  },
  {
    name: 'Amber',
    hex: '#f59e0b'
  },
  {
    name: 'Yellow',
    hex: '#eab308'
  },
  {
    name: 'Lime',
    hex: '#84cc16'
  },
  {
    name: 'Green',
    hex: '#22c55e'
  },
  {
    name: 'Emerald',
    hex: '#10b981'
  },
  {
    name: 'Teal',
    hex: '#06b6d4'
  },
  {
    name: 'Cyan',
    hex: '#06b6d4'
  },
  {
    name: 'Sky',
    hex: '#0ea5e9'
  },
  {
    name: 'Blue',
    hex: '#06b6d4'
  },
  {
    name: 'Indigo',
    hex: '#6366f1'
  },
  {
    name: 'Violet',
    hex: '#8b5cf6'
  },
  {
    name: 'Purple',
    hex: '#a855f7'
  },
  {
    name: 'Fuchsia',
    hex: '#d946ef'
  },
  {
    name: 'Pink',
    hex: '#ec4899'
  },
  {
    name: 'Rose',
    hex: '#f43f5e'
  }
] as const
