import express from 'express';
import { Professor, Student, Project, Deliverable, ProjectEvaluator } from './repository.mjs';
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

router.route('/deliverables')
    .get(async (req, res) => getRecords(Deliverable, req, res))
    .post(async (req, res) => postRecords(Deliverable, req, res))
    .delete(async (req, res) => deleteRecords(Deliverable, req, res))

router.route('/deliverables/:id')
    .get(async (req, res) => getRecord(Deliverable, req, res))
    .put(async (req, res) => putRecord(Deliverable, req, res))
    .delete(async (req, res) => deleteRecord(Deliverable, req, res))
    .patch(async (req, res) => patchRecord(Deliverable, req, res))

router.route('/projectEvaluators')
    .get(async (req, res) => getRecords(ProjectEvaluator, req, res))
    .post(async (req, res) => postRecords(ProjectEvaluator, req, res))
    .delete(async (req, res) => deleteRecords(ProjectEvaluator, req, res))

router.route('/projectEvaluators/:id')
    .get(async (req, res) => getRecord(ProjectEvaluator, req, res))
    .put(async (req, res) => putRecord(ProjectEvaluator, req, res))
    .delete(async (req, res) => deleteRecord(ProjectEvaluator, req, res))
    .patch(async (req, res) => patchRecord(ProjectEvaluator, req, res))
export default router;