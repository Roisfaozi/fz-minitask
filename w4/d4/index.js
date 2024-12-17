const dataList = document.getElementById('dataList')
const fetchDataBtn = document.getElementById('fetchDataBtn')
const postDataForm = document.getElementById('postDataForm')
const postResponse = document.getElementById('postResponse')

// Fungsi GET request untuk mengambil data
fetchDataBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    dataList.innerHTML = '' // Kosongkan list

    // Meambahkan elemen secara dinamis berdasarkan data yang di-fetch
    data.slice(0, 5).forEach((item) => {
      const li = document.createElement('li')
      li.textContent = `ID: ${item.id} - Title: ${item.title}`
      dataList.appendChild(li)
    })
  } catch (error) {
    console.error('Fetch Error:', error)
    alert('Terjadi kesalahan saat mengambil data.')
  }
})

// Fungsi POST request untuk mengirim data
postDataForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value,
    userId: document.getElementById('userId').value,
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const result = await response.json()
    postResponse.textContent = JSON.stringify(result, null, 2)
  } catch (error) {
    console.error('POST Error:', error)
    alert('Terjadi kesalahan saat mengirim data.')
  }
})
