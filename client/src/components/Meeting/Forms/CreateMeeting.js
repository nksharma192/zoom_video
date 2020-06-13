import React from 'react';
import DatePicker from 'react-datepicker';  // Documentation - https://reactdatepicker.com
import "react-datepicker/dist/react-datepicker.css";

import CreateMeeting from '../CreateMeeting';

import './CreateMeeting.css';

class createMeetingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                meeting_topic: '',
                meeting_agenda: '',
                meeting_pwd: '',
                meeting_role: '',
                meeting_date: '',
                picked_time: ''
            },
            startMeeting: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ startMeeting: true });
    }

    handleChange(event) {
        const formData = { ...this.state.form };
        formData[event.target.name] = event.target.value;
        this.setState({ form: formData });
    }

    handleDateChange(date) {
        const formData = { ...this.state.form };

        formData['meeting_time'] = JSON.stringify(date).replace('.000Z', 'Z');
        formData['picked_time'] = date;

        this.setState({ form: formData })
    }

    render() {
        if (!this.state.startMeeting) {
            return (
                <div className='join-meeting-form'>
                    < form >
                        <input type="text" name="meeting_topic" id="meeting_topic" value={this.state.form.meeting_topic} placeholder='Meeting Topic' onChange={this.handleChange} />
                        <input type="text" name="meeting_agenda" id="meeting_agenda" value={this.state.form.agenda} placeholder='Meeting Agenda' onChange={this.handleChange} />
                        <input type="text" name="meeting_pwd" id="meeting_pwd" value={this.state.form.meeting_pwd} placeholder='Meeting Password' onChange={this.handleChange} />
                        <DatePicker
                            className='date-picker'
                            name="picked_time"
                            selected={this.state.form.picked_time}
                            onChange={this.handleDateChange}
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            showTimeSelect
                            placeholderText='Meeting Time'
                        />
                        <button type="submit" id="join_meeting" onClick={this.handleClick}>Create</button>
                    </form >
                </div >
            );
        }

        return <CreateMeeting formData={this.state.form} />;
    }
}

export default createMeetingForm;