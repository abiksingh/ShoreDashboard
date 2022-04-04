import Home from '../home/Home'
import ProductManagement from '../productManagement/ProductManagement'
import Contacts from '../contacts/Contacts'
import Orders from '../orders/Orders'
import Reports from '../reports/Reports'
import ApiAndApps from '../apiAndApps/ApiAndApps'
import Integration from '../intergration/Integration'
import HomeIcon from '@mui/icons-material/Home'
import CategoryIcon from '@mui/icons-material/Category'
import ContactsIcon from '@mui/icons-material/Contacts'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import TimelineIcon from '@mui/icons-material/Timeline'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'

export interface RouteDefinition {
  id: RouteId
  icon?: any
  path: string
  sidebarName: string
  component?: any
  children?: Route[]
}

export interface Route extends RouteDefinition {
  parent?: Route
}

enum RouteId {
  Home,
  ProductManagement,
  Contacts,
  Orders,
  Reports,
  ApiAndApps,
  Integration
}

export const Routes: RouteDefinition[] = [
  {
    id: RouteId.Home,
    path: '/',
    sidebarName: 'Home',
    component: Home,
    icon: HomeIcon
  },
  {
    id: RouteId.ProductManagement,
    path: '/productManagement',
    sidebarName: 'Product Management',
    component: ProductManagement,
    icon: CategoryIcon
  },
  {
    id: RouteId.Contacts,
    path: '/contacts',
    sidebarName: 'Contacts',
    component: Contacts,
    icon: ContactsIcon
  },
  {
    id: RouteId.Orders,
    path: '/orders',
    sidebarName: 'Orders',
    component: Orders,
    icon: BorderColorIcon
  },
  {
    id: RouteId.Reports,
    path: '/reports',
    sidebarName: 'reports',
    component: Reports,
    icon: TimelineIcon
  },
  {
    id: RouteId.ApiAndApps,
    path: '/api-and-apps',
    sidebarName: 'Api and Apps',
    component: ApiAndApps,
    icon: BubbleChartIcon
  },
  {
    id: RouteId.Integration,
    path: '/integration',
    sidebarName: 'Integration',
    component: Integration,
    icon: IntegrationInstructionsIcon
  }
]
