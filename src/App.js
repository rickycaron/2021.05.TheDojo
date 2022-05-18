import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

function App() {
    const { authIsReady, user } = useAuthContext()

    return (
        <div className="App">
            {authIsReady && (
                <BrowserRouter>
                    {user && <Sidebar />}
                    <div className="container">
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                {!user ? <Redirect to="/login" />
                                    : <Dashboard />}
                            </Route>
                            <Route path="/create">
                                {!user ? <Redirect to="/login" />
                                    : <Create />}
                            </Route>
                            <Route path="/projects/:id">
                                {!user ? <Redirect to="/login" />
                                    : <Project />}
                            </Route>
                            <Route path="/login">
                                {user ? <Redirect to="/" />
                                    : <Login />}
                            </Route>
                            <Route path="/signup">
                                {user ? <Redirect to="/" />
                                    : <Signup />}
                            </Route>
                        </Switch>
                    </div>
                    {user && <OnlineUsers />}
                </BrowserRouter>
            )}
        </div>
    );
}

export default App
