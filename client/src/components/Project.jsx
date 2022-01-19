import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Deliverable } from './Deliverable';
import { useNavigate } from "react-router-dom";

export const Project = () => {
    const { state } = useLocation();
    const { id, title, evaluate, studentId } = state;
    const [deliverables, setDeliverables] = useState([]);
    const [links, setLinks] = useState([]);
    const [grade, setGrade] = useState("");
    const navigate = useNavigate();

    console.log('evaluate: ' + evaluate)

    const getDeliverables = () => {
        fetch('http://localhost:8081/api/deliverables/' + id)
            .then(response => {
                if (response.status === 200) {
                    console.log('200')
                    response.json().then(json => {
                        console.log('json: ' + JSON.stringify(json));
                        setDeliverables(json)
                        setLinks(Array.from(Array(json.length)))
                    })
                } else if (response.statusCode === 204) {
                    console.log('204')
                }
            })
    }

    const handleUpdate = (value, index) => {
        let copy = [...links]
        links[index] = value
    }

    const updateProject = () => {
        console.log('links: ' + JSON.stringify(links))
        links.forEach((link, index) => {
            if (link) {
                const req = 'http://localhost:8081/api/deliverables/' + deliverables[index].id
                console.log('req: ' + req)
                fetch(req, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        link: link
                    })
                }).then(response => {

                })
            }
        })
    }
    
    useEffect(() => {
        getDeliverables()
    }, [])

    const sendGrade = (e) => {
        const req = 'http://localhost:8081/api/grades/' + studentId
        console.log('req:' + req)
        fetch(req, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade: grade
            })
        }).then(response => {
            // navigate('/home')
        })
    }

    return (
        <div className="App" style={{width:"80vw", height:"80vh"}}>
            <h1>{title}</h1>
            {deliverables.map((deliverable, index) => <Deliverable key={index} index={index} deliverable={deliverable} handleUpdate={handleUpdate} evaluate={evaluate}></Deliverable>)}
            {!evaluate && <button className="primary" style={{ marginTop: 20 }} onClick={updateProject}>Update project</button>}
            {evaluate &&
                <div>
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" placeholder="Grade" onChange={e => setGrade(e.target.value)}/>
                </div>}
            {evaluate && <button className="primary" style={{ marginTop: 20 }} onClick={sendGrade}>Send grade</button>}
        </div>
    )
}
