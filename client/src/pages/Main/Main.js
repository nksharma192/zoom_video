import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Api from '../../services/Api';
import { isEmpty } from '../../services/common';
import JoiningForm from '../../components/Meeting/Forms/JoinMeeting';
import CreateForm from '../../components/Meeting/Forms/CreateMeeting';

import './Main.css';

function Main() {
    const [user, setUser] = useState({});
    const [loadJoinForm, setLoadJoinForm] = useState(false);
    const [createMeetingForm, setCreateMeetingForm] = useState(false);

    useEffect(() => {
        async function getUserInfo() {
            const res = await Api().get('/user/details');
            setUser(res);
        }
        getUserInfo();
    }, []);

    function loadJoinMeeting() {
        setLoadJoinForm(true);
        setCreateMeetingForm(false);
    }

    async function createNewMeeting() {
        setCreateMeetingForm(true);
        setLoadJoinForm(false);
    }

    return (
        <div className='main-content'>
            {!isEmpty(user) ?
                <>
                    <div className='user-details'>
                        <div className='user-details-item'>
                            <div className='title'>Name : </div>
                            <div className='description'>{`${user.first_name} ${user.last_name}`}</div>
                            <p></p>
                        </div>
                        <div className='user-details-item'>
                            <div className='title'>Email : </div>
                            <div className='description'>{user.email}</div>
                            <p></p>
                        </div>
                    </div>
                    <button className='join-btn' onClick={createNewMeeting}>Create new Meeting</button>
                    <button className='join-btn' onClick={loadJoinMeeting}>Join a Meeting</button>
                </> :
                <div> Loading....</div>
            }
            {(loadJoinForm || createMeetingForm) &&
                < div className='forms'>
                    {loadJoinForm && <JoiningForm />}
                    {createMeetingForm && <CreateForm />}
                </div>
            }
        </div >
    );
}

const mapStateToProps = state => ({
    user: state.UserReducer
});

export default connect(mapStateToProps, null)(Main);
