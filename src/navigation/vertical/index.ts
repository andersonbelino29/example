// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Início',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Cadastros',
      icon: 'tabler:new-section',
      children: [
        {
          title: 'Categoria',
          path: '/management/system'
        },
        {
          title: 'Departamento',
          path: '/management/segment'
        },
        {
          title: 'Clientes',
          path: '/management/partner'
        }
      ]
    }
  ]
}
export default navigation
