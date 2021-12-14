import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
    storage: './database.db',
    dialect: 'sqlite',
});

const Professor = sequelize.define('professor', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: Sequelize.STRING
})

const Deliverable = sequelize.define('deliverable', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: Sequelize.STRING,
    end: {
        type: Sequelize.DATE,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING
    }
})

const ProjectEvaluator = sequelize.define('projectEvaluator', {
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Project,
            key:'id'
        }
    },
    studentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'id'
        }
    },
    grade: {
        type: Sequelize.FLOAT
    }
})

Project.hasMany(Student, { foreignKey: 'projectMemberId', onDelete: 'CASCADE' })
Student.belongsTo(Project, { foreignKey: 'projectMemberId' })
// Project.hasMany(Student, { foreignKey: 'projectEvaluatorId', onDelete: 'CASCADE' })
// Student.belongsTo(Project, { foreignKey: 'projectEvaluatorId' })

Project.belongsToMany(Student, { through: ProjectEvaluator})
Student.belongsToMany(Project, { through: ProjectEvaluator})


Project.hasMany(Deliverable, { onDelete: 'CASCADE'})
Deliverable.belongsTo(Project)

async function intitialize() {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
}

export {
    intitialize,
    Professor,
    Student,
    Project,
    Deliverable,
    ProjectEvaluator
}