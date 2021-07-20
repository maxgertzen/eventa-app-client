import React, { useContext, useState, useEffect } from 'react';
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import UserProfilePage from './UserProfilePage';
import SideNav from '../components/SideNav/SideNav';
import EventsManagePage from './EventsManagePage';
import AuthApi from '../store/AuthApi';
import { getUserEvents, getUserDetails } from '../api/index';

const DashboardPage = () => {
    const [eventsData, setEventsData] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const { userName } = useContext(AuthApi);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        const callApi = async () => {
            try {
                const { data } = await getUserEvents()
                setEventsData(data);
                const response = await getUserDetails();
                console.log(response)
                setUserInfo(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        callApi()
    }, [])

    const getUpdatedUserData = async () => {
        try {
            const response = await getUserDetails();
            setUserInfo(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <article className="container-fluid text-white dashboard">
            <div className="row h-100">
                <SideNav url={url} userName={userName} />
                <Switch>
                    <Route exact path={`${path}`}>
                        <article className="col-10 d-flex flex-column justify-content-center align-items-center m-auto my-5">
                            <h4>Hello {userName}</h4>
                            <h6>You have {eventsData.count || 'no'} future events</h6>
                            <Link to="/dashboard/events" className="btn btn-primary my-2">Start Here</Link>
                        </article>
                    </Route>
                    <Route path={`${path}/events`}>
                        <EventsManagePage userEvents={eventsData.userEvents} setUserEvents={setEventsData} />
                    </Route>
                    <Route path={`${path}/profile`}><UserProfilePage info={userInfo} notifyUserChanges={getUpdatedUserData} /></Route>
                </Switch>
            </div>
        </article>
    )
}

export default DashboardPage