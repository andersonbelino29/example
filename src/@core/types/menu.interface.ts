export interface MenuItem {
  title: string
  icon?: string
  path?: string
  action?: string
  subject?: string
  disabled?: boolean
  externalLink?: boolean
  openInNewTab?: boolean
  children?: MenuItem[]
}
