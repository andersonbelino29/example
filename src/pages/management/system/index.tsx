import { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { Tooltip } from '@mui/material'

import Icon from 'src/@core/components/icon'
import PageHeader from 'src/@core/components/page-header'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useGetSystemPaginate, usePostDeleteSystem } from 'src/@core/hooks/useSystem'
import { useDialog } from 'src/@core/components/dialogAlerts/Alert'
import { DialogType } from 'src/@core/components/dialogAlerts/types'
import Breadcrumb from 'src/@core/components/breadcrumb/Breadcrumb'
import CustomDataGrid from 'src/@core/components/datagrid/CustomDataGrid'

import DialogAddSystem from './modal'
import { SystemDataInterface } from 'src/@core/types/system.interface'

interface CellType {
  row: SystemDataInterface
}

const actionSystemEnum = {
  UPDATE: 'update',
  CREATE: 'create',
  VIEW: 'view'
} as const

type ActionTypeSystem = (typeof actionSystemEnum)[keyof typeof actionSystemEnum]

const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'id',
    minWidth: 240,
    headerName: 'id',
    filterable: false,
    hideable: false,
    renderCell: ({ row }: CellType) => <Typography sx={{ ml: 2, color: 'text.secondary' }}>{row.id}</Typography>
  },
  {
    flex: 0.35,
    minWidth: 290,
    field: 'name',
    headerName: 'Descrição',
    filterable: false,
    renderCell: ({ row }: CellType) => <Typography sx={{ ml: 2, color: 'text.secondary' }}>{row.name}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'created_at',
    headerName: 'Data Ciração',
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {format(new Date(row.created_at), 'dd/MM/yyyy HH:mm:ss')}
      </Typography>
    )
  }
]

const breadcrumbItems = [{ title: 'Gerenciamento' }, { title: 'Categoria' }]

const SystemTable = () => {
  const ability = useContext(AbilityContext)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { data, isLoading, refetch } = useGetSystemPaginate(paginationModel.page + 1, paginationModel.pageSize)
  const [selectedSystem, setSelectedSystem] = useState<SystemDataInterface | null>(null)
  const [action, setAction] = useState<ActionTypeSystem>(actionSystemEnum.CREATE)
  const postDeleteSystem = usePostDeleteSystem()
  const { showDialog } = useDialog()

  const handleSystemAction = (rowData: SystemDataInterface | null, action: ActionTypeSystem) => {
    setAction(action)
    setSelectedSystem(rowData)
    setEditDialogOpen(!editDialogOpen)
  }

  const handleEditSystem = (rowData: SystemDataInterface) => {
    handleSystemAction(rowData, actionSystemEnum.UPDATE)
  }

  const handleViewSystem = (rowData: SystemDataInterface) => {
    handleSystemAction(rowData, actionSystemEnum.VIEW)
  }

  const handleDeleteSystem = async (id: number) => {
    showDialog({
      type: DialogType.Question,
      title: 'Excluir Permissão?',
      description: 'Tem certeza de que deseja excluir esta permissão? Esta ação não pode ser desfeita!'
    }).then(async () => {
      await handledeleteSystem(id)
    })
  }

  const handledeleteSystem = async (id: number) => {
    try {
      await postDeleteSystem.mutateAsync(id)
      refetch()
    } catch (err) {
      showDialog({
        type: DialogType.Error,
        title: 'Ops, algo deu errado!',
        description: postDeleteSystem.mutateError?.errors[0]?.message
      })

      return
    }
  }

  const handleDialogToggle = () => {
    handleSystemAction(null, actionSystemEnum.CREATE)
  }

  const handlesubmit = () => {
    refetch()
    setEditDialogOpen(!editDialogOpen)
  }

  const handleRefresh = () => {
    refetch()
  }

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      filterable: false,
      hideable: false,
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Visualizar Software'>
            <IconButton onClick={() => handleViewSystem(row)}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar Software'>
            <IconButton onClick={() => handleEditSystem(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Remover Software'>
            <IconButton
              onClick={() => {
                if (row.id !== undefined) {
                  handleDeleteSystem(row.id)
                }
              }}
            >
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <>
      <Breadcrumb title='Lista de Categoria' breadcrumbItems={breadcrumbItems} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title=''
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Aproveite os recursos exclusivos para otimizar sua experiência na plataforma. Escolha os Softwares{' '}
                <br />
                ideais para suas tarefas e alcance seu potencial máximo.
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
              sx={{
                p: 5,
                pb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {ability?.can('create', 'Permissoes') ? (
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
                  Criar nova Categoria
                </Button>
              ) : null}
              <Button sx={{ mb: 2 }} variant='contained' onClick={handleRefresh}>
                Atualizar
              </Button>
            </Box>
            <CustomDataGrid
              gridName='gridSystem'
              rows={data?.payload || []}
              columns={columns}
              rowCount={data ? data.total : 0}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationMode='server'
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              loading={isLoading}
            />
          </Card>
        </Grid>
      </Grid>
      <DialogAddSystem
        data={selectedSystem}
        open={editDialogOpen}
        action={action}
        onClose={handleDialogToggle}
        onSubmit={handlesubmit}
      />
    </>
  )
}

SystemTable.acl = {
  action: 'read',
  subject: 'System'
}

export default SystemTable
