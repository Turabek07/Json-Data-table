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
//create get table headers function
function getTableHeaders() {
  const column = Object.keys(jsonData[0]);
  const head = document.querySelector('thead');
  let tags = '<tr>';
  for (let i = 0; i < column.length; i++) {
    tags += `<th>${column[i]} </th>`
  }
  tags += "</tr>"
  head.innerHTML = tags;

  getTable(1, 200)

}


//get table function to get table's data
function getTable(page, pageSize, searchQuery) {
  const body = document.querySelector("tbody");
  let tags = "";
  let data = jsonData;

  // Filter data based on search query
  if (searchQuery) {
    data = jsonData.filter((d) => {
      return Object.values(d)
        .join("")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  data = data.slice(startIndex, endIndex);

  data.map((d) => {
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
        `;
  });
  body.innerHTML = tags;

  // add previous and next buttons
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  prevButton.disabled = page === 1;
  nextButton.disabled = endIndex >= jsonData.length;
  prevButton.addEventListener("click", () => {
    if (page > 1) {
      getTable(page - 1, pageSize, searchQuery);
    }
  });
  nextButton.addEventListener("click", () => {
    if (endIndex < jsonData.length) {
      getTable(page + 1, pageSize, searchQuery);
    }
    //  else if (endDataIndex == 2000){
    //   nextButton.classList.add("active")
    // }
    // else if(!endDataIndex===2000) {
    //   nextButton.classList.remove("active")
    // } ;
    //   prevButton.classList.remove("active");
    
    
  });


  // Update visible data span
  const visibleDataSpan = document.querySelector("#visible-data");
  const startDataIndex = startIndex + 1;
  const endDataIndex = Math.min(endIndex, jsonData.length);
  visibleDataSpan.innerText = `Showing ${startDataIndex} to ${endDataIndex} of ${jsonData.length} entries`;

}

// Add event listener to search input
const input = document.querySelector("#input");
input.addEventListener("input", () => {
  const searchQuery = input.value;
  getTable(1, 200, searchQuery);
});


getTableHeaders();



