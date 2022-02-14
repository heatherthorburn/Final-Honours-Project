/**
 * Card for displaying services available for a given circumstance. 
 * Used in the Student Advice screen
 * Returns a default value for "other"
 */

import React from 'react'
import Card from 'react-bootstrap/Card'

export default function AdviceBox(props) {

        const selectedCircumstances = props.circumstance

        return (
            <div className = "grid-gap">
                {selectedCircumstances.length === 0 ? null :
                    selectedCircumstances === "other" ? 
                    <p>If you are experiencing difficulties, you can talk to your personal advisor or department head about how it is affecting your studies.</p> : 
                    selectedCircumstances.student_resources.map((resource, key) => (
                        <Card className = "margin-1rem" key = {key}>
                            <p>{resource.circumstances_resources.description}</p> 
                            {resource.email && resource.email !== null ?
                            <p>You can contact this service at {resource.email}</p> : null}
                            {resource.link && resource.link !== null ? 
                            <p>You can also find more information <a className = "small-link" href = {resource.link}>here</a>.</p> : null}
                        </Card>
                    ))}
            </div>
        )
}