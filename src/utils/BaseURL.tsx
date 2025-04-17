interface BaseUrls {
    BASE_URL_USER_SERVICE: string,
    BASE_URL_COURSE_SERVICE: string,
    BASE_URL_TEACHER_MANAGEMENT_SERVICE: string,
    BASE_URL_REVIEW_SERVICE: string,
    BASE_URL_LECTURE_SERVICE: string,
}

export const BASEURL: BaseUrls = {
    // BASE_COURSE_URL: "http://localhost:4000/api/v1/student/course",
    // BASE_USER_URL: "http://localhost:4000/api/v1/user",
    // BASE_EMAIL_URL: "http://localhost:4000/api/v1/student/email",
    // BASE_REVIEW_URL: "http://localhost:4000/api/v1/student/reviews",
    // BASE_MENTOR_URL: "http://localhost:4000/api/v1/student/mentor",
    // BASE_CART_URL: "http://localhost:4000/api/v1/student/cart",
    BASE_URL_USER_SERVICE: "http://192.168.50.19:8080/api/v1/user",
    BASE_URL_COURSE_SERVICE: "http://192.168.50.19:8081/api/v1/course",
    BASE_URL_TEACHER_MANAGEMENT_SERVICE: "http://192.168.50.19:8082/api/v1/teacher",
    BASE_URL_REVIEW_SERVICE: "http://192.168.50.19:8083/api/v1/reviews",
    BASE_URL_LECTURE_SERVICE: "http://192.168.50.19:8084/api/v1/lectures",
};
