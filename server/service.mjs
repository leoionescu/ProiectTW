import { response } from 'express';
import Sequelize from 'sequelize';

function valid(Model, body) {
    return true;
}

async function getRecords(Model, req, res) {
    try {
        let records = await Model.findAll()
        if (records.length > 0) {
            res.status(200).json(records)
        } else {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

async function postRecords(Model, req, res) {
    try {
        if (valid(Model, req.body)) {
            let record = await Model.create(req.body)
            res.status(201).location(`http://${req.headers.host}${req.baseUrl}${req.url}/${record.id}`).send()
        } else {
            res.status(400).send
        }
    } catch (error) {
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
        let record = await Model.findByPk(req.params.id)
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

export { getRecords, postRecords, deleteRecords, getRecord, headRecord, deleteRecord, putRecord, patchRecord }