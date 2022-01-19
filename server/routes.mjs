import express from 'express';
import { Professor, Student, Project, Deliverable, ProjectEvaluator, Grades } from './repository.mjs';
import { getRecords, postRecords, deleteRecords, getRecord, deleteRecord, putRecord, patchRecord, authenticate, addEmailsToProject, addDeliverables, getDeliverables, getProjects, getGrade } from './service.mjs'

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

router.route('/addEmailsToProject')
    .post(async (req, res) => addEmailsToProject(Student, Project, req, res))

router.route('/addDeliverables')
    .post(async (req, res) => addDeliverables(Project, Deliverable, req, res))

router.route('/getGrade/:id')
    .get(async (req, res) => getGrade(Grades, req, res))

router.route('/professors')
    .get(async (req, res) => getRecords(Professor, req, res))
    .post(async (req, res) => postRecords(Professor, req, res))
    .delete(async (req, res) => deleteRecords(Professor, req, res))

router.route('/professors/:id')
    .get(async (req, res) => getRecord(Professor, req, res))
    .put(async (req, res) => putRecord(Professor, req, res))
    .delete(async (req, res) => deleteRecord(Professor, req, res))
    .patch(async (req, res) => patchRecord(Professor, req, res))

router.route('/authenticateStudent/:email/:password')
    .get(async (req, res) => authenticate(Student, req, res))
    
router.route('/authenticateProfessor/:email/:password')
    .get(async (req, res) => authenticate(Professor, req, res))    

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
    .get(async (req, res) => getDeliverables(Deliverable, req, res))
    .post(async (req, res) => putRecord(Deliverable, req, res))

router.route('/grades')
    .get(async (req, res) => getRecords(Grades, req, res))
    .post(async (req, res) => postRecords(Grades, req, res))
    .delete(async (req, res) => deleteRecords(Grades, req, res))

router.route('/grades/:id')
    .get(async (req, res) => getRecord(Grades, req, res))
    .post(async (req, res) => putRecord(Grades, req, res))
    .delete(async (req, res) => deleteRecord(Grades, req, res))
    .patch(async (req, res) => patchRecord(Grades, req, res))
export default router;