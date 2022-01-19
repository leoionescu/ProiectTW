import React from 'react'
import { useState, useEffect } from "react";


export const Professor = () => {
    const [projects, setProjects] = useState([])
    const [grades, setGrades] = useState([])

    const getProjects = () => {
        fetch('http://localhost:8081/api/projects').then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    console.log('json: ' + JSON.stringify(json))
                    // setProjects(json)
                    // setGrades(json)
                    json.forEach((project, index) => {
                        console.log('index: ' + index)
                        const req = 'http://localhost:8081/api/getGrade/' + project.id
                        fetch(req).then(response => {
                            if (response.status === 200) {
                                console.log('response: ' + JSON.stringify(response))
                                response.json().then(element => {
                                    const grade = element.grade
                                    console.log('grade: ' + grade)
                                    project["grade"] = grade
                                    console.log('json: ' + JSON.stringify(json))
                                    setProjects(json)
                                })
                            } else if (response.status === 204) {
                                console.log('204')
                                project["grade"] = 0
                                setProjects(json)
                            }
                        })
                    })
                    
                })
            }
        })
    }

    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        if (projects.length > 0) {
            
        }
    }, [projects])

    return (
        <div className="App" style={{ minWidth: 400, minHeight: 200 }}>
            <h2 style={{ marginBottom: 20 }} >Projects</h2>
            {projects.map((project, index) => (
                <div key={index} className="App" style={{padding: 10, minWidth: 200, backgroundColor: "#c1d7aa", marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                    <p>{project.title}</p>
                    <p>Grade: {project.grade}</p>
                </div>
            ))}
        </div>
    )
}
