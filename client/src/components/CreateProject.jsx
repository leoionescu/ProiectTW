import React from 'react';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from "react-router-dom";

export const CreateProject = () => {
    const { state } = useLocation();
    const { studentId, title, email, lastName, firstName } = state;

    const [numberOfMembers, setNumberOfMembers] = useState(1)
    const [numberOfDeliverables, setNumberOfDeliverables] = useState(1)
    const [dates, setDates] = useState([new Date()])
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const projectId = uuidv4()
        
        const title = e.target.title.value
        let emails = []
        for (let i = 0; i < numberOfMembers; i++) {
            let email = e.target["member" + i].value
            emails.push(email)
        }

        fetch('http://localhost:8081/api/addEmailsToProject', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({ emails, projectMemberId: projectId, title, description: "" })
            }).then((response) => {
                if (response.status === 204) {
                        // add deliverables
                        const deliverables = []
                        for (let i = 0; i < numberOfDeliverables; i++) {
                            let deliverable = {id: uuidv4(), title: e.target["deliverable" + i].value, date: dates[i] }
                            deliverables.push(deliverable)
                        }
                        fetch('http://localhost:8081/api/addDeliverables', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                        body: JSON.stringify({projectId, deliverables})
                        }).then(response => {
                            if (response.status == 204) {
                                navigate('/home', { state: { studentId, title, email, lastName, firstName } })
                            }
                        })
                } else if (response.status === 401) {
                    alert('One or all emails already has a project')
                }
            })
    }
    const createAddMemberFields = () => {
        let members = []
        for (let i = 0; i < numberOfMembers; i++)
            members.push(
                <div className="input-group">
                    <label htmlFor="text">Member</label>
                    <input type="text" name={"member" + i} placeholder="Member name" />
                </div>
            )
        return members
    }

    const createDeliverableFields = () => {
        let startDate = new Date()
        let deliverables = []
        for (let i = 0; i < numberOfDeliverables; i++) {
            deliverables.push(
                <div className="input-group">
                    <label htmlFor="text">Deliverable</label>
                    <input type="text" name={"deliverable" + i} placeholder="Deliverable name" />
                    <DatePicker selected={dates[i]} onChange={(date) => {
                        let newDates = [...dates]
                        newDates[i] = date
                        setDates(newDates)
                    }} />
                </div>
            )
        }
        return deliverables
    }

    const addMember = (e) => {
        e.preventDefault()
        setNumberOfMembers(numberOfMembers + 1)
    }

    const removeMember = (e) => {
        e.preventDefault()
        setNumberOfMembers(numberOfMembers - 1)
    }

    const addDeliverable = (e) => {
        e.preventDefault()
        setNumberOfDeliverables(numberOfDeliverables + 1)
        setDates(dates => [...dates, new Date()]) 
    }

    const removeDeliverable = (e) => {
        e.preventDefault()
        setNumberOfDeliverables(numberOfDeliverables - 1)
        setDates(dates.slice(0, numberOfDeliverables - 1)) 
    }
    return (
        <div>
        <div className="App" style={{alignItems: "flex-end"}}>
            <form className="form" onSubmit={handleSubmit}>
                <div>   
                    <div className="input-group">
                        <label htmlFor="text">Title</label>
                        <input type="text" name="title" placeholder="Title" />
                    </div>
                    {createAddMemberFields()}
                    <button className="secondary" onClick={addMember}>Add member</button>  
                    {numberOfMembers > 1 && (
                        <button className="secondary" onClick={removeMember}>Remove member</button>
                    )}
                    {createDeliverableFields()}
                    <button className="secondary" onClick={addDeliverable}>Add deliverable</button>  
                    {numberOfDeliverables > 1 && (
                        <button className="secondary" onClick={removeDeliverable}>Remove deliverable</button>
                    )}
                </div>
                    <button className="primary" style={{ marginTop: 20 }}>Create project</button>
                </form>
        </div>
    </div>
    )
}
