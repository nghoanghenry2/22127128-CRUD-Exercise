async function deleteUser(id) {
  try {
    let res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    let toastBody = document.querySelector(".toast, .toast-body");
    toastBody.innerText = "Can't delete user!";
    toastBody.style.color = "red";
  }
}

function showEditUserModal(btn) {
  const { id, firstName, lastName, username, mobile, isAdmin } = btn.dataset;
  document.querySelector("#idEdit").value = id;
  document.querySelector("#firstNameEdit").value = firstName;
  document.querySelector("#lastNameEdit").value = lastName;
  document.querySelector("#usernameEdit").value = username;
  document.querySelector("#mobileEdit").value = mobile;
  document.querySelector("#isAdminEdit").checked = isAdmin ? true : false;
}
  
async function editUser(e) {
  e.preventDefault();
  try {
    const formData = new FormData(document.querySelector("#editUserForm"));
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    }); 
    if (res.status == 200) {
      return location. reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  } catch (error) {
    document.querySelector("#errorMessageEdit"). innerText = error.message;
    console. log(error);
  }
}

document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  const id = btnConfirm.dataset.id;
  btnConfirm.addEventListener("click", (e) => {
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

async function editUser(e) {
  e.preventDefault();
  try {
    const formData = new FormData(document.querySelector("#editUserForm"));
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    }); 
    if (res.status == 200) {
      return location. reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  } catch (error) {
    document.querySelector("#errorMessageEdit"). innerText = error.message;
    console. log(error);
  }
}