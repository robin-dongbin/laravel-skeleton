import AuthController from './AuthController'
import DashboardController from './DashboardController'
import RoleController from './RoleController'
import UserController from './UserController'
import IpController from './IpController'
import RequestLogController from './RequestLogController'
import AuthenticationLogController from './AuthenticationLogController'
import AuthenticatedUserController from './AuthenticatedUserController'
import AuthenticatedUserPasswordController from './AuthenticatedUserPasswordController'

const Admin = {
    AuthController, 
    DashboardController, 
    RoleController, 
    UserController, 
    IpController, 
    RequestLogController, 
    AuthenticationLogController, 
    AuthenticatedUserController, 
    AuthenticatedUserPasswordController,
}

export default Admin