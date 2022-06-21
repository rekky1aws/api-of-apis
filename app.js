const refreshElts = document.getElementsByClassName('refresh');
const displayDiv = document.getElementsByTagName('main')[0];
const pages = document.getElementById('pages-display');

let page = 0;
//console.log(displayDiv);

let data;

for (var i = 0; i < refreshElts.length; i++) {
	// console.log(refreshElts[i]);
	refreshElts[i].addEventListener("change", (e) => {
		displayData(data.entries);
	});
}

function displayData (dataArr, page=0)
{
	const params = getParams();
	console.log(params);
	console.log(page);

	let maxPrint = Math.min((100*page)+100, dataArr.length);
	// console.log(maxPrint);
	displayDiv.innerHTML="";
	for (var i = page*100; i < maxPrint; i++) {
		
		let shouldDisplay = [false, false, false];
		
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

		if (shouldDisplay[0] && shouldDisplay[1] && shouldDisplay[2])
		{
			displayDiv.innerHTML += `
			<div class="api-card">
				<div class="api-name">
					<span class="api-name-title underline">Nom : </span>
					<span class="api-name-value">${dataArr[i].API}</span>
				</div>
				<div class="api-description">
					<span class="api-description-title underline">Description : </span>
					<span class="api-description-value">${dataArr[i].Description}</span>
				</div>
				<div class="api-category">
					<span class="api-category-title underline">Categorie : </span>
					<span class="api-category-value">${dataArr[i].Category}</span>
				</div>
				<div class="api-cors">
					<span class="api-cors-title underline">Cors : </span>
					<span class="api-cors-value">${dataArr[i].Cors}</span>
				</div>
				<div class="api-auth">
					<span class="api-auth-title underline">Auth : </span>
					<span class="api-auth-value">${dataArr[i].Auth}</span>
				</div>
				<div class="api-https">
					<span class="api-https-title underline">HTTPS : </span>
					<span class="api-https-value">${dataArr[i].HTTPS}</span>
				</div>
				<div class="api-https">
					<span class="api-https-title underline">Lien : </span>
					<a href="${dataArr[i].Link}" class="api-https-value">${dataArr[i].Link}</a>
				</div>
			</div>
			`;
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
			pages.innerHTML += `<button onclick="goToPage(${i});">${i+1}</button>`;
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

	console.log(params);

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



