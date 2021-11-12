import http from "k6/http";
import { check, sleep } from "k6";

// Common things
const API_URL = "https://localhost:7125";

// Stress test setup
export let options = {
    stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 }, // normal load
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 }, // around the breaking point
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 }, // beyond the breaking point
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 }, // scale down. Recovery stage.
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