let count = 0;
const btn = document.getElementById("action-button"); // DOM - document object model
const msg = document.getElementById("message");
const resetBtn = document.getElementById("reset-button");
btn.addEventListener("click", (event) => {
  console.log("Button is clicked: ", event);
  msg.innerText = `Button is tapped ${++count} times!`;
});

resetBtn.addEventListener("click", () => {
  count = 0;
  msg.innerText = `Start tapping the button to see the magic!`;
});

let sampleForm = document.getElementById("book-form");

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  //If the response was OK, return the response body.
  return res.json();
}

//Define the event handler for the form when it's submitted
sampleForm.addEventListener("submit", async (e) => {
  //Prevent browser default behavior
  e.preventDefault();

  //Get the entire form fields
  let form = e.currentTarget;

  //Get URL for api endpoint
  let url = "/book";

  try {
    //Form field instance
    let formData = new FormData(form);

    //Call the `postFormFieldsJson()` function
    let responseData = await postFormFieldsAsJson({ url, formData });
  } catch (error) {
    // Handle the error here.
    console.error(`An has occured ${error}`);
  }
});
