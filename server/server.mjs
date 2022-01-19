import express, { json } from 'express';
import { intitialize } from './repository.mjs';
import routes from './routes.mjs';
import { Professor, Student, Project, Deliverable, ProjectEvaluator, Grades } from './repository.mjs';
import { getRecords, postRecords, deleteRecords, getRecord, deleteRecord, putRecord, patchRecord, authenticate, addEmailsToProject, addDeliverables, getDeliverables } from './service.mjs'


const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(json())
app.use('/api', routes)


app.listen(8081, async () => {
    try {
        await intitialize()
        setTimeout(assignEvaluators, 100);
    } catch (err) {
        console.error(err)
    }
})

const assignEvaluators = async () => {
    const today = new Date()
    try {
        let records = await Deliverable.findAll()
        if (records.length > 0) {
            for (let record of records) {
                let date = record.end
                console.log('date: ' + date)
                if (isToday(date)) {
                    console.log('deliverable due today')
                    const numberOfEvaluators = 5
                    let students = await Student.findAll({ attributes: { exclude: ['password'] } })
                    const projectId = record.projectId
                    const project = await Project.findByPk(projectId);
                    console.log('projectId: ' + projectId)
                    console.log('project: ' + JSON.stringify(project))
                    let grades = await Grades.findAll({
                        where: {
                            projectId: projectId
                        }
                    })
                    if (grades.length === 0) {
                        for (let i = 0; i < numberOfEvaluators; i++) {
                            let index = Math.floor(Math.random() * students.length);
                            const student = students.pop(index)
                            console.log('student id: ' + student.projectMemberId)
                            if (student.projectMemberId != projectId) {
                                let grade = await Grades.create({ id: student.id, grade: "0", projectId: projectId })
                                console.log('added grade')
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log('end error: ' + error)
    }
    setTimeout(assignEvaluators, 6000);
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }