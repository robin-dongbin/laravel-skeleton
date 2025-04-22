import login from './login'
import logout from './logout'
import dashboard from './dashboard'
import roles from './roles'
import users from './users'
import ips from './ips'
import requestLogs from './request-logs'
import authenticationLogs from './authentication-logs'
import user from './user'

const admin = {
    login, 
    logout, 
    dashboard, 
    roles, 
    users, 
    ips, 
    requestLogs, 
    authenticationLogs, 
    user,
}

export default admin