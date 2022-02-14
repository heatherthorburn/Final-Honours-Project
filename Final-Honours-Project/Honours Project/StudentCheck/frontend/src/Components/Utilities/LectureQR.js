/**
 * Generates QR code for a given lecture
 */

import React from 'react'
import QRCode from 'qrcode.react'
import Alert from 'react-bootstrap/Alert'

export default function LectureQR(props) {
    
    return (
        !props.confirmed ? null :
        <div>
        <Alert className = "default-padding" variant = "info">Display this QR code to your students, and they can log their attendance themselves!</Alert>
        <div className = "flex-justify">
        <QRCode size={300} value = {"https://devweb2020.cis.strath.ac.uk/gtb17118-nodejs/takeattendance/qr/" + props.session_id} />
        </div>
        </div> 
    )
}