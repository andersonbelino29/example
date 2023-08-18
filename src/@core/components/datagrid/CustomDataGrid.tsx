import { DataGrid, GridColumnVisibilityModel, ptBR } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'

const loadGridsFromLocalStorage = (gridName: string) => {
  const grids = window.localStorage.getItem('gridsConfig')

  return grids ? JSON.parse(grids)[gridName] || {} : {}
}

const saveGridToLocalStorage = (gridName: string, gridModel: GridColumnVisibilityModel) => {
  const existingGrids = window.localStorage.getItem('gridsConfig')
  const grids = existingGrids ? JSON.parse(existingGrids) : {}

  grids[gridName] = gridModel
  window.localStorage.setItem('gridsConfig', JSON.stringify(grids))
}

interface CustomDataGridProps {
  gridName: string
  rows: any[]
  columns: any[]
  rowCount: number
  disableRowSelectionOnClick: boolean
  pageSizeOptions: number[]
  paginationMode: 'server' | 'client'
  paginationModel: any
  onPaginationModelChange: any
  loading: boolean
}

const CustomDataGrid = (props: CustomDataGridProps) => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(
    loadGridsFromLocalStorage(props.gridName)
  )

  useEffect(() => {
    saveGridToLocalStorage(props.gridName, columnVisibilityModel)
  }, [props.gridName, columnVisibilityModel])

  return (
    <DataGrid
      {...props}
      autoHeight
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={newModel => {
        setColumnVisibilityModel(newModel)
      }}
    />
  )
}

export default CustomDataGrid
