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
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import { ThemeColor } from 'src/@core/layouts/types'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useGetPartnerPaginate, usePostDeletePartner } from 'src/@core/hooks/usePartner'
import { useDialog } from 'src/@core/components/dialogAlerts/Alert'
import { DialogType } from 'src/@core/components/dialogAlerts/types'
import Breadcrumb from 'src/@core/components/breadcrumb/Breadcrumb'
import CustomDataGrid from 'src/@core/components/datagrid/CustomDataGrid'
import { PartnerDataInterface } from 'src/@core/types/partner.interface'
import { useRouter } from 'next/router'

interface Colors {
  [key: string]: ThemeColor
}

interface CellType {
  row: PartnerDataInterface
}

const colors: Colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  Administrador: 'primary',
  'restricted-user': 'error'
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'id',
    minWidth: 240,
    headerName: 'id',
    filterable: false,
    hideable: false,
    renderCell: ({ row }: CellType) => <Typography sx={{ ml: 2, color: 'text.secondary' }}>{row.assunto}</Typography>
  },
  {
    flex: 0.35,
    minWidth: 290,
    field: 'description',
    headerName: 'Descrição',
    filterable: false,
    renderCell: ({ row }: CellType) => {
      return row.atribuidoa.map((assignee: string, index: number) => (
        <CustomChip
          rounded
          size='small'
          key={index}
          skin='light'
          color={colors[assignee]}
          label={assignee.replace('-', ' ')}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
        />
      ))
    }
  },
  {
    flex: 0.25,
    minWidth: 210,
    field: 'createdDate',
    headerName: 'Data Ciração',
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {format(new Date(row.dataCriacao), 'dd/MM/yyyy HH:mm:ss')}
      </Typography>
    )
  }
]

const breadcrumbItems = [{ title: 'Cadastros' }, { title: 'Clientes' }]

const PartnerTable = () => {
  const router = useRouter()
  const ability = useContext(AbilityContext)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const { data, isLoading, refetch } = useGetPartnerPaginate(paginationModel.page + 1, paginationModel.pageSize)
  const postDeletePartner = usePostDeletePartner()
  const { showDialog } = useDialog()

  const handlePartnerAction = (rowData: PartnerDataInterface | 'new', action: string) => {
    const partnerId = typeof rowData === 'string' ? rowData : rowData.id
    router.push(`/management/partner/${partnerId}/${action}`)
  }

  const handleEditPartner = (rowData: PartnerDataInterface) => {
    handlePartnerAction(rowData, 'edit')
  }

  const handleViewPartner = (rowData: PartnerDataInterface) => {
    handlePartnerAction(rowData, 'view')
  }

  const handleCreatePartner = () => {
    handlePartnerAction('new', 'create')
  }

  const handleDeletePartner = async (id: number) => {
    showDialog({
      type: DialogType.Question,
      title: 'Excluir Permissão?',
      description: 'Tem certeza de que deseja excluir esta permissão? Esta ação não pode ser desfeita!'
    }).then(async () => {
      await handledeletePartner(id)
    })
  }

  const handledeletePartner = async (id: number) => {
    try {
      await postDeletePartner.mutateAsync(id)
      refetch()
    } catch (err) {
      showDialog({
        type: DialogType.Error,
        title: 'Ops, algo deu errado!',
        description: postDeletePartner.mutateError?.errors[0]?.message
      })

      return
    }
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
          <Tooltip title='Visualizar Parceiro'>
            <IconButton onClick={() => handleViewPartner(row)}>
              <Icon icon='tabler:eye' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar Clientes'>
            <IconButton onClick={() => handleEditPartner(row)}>
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Remover Clientes'>
            <IconButton
              onClick={() => {
                if (row.id !== undefined) {
                  handleDeletePartner(row.id)
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
      <Breadcrumb title='Lista de Clientes' breadcrumbItems={breadcrumbItems} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title=''
            subtitle={
              <Typography sx={{ color: 'text.secondary' }}>
                Aproveite os recursos exclusivos para otimizar sua experiência na plataforma. Escolha os Parceiro <br />
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
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreatePartner}>
                  Criar novo Clientes
                </Button>
              ) : null}
              <Button sx={{ mb: 2 }} variant='contained' onClick={handleRefresh}>
                Atualizar
              </Button>
            </Box>
            <CustomDataGrid
              gridName='gridPartner'
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
    </>
  )
}

PartnerTable.acl = {
  action: 'read',
  subject: 'Partner'
}

export default PartnerTable
