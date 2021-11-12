import http from "k6/http";
import { check, sleep } from "k6";

// Common things
const API_URL = "https://localhost:7125";


// Soak test setup
export let options = {
    stages: [
        { duration: '2m', target: 400 }, // ramp up to 400 users
        { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
        { duration: '2m', target: 0 }, // scale down. (optional)
    ]
};

// Test scenario
export default function () {


    //call simple DTO endpoint
    let callBookSimpleDTO = http.get(`${API_URL}/BookSimpleDTO`)

    check(
        callBookSimpleDTO,
        { "call simple book DTO is 200": (r) => r.status == 200 }
    );

    //call simple DTO endpoint
    let callBookFullDTO = http.get(`${API_URL}/BookFullDTO`)

    check(
        callBookFullDTO,
        { "call full book DTO is 200": (r) => r.status == 200 }
    );

    //call simple DTO endpoint
    let callGetBookFullDTOWithProject = http.get(`${API_URL}/GetBookFullDTOWithProject`)

    check(
        callGetBookFullDTOWithProject,
        { "call callGetBookFullDTOWithProject is 200": (r) => r.status == 200 }
    );

    // Short break between iterations
    sleep(0.5);
}