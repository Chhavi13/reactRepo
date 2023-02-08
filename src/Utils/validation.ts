import { Question } from '.././Interfaces/userInterfaces'

const emailValidation = (userData: Question) => {
    let error: any = {};
    let valid = true;

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/i;
    if (userData.email !== undefined && !userData.email) {
        error = "Please enter email";
        valid = false;
    } else if (userData.email !== undefined && !emailregex.test(userData.email)) {
        error = "Please enter valid email";
        valid = false;
    } else if (userData.email) {
        error = undefined;
    }
    return { error, valid };
};

export const podCastSubmission = (questionData: Question) => {
    let errors: Question = {};
    let isValid = true;
    if (questionData?.first_name !== undefined && !questionData?.first_name) {
        errors.first_name = 'Please Enter First Name'
        isValid = false
    } else if (questionData?.first_name !== undefined && questionData.first_name.length < 3) {
        errors.first_name = 'Please Enter Minimum 3 Char'
    } else if (questionData?.first_name) {
        errors.first_name = undefined
    }

    if (questionData?.last_name !== undefined && !questionData?.last_name) {
        errors.last_name = "Please Enter Last Name"
    }else if (questionData?.last_name !== undefined && questionData.last_name.length < 3) {
        errors.last_name = 'Please Enter Minimum 3 Char'
    } else if (questionData?.last_name) {
        errors.last_name = undefined
    }

    if (questionData?.email !== undefined) {
        const { error, valid } = emailValidation(questionData)
        if (!valid) {
            errors.email = error
        } else {
            errors.email = ""
        }
    }

    if (questionData.phone !== undefined && !questionData.phone) {
        errors.phone = "Please enter phone number";
        isValid = false;
    } else if (
        questionData.phone !== undefined &&
        questionData.phone.length < 7
    ) {
        errors.phone = "Please enter valid number";
    } else if (questionData.phone) {
        errors.phone = undefined;
    }

    if (questionData.dob !== undefined && !questionData.dob) {
        errors.dob = "Please enter date of birth";
        isValid = false;
    } else if (questionData.dob) {
        errors.dob = undefined;
    }
    if (questionData.subject !== undefined && !questionData.subject) {
        errors.subject = "Please Enter Subject";
        isValid = false;
    } else if (questionData.subject) {
        errors.subject = undefined
    }
    if (questionData.question !== undefined && !questionData.question) {
        errors.question = "Please Enter question";
        isValid = false;
    } else if (questionData.question) {
        errors.question = undefined
    }

    return { errors, isValid };
}