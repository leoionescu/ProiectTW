import React from 'react'
import { useNavigate } from "react-router-dom";

export const ProjectRow = ({ project, evaluate, studentId }) => {
    const navigate = useNavigate();
    console.log("project title: " + project.title)
    console.log("project id: " + project.id)
    const handleClick = (e) => {
        console.log('click')
        navigate('/project', { state: {id: project.id, title: project.title, evaluate, studentId } })
    }
    
    return (
        <div>
            <div className="App" style={{padding: 10, minWidth: 200, backgroundColor: "#c1d7aa", marginLeft: 10, marginRight: 10}} onClick={handleClick}>
                <p>{project.title}</p>
                <p>{project.date}</p>
            </div>
        </div>
    )
}
