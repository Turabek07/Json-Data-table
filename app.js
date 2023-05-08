const jsonData = generateData(2000);
function generateData(numRows) {
  const data = [];
  const columns = [
    { name: "id", generator: () => faker.random.uuid() },
    { name: "firstName", generator: () => faker.name.firstName() },
    { name: "lastName", generator: () => faker.name.lastName() },
    { name: "email", generator: () => faker.internet.email() },
    { name: "phone", generator: () => faker.phone.phoneNumber() },
    { name: "address", generator: () => faker.address.streetAddress() },
    { name: "city", generator: () => faker.address.city() },
    { name: "state", generator: () => faker.address.state() },
    { name: "country", generator: () => faker.address.country() },
    { name: "zipCode", generator: () => faker.address.zipCode() }
  ];

  for (let i = 0; i < numRows; i++) {
    const row = {};
    for (const column of columns) {
      row[column.name] = column.generator();
    }
    data.push(row);
  }

  return data;
}
//create get headers function
function getTh(){
    const column = Object.keys(jsonData[0]);
    const head = document.querySelector('thead');
    let tags = '<tr>';
    for(let i = 0; i < column.length;i++){
        tags += `<th>${column[i]} </th>`
    }
    tags += "</tr>"
    head.innerHTML = tags;
    getTable()
}
////


//created get table function
function getTable(){
    const body = document.querySelector('tbody')
    let tags = "";
    jsonData.map(d =>{
        tags += `<tr>
        <td>${d.id}</td>
        <td>${d.firstName}</td>
        <td>${d.lastName}</td>
        <td>${d.email}</td>
        <td>${d.phone}</td>
        <td>${d.address}</td>
        <td>${d.city}</td>
        <td>${d.state}</td>
        <td>${d.country}</td>
        <td>${d.zipCode}</td>
        `
    })
    body.innerHTML = tags
}
getTh()
//////


