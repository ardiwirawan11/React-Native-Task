import axios from 'axios';
export const apiGetData  = () => {
    return axios
        .get(
           `https://ulo.life/api/timeslots?provider_id=7c8ea264-2cd3-4e5b-8f40-46a1a6fda174&sort_by=created_at&order=asc&app_version=1.10.0`
        )
        .then(function (res) {
            return res.data.data
        });
};