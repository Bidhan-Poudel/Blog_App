const API_URL= 'http://localhost:3000/data/';

export async function getData() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Error fetching data');
  }
  return res.json();
}

export async function getDataById(id) {
  const res= await fetch(API_URL+ id);
  const resposne= await res.json();
  if (!res.ok) {
    throw new Error('Error fetching data');
  }
  return resposne;
}

export async function submitData({ title, body, image }) {
  console.log(title,body,image);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
      image:image
    })
  });
  if (!res.ok) {
    throw new Error('Error submitting data');
  }
  return res.status;
}
 
export async function updateData({title,body,image,id}) {
  const res = await fetch(API_URL + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body,
      image:image
    })
  });
  if (!res.ok) {
    throw new Error('Error updating list item');
  }
  console.log(res.status);
  return res.status;
}

export async function deleteData(id) {
  
  const res = await fetch(API_URL+id, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Error deleting list item');
  }
  console.log(res.status);
  return res.status;
}



