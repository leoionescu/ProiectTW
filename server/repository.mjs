import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    storage: './database.db',
    dialect: 'sqlite',
});

const Professor = sequelize.define('profesor', {
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
    description: Sequelize.STRING,
    begin: {
        type: Sequelize.DATE,
        allowNull: false,
    }   ,
    end: {
        type: Sequelize.DATE,
        allowNull: false
    }
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
    }
})

Project.hasMany(Student, { foreignKey: 'projectMemberId' })
Student.belongsTo(Project, { foreignKey: 'projectMemberId' })

Project.hasMany(Student, { foreignKey: 'projectEvaluatorId' })
Student.belongsTo(Project, { foreignKey: 'projectEvaluatorId' })

Project.hasMany(Deliverable, { foreignKey: 'deliverableId' })
Deliverable.belongsTo(Project, { foreignKey: 'deliverableId'})

async function intitialize() {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
}

export {
    intitialize,
    Profesor,
    Student,
    Project
}