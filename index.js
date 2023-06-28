console.log("file attached");

const form = document.getElementsByClassName("form_wraper")[0];
const loading = document.getElementsByClassName("loading_img")[0];
let updates = document.getElementsByClassName("update");
const updateForm = document.getElementsByClassName("update_user")[0];

// loading.classList.toggle("dispaly_Off");
// loading.classList.toggle("form_wraper");

async function addTableData() {
  const tBody = document.getElementsByClassName("table_body");
  const past = document.getElementsByClassName("past_birthday");

  // loading.classList.toggle("dispaly_Off");
  // loading.classList.toggle("form_wraper");

  const res = await fetch(
    "https://hello-world-calm-hall-d45d.mayur-e8c.workers.dev/"
  );
  const entris = await res.json();

  // loading.classList.toggle("loading_imgPlay");
  loading.classList.toggle("loading_img");

  const { data, pastDOB } = entris;

  let collectData = "";
  let collectPastDOB = "";
  const date = new Date();
  const today = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const monthWithTwoDig = month < 10 ? "0" + month : month;

  // console.log(todayDate);

  let todayDate = today + "/" + monthWithTwoDig + "/" + year;

  for (let i = 0; i < data.length; i++) {
    const cheackDate =
      data[i].Day == today && data[i].Month == monthWithTwoDig ? true : false;
    const remaningDay = Math.abs(data[i].Day - today);
    const remaningMonthes = Math.abs(data[i].Month - monthWithTwoDig);

    const name = data[i].name;

    collectData += `<tr onclick="deleteUser(event)">
                <td>${i + 1}</td>
                <td>${data[i]?.ID}</td>
                <td>${data[i].name}</td>
                <td>${data[i].DOB}</td>
                <td>${
                  cheackDate
                    ? " 🍰Today Is Your Birthday 🍰"
                    : remaningDay + " Days And " + remaningMonthes + " Months"
                } </td>
                <td><button class="delete_btn">delete</button></td> 
                <td><button class="update">update</button></td>  
               
        </tr>`;
  }

  for (let i = 0; i < pastDOB.length; i++) {
    const cheackDate =
      pastDOB[i]?.Month == monthWithTwoDig && pastDOB[i]?.Day == today
        ? true
        : false;

    const remaningDay = pastDOB[i]?.Day - today;
    const remaningMonthes = pastDOB[i]?.Month - monthWithTwoDig;

    // console.log(remaningDay);

    // console.log(pastDOB[i]?.Month == monthWithTwoDig && data[i]?.Day == today);

    collectPastDOB += `<tr onclick="deleteUser(event)">
                <td>${i + 1}</td>
                <td>${pastDOB[i]?.ID}</td>
                <td>${pastDOB[i].name}</td>
                <td>${pastDOB[i].DOB}</td>
                <td>${
                  cheackDate
                    ? "Today Is Your Birthday"
                    : remaningDay + " Days And " + remaningMonthes + " Months"
                } </td>
                <td><button class="delete_btn">delete</button></td>  
                <td><button class="update">update</button></td>  
                  
        </tr>`;
  }

  tBody[0].innerHTML = collectData;
  past[0].innerHTML = collectPastDOB;

  // loading.classList.toggle("loading_img");
  loading.classList.toggle("loading_imgPlay");

  [...updates].forEach((element) => {
    element.addEventListener("click", () => {
      loading.classList.toggle("loading_imgPlay");
      updateForm.classList.toggle("show_Form");
      updateForm.classList.toggle("update_user");
      console.log("running");
    });
  });

  // updateForm.classList.toggle("show_Form");
  // updateForm.classList.toggle("update_user");
  // loading.classList.toggle("loading_imgPlay");

  // loading.classList.toggle("loading_img");
}
addTableData();

function deleteUser(e) {
  // e.stopPropogation();
  loading.classList.toggle("loading_imgPlay");
  loading.classList.toggle("loading_img");

  const dataFordelete = {};

  dataFordelete["name"] =
    e.currentTarget.querySelector("td:nth-child(3)").innerText;
  dataFordelete["DOB"] =
    e.currentTarget.querySelector("td:nth-child(4)").innerText;
  dataFordelete["ID"] =
    e.currentTarget.querySelector("td:nth-child(2)").innerText;

  if (e.target.className == "delete_btn") {
    fetch("https://hello-world-calm-hall-d45d.mayur-e8c.workers.dev/", {
      method: "DELETE",
      body: JSON.stringify(dataFordelete),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        addTableData();
      })
      .ceatch((e) => {
        console.log();
      })
      .finally(() => {
        console.log("function completed");
      });
  } else {
    const name = document.getElementsByClassName("user_name")[0];
    const DOB = document.getElementsByClassName("user_DOB")[0];
    const ID = document.getElementsByClassName("user_ID")[0];

    name.value = dataFordelete.name;
    DOB.value = dataFordelete.DOB;
    ID.value = dataFordelete.ID;
  }
  // loading.classList.toggle("loading_imgPlay");
}

function update(e) {
  e.preventDefault();

  loading.classList.toggle("loading_imgPlay");
  const name = document.getElementsByClassName("user_name")[0].value;
  const DOB = document.getElementsByClassName("user_DOB")[0].value;
  const ID = document.getElementsByClassName("user_ID")[0].value;

  fetch("https://hello-world-calm-hall-d45d.mayur-e8c.workers.dev/", {
    method: "PUT",
    body: JSON.stringify({ ID: ID, name: name, DOB: DOB }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // loading.classList.toggle("loading_img");
      updateForm.classList.toggle("show_Form");
      updateForm.classList.toggle("update_user");

      return addTableData();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally((ok) => {
      console.log("function completed");
    });
}

function submiteForm(e) {
  e.preventDefault();

  loading.classList.toggle("loading_imgPlay");
  loading.classList.toggle("loading_img");

  if (e.target[0].value && e.target[1].value) {
    fetch("https://hello-world-calm-hall-d45d.mayur-e8c.workers.dev/", {
      method: "POST",
      headers: {},
      body: JSON.stringify({ name: e.target[0].value, DOB: e.target[1].value }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        addTableData();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally((comp) => {
        console.log("fun completed");
        form.classList.toggle("dispaly_Off");
        form.classList.toggle("form_wraper");
      });
  } else {
    form.classList.toggle("dispaly_Off");
    form.classList.toggle("form_wraper");
    loading.classList.toggle("loading_imgPlay");
  }
}

const btn = document.getElementById("addData");

console.log(btn);
btn.addEventListener("click", () => {
  form.classList.toggle("dispaly_Off");
  form.classList.toggle("form_wraper");
  console.log("running");
});

function closeForm() {
  form.classList.toggle("dispaly_Off");
  form.classList.toggle("form_wraper");
}

function closeUpdateForm() {
  updateForm.classList.toggle("show_Form");
  updateForm.classList.toggle("update_user");
}
