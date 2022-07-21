const refreshElts = document.querySelectorAll('.refresh');
const displayDiv = document.querySelector('main');
const pages = document.querySelector('#pages-display');
const searchbar = document.querySelector("#searchbar");

let page = 0;
//console.log(displayDiv);

let data;

for (var i = 0; i < refreshElts.length; i++) {
	// console.log(refreshElts[i]);
	refreshElts[i].addEventListener("change", (e) => {
		displayData(data.entries);
	});
}

searchbar.addEventListener("keyup", () => {
	displayData(data.entries, page);
});

function displayData (dataArr, pageNum=0)
{
	const params = getParams();

	const pageButtons = document.getElementsByClassName('page-button');
	for (var i = 0; i < pageButtons.length; i++) {
		pageButtons[i].style.backgroundColor = "#4f250a";
		pageButtons[i].style.color = "#EEE";
	}
	pageButtons[pageNum].style.backgroundColor = "#e89a66";
	pageButtons[pageNum].style.color = "black";
	
	let maxPrint = Math.min((100*pageNum)+100, dataArr.length);
	// console.log(maxPrint);
	displayDiv.innerHTML = "";
	for (var i = pageNum*100; i < maxPrint; i++) {
		
		let shouldDisplay = [false, false, false, false];
		
		if (params.Cors === null) {
			shouldDisplay[0] = true;
		} else {
			if (params.Cors === dataArr[i].Cors)
			{
				shouldDisplay[0] = true;
			}
		}

		if (params.Auth === null) {
			shouldDisplay[1] = true;
		} else {
			if (params.Auth === dataArr[i].Auth)
			{
				shouldDisplay[1] = true;
			}
		}

		if (params.HTTPS === null) {
			shouldDisplay[2] = true;
		} else {
			if (params.HTTPS === dataArr[i].HTTPS)
			{
				shouldDisplay[2] = true;
			}
		}

		if (searchbar.value.length >= 3) {
			Object.keys(dataArr[i]).forEach (element => {
				if (typeof dataArr[i][element] === "string")
				{
					if (dataArr[i][element].toLowerCase().indexOf(searchbar.value.toLowerCase()) >= 0) {
						// console.log(element);
						console.log(dataArr[i][element])
						shouldDisplay[3] = true;
					}
				}
			});
		} else {
			shouldDisplay[3] = true;
		}

		if (shouldDisplay[0] && shouldDisplay[1] && shouldDisplay[2] && shouldDisplay[3])
		{
			let apiCard = document.createElement('div');
			apiCard.className = "api-card";

			// Name
			 let apiName = document.createElement('div');
			 apiName.className = "api-name";

			  let apiNameTitle = document.createElement('span');
			  apiNameTitle.className = "api-name-title underline";
			  apiNameTitle.innerHTML = "Nom : ";
			  apiName.appendChild(apiNameTitle);

			  let apiNameValue = document.createElement('span');
			  apiNameValue.className = "api-name-value";
			  apiNameValue.innerHTML = dataArr[i].API;
			  apiName.appendChild(apiNameValue);

		  	// Description
			let apiDescription = document.createElement('div');
			 apiDescription.className = "api-description";

			  let apiDescriptionTitle = document.createElement('span');
			  apiDescriptionTitle.className = "api-description-title underline";
			  apiDescriptionTitle.innerHTML = "Descripton : ";
			  apiDescription.appendChild(apiDescriptionTitle);

			  let apiDescriptionValue = document.createElement('span');
			  apiDescriptionValue.className = "api-description-value";
			  apiDescriptionValue.innerHTML = dataArr[i].Description;
			  apiDescription.appendChild(apiDescriptionValue);

			// Category
			 let apiCategory = document.createElement('div');
			 apiCategory.className = "api-category";

			  let apiCategoryTitle = document.createElement('span');
			  apiCategoryTitle.className = "api-category-title underline";
			  apiCategoryTitle.innerHTML = "Catégorie : ";
			  apiCategory.appendChild(apiCategoryTitle);

			  let apiCategoryValue = document.createElement('span');
			  apiCategoryValue.className = "api-category-value";
			  apiCategoryValue.innerHTML = dataArr[i].Category;
			  apiCategory.appendChild(apiCategoryValue);

			// CORS
		  	 let apiCors = document.createElement('div');
			 apiCors.className = "api-cors";

			  let apiCorsTitle = document.createElement('span');
			  apiCorsTitle.className = "api-cors-title underline";
			  apiCorsTitle.innerHTML = "CORS : ";
			  apiCors.appendChild(apiCorsTitle);

			  let apiCorsValue = document.createElement('span');
			  apiCorsValue.className = "api-cors-value";
			  apiCorsValue.innerHTML = dataArr[i].Cors;
			  apiCors.appendChild(apiCorsValue);

			// Auth
			 let apiAuth = document.createElement('div');
			 apiAuth.className = "api-auth";

			  let apiAuthTitle = document.createElement('span');
			  apiAuthTitle.className = "api-auth-title underline";
			  apiAuthTitle.innerHTML = "Auth : ";
			  apiAuth.appendChild(apiAuthTitle);

			  let apiAuthValue = document.createElement('span');
			  apiAuthValue.className = "api-auth-value";
			  if (dataArr[i].Auth) {
				apiAuthValue.innerHTML = dataArr[i].Auth;
			  } else {
			  	apiAuthValue.innerHTML = "None"
			  }
			  apiAuth.appendChild(apiAuthValue);

			// HTTPS
			 let apiHTTPS = document.createElement('div');
			 apiHTTPS.className = "api-https";

			  let apiHTTPSTitle = document.createElement('span');
			  apiHTTPSTitle.className = "api-https-title underline";
			  apiHTTPSTitle.innerHTML = "HTTPS : ";
			  apiHTTPS.appendChild(apiHTTPSTitle);

			  let apiHTTPSValue = document.createElement('span');
			  apiHTTPSValue.className = "api-https-value";
			  apiHTTPSValue.innerHTML = dataArr[i].HTTPS;
			  apiHTTPS.appendChild(apiHTTPSValue);

			// Link
			 let apiLink = document.createElement('div');
			 apiLink.className = "api-link";

			  let apiLinkTitle = document.createElement('span');
			  apiLinkTitle.className = "api-link-title underline";
			  apiLinkTitle.innerHTML = "Link : ";
			  apiLink.appendChild(apiLinkTitle);

			  let apiLinkValue = document.createElement('a');
			  apiLinkValue.className = "api-link-value";
			  apiLinkValue.innerHTML = dataArr[i].Link;
			  apiLinkValue.href = dataArr[i].Link;
			  apiLink.appendChild(apiLinkValue);

			// Adding all infos to apiCard
			 apiCard.appendChild(apiName);
			 apiCard.appendChild(apiDescription);
			 apiCard.appendChild(apiCategory);
			 apiCard.appendChild(apiCors);
			 apiCard.appendChild(apiAuth);
			 apiCard.appendChild(apiHTTPS);
			 apiCard.appendChild(apiLink);

			// Adding apiCard to displayDiv.
			displayDiv.appendChild(apiCard);
		}
	}
}

