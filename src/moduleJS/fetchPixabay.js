const KEY_PIXABAY = 24451449-e9ba9ef03736e50737df0cc12;
const BASE_URL = 'https://pixabay.com/api/';
const options = 'fields=name,capital,population,flags,languages';
export default function fetchPixabay(name){
return fetch(`${BASE_URL}/name/${name}?${options}`)
.then(res => {
    if (!res.ok) {throw new Error('404 not found');}

    return res.json();
  });
}

