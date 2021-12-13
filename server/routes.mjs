import express from 'express';
import { Profesor, Student, Project } from './repository.mjs';
import { getRecords, postRecords, deleteRecords, getRecord, deleteRecord, putRecord, patchRecord } from './service.mjs'

const router = express.Router()

router.route('/students')
    .get(async (req, res) => getRecords(Student, req, res))
    .post(async (req, res) => postRecords(Student, req, res))
    .delete(async (req, res) => deleteRecords(Student, req, res))

router.route('/students/:id')
    .get(async (req, res) => getRecord(Student, req, res))
    .put(async (req, res) => putRecord(Student, req, res))
    .delete(async (req, res) => deleteRecord(Student, req, res))
    .patch(async (req, res) => patchRecord(Student, req, res))

router.route('/professors')
    .get(async (req, res) => getRecords(Professor, req, res))
    .post(async (req, res) => postRecords(Professor, req, res))
    .delete(async (req, res) => deleteRecords(Professor, req, res))

router.route('/professors/:id')
    .get(async (req, res) => getRecord(Professor, req, res))
    .put(async (req, res) => putRecord(Professor, req, res))
    .delete(async (req, res) => deleteRecord(Professor, req, res))
    .patch(async (req, res) => patchRecord(Professor, req, res))

router.route('/projects')
    .get(async (req, res) => getRecords(Project, req, res))
    .post(async (req, res) => postRecords(Project, req, res))
    .delete(async (req, res) => deleteRecords(Project, req, res))

router.route('/projects/:id')
    .get(async (req, res) => getRecord(Project, req, res))
    .put(async (req, res) => putRecord(Project, req, res))
    .delete(async (req, res) => deleteRecord(Project, req, res))
    .patch(async (req, res) => patchRecord(Project, req, res))

export default router;