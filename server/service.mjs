import { response } from 'express';
import Sequelize from 'sequelize';
import 'uuid';
import { Grades } from './repository.mjs';

function valid(Model, body) {
    return true;
}

async function getRecords(Model, req, res) {
    try {
        let records = await Model.findAll({ attributes: { exclude: ['password'] } })
        console.log('records', JSON)
        if (records.length > 0) {
            res.status(200).json(records)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json(error)
    }
}

async function postRecords(Model, req, res) {
    console.log("req.body: " + JSON.stringify(req.body))
    try {
        if (valid(Model, req.body)) {
            let record = await Model.create(req.body)
            res.status(201).location(`http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`).send()
        } else {
            res.status(400).send
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function deleteRecords(Model, req, res) {
    try {
        await Model.truncate()
        res.status(204).send()
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id, { attributes: { exclude: ['password'] } })
        if (record) {
            res.status(200).json(record)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function headRecord(Model, req, res) {
    try {
        response.status(await Model.findByPk(req.params.id) ? 204 : 404).send()
    } catch (error) {
        response.status(500).json(error)
    }
}

async function putRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
            if (valid(Model, req.body)) {
                await record.update(req.body)
                res.status(204).send()
            } else {
                res.status(404).send()
            }
        }
    } catch (error) {
            res.status(500).json(error)
        }
}

async function deleteRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
            await record.destroy()
            res.status(204).send()
        } else {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function patchRecord(Model, req, res) {
    try {
        let record = await Model.findByPk(req.params.id)
        if (record) {
                Object.entries(req.body).forEach(([name, value]) => record[name] = value)
                await record.save()
                res.status(204).send()
            } else {
                res.status(404).send()
            }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function authenticate(Model, req, res) {
    try {
        let records = await Model.findAll({
            where: {
                email: req.params.email
              }
        })
        if (records.length === 1) {
            if (records[0].password === req.params.password) {
                res.status(200).json({ id: records[0].id, firstName: records[0].firstName, lastName: records[0].lastName })   
            } else {
                res.status(401).send()
            }
        } else {
            res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function addEmailsToProject(Model, Project, req, res) {
    let areEmailsOk = true
    try {
        for(let email of req.body.emails) {
            let records = await Model.findAll({
                where: {
                    email: email
                }
            })
            if (records.length === 0) {
                areEmailsOk = false
                res.status(404).send()
            } else {
                if (records[0].projectMemberId != null) {
                    areEmailsOk = false
                    res.status(401).send()
                }
            }
        }
        console.log('areEmailsOk', areEmailsOk)

        if (areEmailsOk && req.body.projectMemberId) {
            let record = await Project.create({
                id: req.body.projectMemberId,
                title: req.body.title,
                description: req.body.description
            })
            for(let email of req.body.emails) {
                let records = await Model.findAll({
                    where: {
                        email: email
                    }
                })
                if (valid(Model, req.body)) {
                    records[0].setProject(record)

                    // console.log('before update: ' + JSON.stringify(records[0]))
                    // records[0]['projectMemberId'] = req.body.projectMemberId
                    // await records[0].save()
                    // console.log('after update: ' + JSON.stringify(records[0]))
                } else {
                    res.status(404).send()
                    return
                }
            }
            res.status(204).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

async function addDeliverables(Model, Deliverable, req, res) { 
    try {
        for (let deliverable of req.body.deliverables) {
            let record = await Deliverable.create({
                id: deliverable.id,
                title: deliverable.title,
                description: "",
                end: deliverable.date
            })
            let project = await Model.findByPk(req.body.projectId)
            if (project) {
                record.setProject(project)
            } else {
                res.status(404).send()
            }
        }
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

async function getDeliverables(Model, req, res) {
    try {
        let records = await Model.findAll({
            where: {
            projectId: req.params.id
            }
        })
        if (records.length > 0) {
            res.status(200).json(records)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getProjects(Model, req, res) {
    try {
        let records = await Model.findAll()
        if (records.length > 0) {
            for (let i = 0; i < records.length; i++) {
                const id = records[i].id
                let grades = await Grades.findAll({
                    where: {
                        projectId: id
                    }
                })
                let sum = 0
                if (grades.length > 0) {
                    for (let grade of grades) {
                        sum += grade.grade
                    }
                    let grade = sum / grades.length
                    records[i]["grade"] = grade
                } else {
                    records[i]["grade"] = 0
                }
            }
            console.log('records:', JSON.stringify(records))
            res.status(200).json(records)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

async function getGrade(Model, req, res) {
    console.log('get grade')
    try {
        let result = {grade: 0}
        let records = await Model.findAll({
            where: {
                projectId: req.params.id
            }
        })
        if (records.length > 0) {
            for (let i = 0; i < records.length; i++) {
                const id = records[i].id
                let grades = await Grades.findAll({
                    where: {
                        projectId: id
                    }
                })
                let sum = 0
                if (grades.length > 0) {
                    for (let grade of grades) {
                        sum += grade.grade
                    }
                    result = { grade: sum / grades.length }
                   
                } else {
                    result = { grade: 0 }
                }
            }
            console.log('result:', JSON.stringify(result))
            res.status(200).json(result)
        } else {
            console.log('204')
            res.status(204).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export { getRecords, postRecords, deleteRecords, getRecord, headRecord, deleteRecord, putRecord, patchRecord, authenticate, addEmailsToProject, addDeliverables, getDeliverables, getProjects, getGrade }