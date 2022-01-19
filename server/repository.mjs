import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
    storage: './database.db',
    dialect: 'sqlite',
    logging: false
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
    },
    password: {
        type: Sequelize.STRING
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
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING
    },
}, {
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
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

const Grades = sequelize.define('grades', {
    id: {
        type: Sequelize.UUID,
        defaulValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    projectId: {
        type: Sequelize.UUID,
    },
    grade: {
        type: Sequelize.STRING
    }
})

const ProjectEvaluator = sequelize.define('projectEvaluator', {
    grade: {
        type: Sequelize.STRING
    }
})

Project.hasMany(Student, { foreignKey: 'projectMemberId' })
Student.belongsTo(Project, { foreignKey: 'projectMemberId' })
// Project.hasMany(Student, { foreignKey: 'projectEvaluatorId' })
// Student.belongsTo(Project, { foreignKey: 'projectEvaluatorId' })

// Project.belongsToMany(Student)
// Student.belongsTo(Project)


Project.hasMany(Deliverable)
Deliverable.belongsTo(Project)

async function intitialize() {
    await sequelize.authenticate()
    await sequelize.sync({})
}

export {
    intitialize,
    Professor,
    Student,
    Project,
    Deliverable,
    ProjectEvaluator,
    Grades
}