import { ContactModel, IContactModel } from '../../src/models/ContactModel';
import { SubjectModel } from '../../src/models/SubjectModel';
import { UserModel } from '../../src/models/UserModel';

export const createUser = () => {
    return UserModel.create({
        firstName: 'Ivan',
        lastName: 'Ivanov',
        subgroup: 1,
        username: 'testuser',
        password: 'qwerty12345',
        completedTasks: [],
    });
};

export const createContact = () => {
    return ContactModel.create({
        firstName: 'Анатолий',
        patronymic: 'Ефремович',
        lastName: 'Скворцов',
        email: 'a.e.skvorcov@mail.ru',
    });
};

export const createSubject = async (teacher: IContactModel) => {
    return await SubjectModel.create({
        name: 'Математический анализ',
        teachers: [teacher.id],
    });
};