async function loadAPI ()
{
	try {
		const response = await fetch("https://api.publicapis.org/entries");
		data = await response.json();
		console.log(data);

		for (var i = 0; i < Math.floor(data.count/100) + 1; i++) {
			pages.innerHTML += `<button onclick="goToPage(${i});" class="round-button page-button">${i+1}</button>`;
		}
		displayData(data.entries);
	} catch (e) {
		console.error(e);
	}
}

function getParams ()
{
	let params = {
		"Cors":undefined,
		"HTTPS":undefined,
		"Auth":undefined
	};

	let isOk = true;

	if (refreshElts[0].checked) {
		params.Cors = "yes";
	} else if (refreshElts[1].checked) {
		params.Cors = "no";
	} else if (refreshElts[2].checked) {
		params.Cors = null;
	} else {
		params.Cors = undefined;
		console.error("Incorrect Value for CORS type");
		isOk = false;
	}

	if (refreshElts[3].checked) {
		params.Auth = "apiKey";
	} else if (refreshElts[4].checked) {
		params.Auth = "OAuth";
	} else if (refreshElts[5].checked) {
		params.Auth = "";
	} else if (refreshElts[6].checked) {
		params.Auth = null;
	} else {
		params.Auth = undefined;
		console.error("Incorrect Value for Auth type");
		isOk = false;
	}

	if (refreshElts[7].checked) {
		params.HTTPS = true;
	} else if (refreshElts[8].checked) {
		params.HTTPS = false;
	} else if (refreshElts[9].checked){
		params.HTTPS = null;
	} else {
		params.HTTPS = undefined;
		console.error("Incorrect Value for HTTPS type");
		isOk = false;
	}

	if (isOk) {
		return params;
	}
}

function nextPage()
{
	if(page + 1 <= Math.floor(data.count/100)) {
		page++;
		displayData(data.entries, page);
	}	
	// console.log("nextPage");
}

function previousPage()
{
	if(page - 1 >= 0) {
		page--;
		displayData(data.entries, page);
	}
}

function goToPage (n)
{
	console.log("goToPage", n);
	displayData(data.entries, n);
	page = n;
}

loadAPI();



