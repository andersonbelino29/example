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
import { SegmentDataInterface } from 'src/@core/types/segment.interface'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useGetSegmentPaginate } from 'src/@core/hooks'
import { usePostDeleteSegment } from 'src/@core/hooks/useSegment'
import { useDialog } from 'src/@core/components/dialogAlerts/Alert'
import { DialogType } from 'src/@core/components/dialogAlerts/types'
import Breadcrumb from 'src/@core/components/breadcrumb/Breadcrumb'
import CustomDataGrid from 'src/@core/components/datagrid/CustomDataGrid'

import DialogAddSegment from './modal'

interface CellType {
  row: SegmentDataInterface
}

const actionSegmentEnum = {
  UPDATE: 'update',
  CREATE: 'create',
  VIEW: 'view'
} as const

type ActionTypeSegment = (typeof actionSegmentEnum)[keyof typeof actionSegmentEnum]

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
    field: 'segment_name',
    headerName: 'Descrição',
    filterable: false,
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.segment_name}</Typography>
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

const breadcrumbItems = [{ title: 'Gerenciamento' }, { title: 'Segmento' }]

const SegmentTable = () => {
  const ability = useContext(AbilityContext)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { data, isLoading, refetch } = useGetSegmentPaginate(paginationModel.page + 1, paginationModel.pageSize)
  const [selectedSegment, setSelectedSegment] = useState<SegmentDataInterface | null>(null)
  const [action, setAction] = useState<ActionTypeSegment>(actionSegmentEnum.CREATE)
  const postDeleteSegment = usePostDeleteSegment()
  const { showDialog } = useDialog()

  const handleSegmentAction = (rowData: SegmentDataInterface | null, action: ActionTypeSegment) => {
    setAction(action)
    setSelectedSegment(rowData)
    setEditDialogOpen(!editDialogOpen)
  }

  const handleEditSegment = (rowData: SegmentDataInterface) => {
    handleSegmentAction(rowData, actionSegmentEnum.UPDATE)
  }

  const handleViewSegment = (rowData: SegmentDataInterface) => {
    handleSegmentAction(rowData, actionSegmentEnum.VIEW)
  }

  const handleDeleteSegment = async (id: number) => {
    showDialog({
      type: DialogType.Question,
      title: 'Excluir Permissão?',
      description: 'Tem certeza de que deseja excluir esta permissão? Esta ação não pode ser desfeita!'
    }).then(async () => {
      await handledeleteSegment(id)
    })
  }

  const handledeleteSegment = async (id: number) => {
    try {
      await postDeleteSegment.mutateAsync(id)
      refetch()
    } catch (err) {
      showDialog({
        type: DialogType.Error,
        title: 'Ops, algo deu errado!',
        description: postDeleteSegment.mutateError?.errors[0]?.message
      })

      return
    }
  }

  const handleDialogToggle = () => {
    handleSegmentAction(null, actionSegmentEnum.CREATE)
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
          <Tooltip title='Visualizar Segmento'>
            <IconButton onClick={() => handleViewSegment(row)}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar Segmento'>
            <IconButton onClick={() => handleEditSegment(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Remover Segmento'>
            <IconButton
              onClick={() => {
                if (row.id !== undefined) {
                  handleDeleteSegment(row.id)
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
      <Breadcrumb title='Lista de Segmentos' breadcrumbItems={breadcrumbItems} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title=''
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Aproveite os recursos exclusivos para otimizar sua experiência na plataforma. Escolha os Segmentos{' '}
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
                  Criar novo Segmento
                </Button>
              ) : null}
              <Button sx={{ mb: 2 }} variant='contained' onClick={handleRefresh}>
                Atualizar
              </Button>
            </Box>
            <CustomDataGrid
              gridName='gridSegment'
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
      <DialogAddSegment
        data={selectedSegment}
        open={editDialogOpen}
        action={action}
        onClose={handleDialogToggle}
        onSubmit={handlesubmit}
      />
    </>
  )
}

SegmentTable.acl = {
  action: 'read',
  subject: 'Segment'
}

export default SegmentTable
