import React from 'react';
import Api from '../../services/Api';

class StartMeeting extends React.Component {
    async componentDidMount() {
        const { meeting_topic, meeting_agenda, meeting_pwd, meeting_time } = this.props.formData;

        await Api().post('/meeting/create', {
            meeting_topic,
            meeting_agenda,
            meeting_pwd,
            meeting_time
        });
    }

    render() {
        return (
            <div className='app-container'>
                Meeting Created!
            </div>
        );
    }
}

export default StartMeeting;