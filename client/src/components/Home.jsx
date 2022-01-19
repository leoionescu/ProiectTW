import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { ProjectRow } from './ProjectRow';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Home = () => {
    const { state } = useLocation();
    const { studentId, title, email, lastName, firstName } = state;
    



    const [project, setProject] = useState({})
    const [student, setStudent] = useState({})
    const [projectToEvaluate, setProjectToEvaluate] = useState({})

    const getStudentAndProject = () => {
        console.log('getting projects')
        const req = 'http://localhost:8081/api/students/' + studentId
        fetch(req).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    console.log('json: ' + JSON.stringify(json));
                    setStudent(json)
                })
            }
        })
    }

    const getProject = () => {
        const id = student.projectMemberId
        const req = 'http://localhost:8081/api/projects/' + id
        fetch(req).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    setProject(json);
                })
            }
        })
    }

    const createProject = () => {
        navigate('/create-project', { state: { studentId, title, email, lastName, firstName } })
    }

    const navigate = useNavigate();

    useEffect(() => {
        getStudentAndProject()
        console.log('useEffect')
    }, [])

    useEffect(() => {
        if (student.id !== undefined) {
            getProject()
            getProjectsToEvaluate()
        }
    }, [student])

    const getProjectsToEvaluate = () => {
        fetch('http://localhost:8081/api/grades/' + studentId).then((response) => {
            if (response.status === 200) {
                response.json().then(json => {
                    const projectId = json.projectId
                    fetch('http://localhost:8081/api/projects/' + projectId).then((response) => {
                        if (response.status === 200) {
                            response.json().then(json => {
                                setProjectToEvaluate(json)
                            })
                        }
                    })
                })
            }
        })
    }

    return (
        <div className="App" style={{ minWidth: 220 }}>
            <button className="primary" style={{marginBottom: 20}} onClick={createProject}>Create project</button>
            <h2 style={{marginBottom: 20}} >Projects</h2>
            {project.title && <ProjectRow project={project} evaluate={false}></ProjectRow>}
            {projectToEvaluate.title && <h2 style={{marginBottom: 20, marginTop: 20}} >Projects To Evaluate</h2>}
            {projectToEvaluate.title && <ProjectRow project={projectToEvaluate} evaluate={true} studentId={studentId}></ProjectRow>}
        </div>
    )
}
