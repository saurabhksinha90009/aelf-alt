import fetch, { FormData, fileFromSync } from 'node-fetch';

const form = new FormData();
form.append('file', fileFromSync('hi.mp4;type=video/mp4'));

fetch('https://api.web3.storage/upload', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI3ZDMxYzdBOTJCNDA1QjcyQ2U4M2M5QkE5NjliMjkzMTQ0NGQxN2EiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTQxNTgyMjMyNDMsIm5hbWUiOiJ0ZXN0In0.3cKPOvjiHCfrwFQEvLnmkJkJhmpTlJHbprCtkt7E0pY',
        'Content-Type': 'multipart/form-data'
    },
    body: form
});