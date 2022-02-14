/**
 * Component used for custom cell indicating whether a coursework
 * has been grades or not in the 'Manage Coursework Page'
 */

import React from 'react'

export default function MarksIndicator(props) {

    const row = props.row;

    /**
     * Return if no mark exists
     */

    if (row.grade == null) {
        return (
            <div className = "not-marked">
                Not marked
            </div>
        )
    } else {
        return (
            <>
             { 
                row.grade >= 80 ?
                    <div className = "grade excellent">
                        {row.grade}%
                    </div>
                : row.grade >= 60 ?
                    <div className = "grade good">
                        {row.grade}%
                    </div>
                : row.grade >= 40 ?
                    <div className = "grade warning">
                        {row.grade}%
                    </div>
                :
                <div className = "grade danger">
                    {row.grade}%
                </div>
            }
            </>
        )
    }
}