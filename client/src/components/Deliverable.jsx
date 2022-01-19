import React from 'react'
import { useEffect, useState } from "react";


export const Deliverable = ({ deliverable, handleUpdate, index, evaluate }) => {
    const [inputDisabled, setInputDisabled] = useState(false)
    const date = new Date(deliverable.end)

    useEffect(() => {
        if (Date.now() > date) {
            setInputDisabled(true)
            console.log('set to true')
        }
    }, [])

    const handleChange = (e) => {
        console.log('change value: ' + e.target.value)
        console.log('index: ' + index)
        handleUpdate(e.target.value, index)
    }
    return (
        <div style={{
            padding: 20,
            margin: 20,
            fontSize: 18,
            backgroundColor: "#c1d7aa"
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                grid: 'column',
                marginBottom:20
            }}>
                <p>{deliverable.title}</p>
                <p>Deadline: {date.toDateString()}</p>
            </div>
            <input type="text" name="Link" placeholder={(deliverable.link) ? deliverable.link : "Link"} onChange={handleChange}style={{
                background: "#f2f2f5",
                borderRadius: "4px",
                border: "1px solid #e5e5e5",
                color: "#676767",
                fontSize: 16,
                height: 40,
                outline: 0,
                padding: "0 15px",
                transition: "all 0.3s",
            }}
            disabled={(inputDisabled || evaluate) ? "disabled" : ""}/>
        </div>
    )
}
