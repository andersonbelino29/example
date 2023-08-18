import React from 'react'
import { Box, Breadcrumbs, Link, Typography, ButtonBase } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

interface BreadcrumbItem {
  title: string
}

interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[]
  title: string
  returnIcon?: boolean
}

const Breadcrumb = ({ breadcrumbItems, title, returnIcon = false }: BreadcrumbProps) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={3}>
      <Box display='flex' alignItems='center' gap={2}>
        {returnIcon && (
          <ButtonBase
            onClick={() => router.back()}
            sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
          >
            <Icon icon='tabler:arrow-back-up' fontSize='1.625rem' />
          </ButtonBase>
        )}
        <Typography variant='h4'>{title}</Typography>
      </Box>
      <Breadcrumbs>
        {breadcrumbItems.map((item, key) => (
          <Link sx={{ color: theme.palette.text.secondary }} key={key}>
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb
