export const refreshToken = async () => {
    return await fetch("http://localhost:8080/api/v1/user/refresh", {
        method: "GET",
        credentials: 'include',
    }).then(res => res.json())
    .then(data => {return data});
}