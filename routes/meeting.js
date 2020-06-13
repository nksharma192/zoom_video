const rp = require('request-promise');
const express = require('express');
const router = express.Router();

const config = require('../config');
const token = require('../common/token');
const generateSignature = require('../common/signature');


router.post('/create', (req, res) => {
    const userId = config.userId;
    const meeting_topic = req.body.meeting_topic || 'Let\'s meet!!!';
    const meeting_agenda = req.body.meeting_agenda || 'No Agenda for the meeting!!!';
    const meeting_pwd = req.body.meeting_pwd || 'Ychma@119';
    const meeting_time = req.body.meeting_time ? JSON.parse(req.body.meeting_time) : '2020-06-18T12:00:00Z';

    let options = {
        uri: `https://api.zoom.us/v2/users/${userId}/meetings`,
        auth: { 'bearer': token },
        method: 'POST',
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        body: {
            "topic": meeting_topic,
            "type": 2,
            "start_time": meeting_time,
            "duration": 60,
            "timezone": "Asia/Calcutta",
            "password": meeting_pwd,
            "agenda": meeting_agenda,
            "settings": {
                "host_video": true,
                "participant_video": true,
                "in_meeting": true,
                "join_before_host": true,
                "mute_upon_entry": true,
                "approval_type": 2,
                "audio": "both",
                "auto_recording": "local"
            }
        },
        json: true
    };

    // Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.status(500).send(err.message);
            console.log('API call fail');
        });
});

router.post('/genSign', (req, res) => {
    const API_KEY = config.APIKey;
    const API_SECRET = config.APISecret;
    const GLOBAL_MEETING = req.body.meeting_number || config.MeetingId;

    const sign = generateSignature(API_KEY, API_SECRET, GLOBAL_MEETING, 0)
    res.send({ sign: sign });
})

module.exports = router;