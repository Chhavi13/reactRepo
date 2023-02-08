export interface Question {
    first_name?: string
    last_name?: string
    email?: string | any
    phone?: number | any | string
    dob?: string | number
    subject?: string | any
    question?: string | any
}
export interface CreateQuestion extends Question {
    level: string
}