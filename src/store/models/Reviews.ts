import { Course } from "./Course";

export interface Review {
    id: number;
    userId: string;
    course: Course;
    content: string;
    review: number;
}