let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");
const monthAndYear = document.getElementById("monthAndYear");
let months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];


showCalendar(currentMonth, currentYear);



	function showLocal(){
		const output = document.querySelector(".output");
		const input = document.querySelector("#input");
		const value = document.querySelector('#input-value').value;

		output.innerHTML = "";

		for(let i = 1; i <= localStorage.getItem("licznik-"+value); i++)
		{
			output.innerHTML += "&gt ";
			output.innerHTML += localStorage.getItem(i+" "+value);
			output.innerHTML += "<br>";
		}
	}

	function saveLocal(){
		const fieldValue = document.querySelector("#input").value;
		const value = document.querySelector('#input-value').value;

		if(fieldValue)
		{
			input.value = "";

			let counter = localStorage.getItem("licznik-"+value);
			counter++;
			localStorage.setItem("licznik-"+value,counter);
			localStorage.setItem(counter+" "+value, fieldValue);

			showLocal();
		}
	}

	function removeLocal(){
		const value = document.querySelector('#input-value').value;
		let x = localStorage.getItem("licznik-"+value)

		for(let i = 1; i <=  x; i++)
		{
			localStorage.removeItem(i+" "+value);
			let y = localStorage.getItem("licznik-"+value)
			y--;
			localStorage.setItem("licznik-"+value,y);
		}
		showLocal();
	}


	function removeLastLocal(){
		const output = document.querySelector(".output");
		const value = document.querySelector('#input-value').value;
		let counter = localStorage.getItem("licznik-"+value);

		localStorage.removeItem(counter+" "+value);

		if(counter > 0)
			counter--;

		localStorage.setItem("licznik-"+value,counter);

		showLocal();
	}

function next(){
	if(currentMonth === 11)
	{
		currentMonth=0
		currentYear++;
	}
	else
		currentMonth++;

    showCalendar(currentMonth, currentYear);
}

function previous(){
	if(currentMonth === 0)
	{
		currentYear--;
		currentMonth=11;
	}
	else
		currentMonth--;

    showCalendar(currentMonth, currentYear);
}


function closeAlert(){
	const checkbox = document.querySelector('#close')
	if(checkbox.checked)
	{
		document.querySelector('#menu').classList = 'alert-off';
		document.querySelector('.calendar').classList = 'calendar';

		checkbox.checked = false;

		let currentMonth = today.getMonth();
		let currentYear = today.getFullYear();
		showCalendar(currentMonth, currentYear);
	}
	else
		document.querySelector('#menu').classList = 'alert-visible';
}

window.addEventListener('load',function(){ //pokazuje eventy w kalendarzu
	setInterval(showLocal,1);
})

function showCalendar(month, year) {
	let firstDay = (new Date(year, month)).getDay();
	let daysInMonth = 32 - new Date(year, month, 32).getDate();
	let tbl = document.getElementById("calendar-body");
	let j = 0;
	let k = parseInt(j);

	tbl.innerHTML = "";

	monthAndYear.innerHTML = months[month] + " " + year; // header

    // tabela
	let date = 1;
    for (let i = 0; i < 6; i++)
	{
		let row = document.createElement("tr");

		//tworzenie kratek z zawartością
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) // przeskoczenie liczby na dane miejsce w kalendarzu
			{
				let cell = document.createElement("td");
				let cellText = document.createTextNode("");

				cell.appendChild(cellText);
				row.appendChild(cell);
			}
			else if (date > daysInMonth)
				break;	
			else
			{
				k++;
				let cell = document.createElement("td");
				let cellText = document.createTextNode(date);

				cell.appendChild(cellText);
				cell.value = year + "-" + parseInt(month+1) + "-" + k;

				let avaivable = localStorage.getItem("licznik-"+cell.value);
				if(avaivable>0)
				{
					cell.style.backgroundColor = '#7e7e7e';
					cell.style.borderRadius = 25 + 'rem';
				}
				else
					cell.style.backgroundColor = 'transparent';

				if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth())
				{
					ell.style.backgroundColor = '#bdbdbd';
					cell.style.borderRadius = 25 + 'rem';
            	}

				cell.addEventListener('click',function(){
					document.querySelector('#menu').classList = 'alert-visible';
					document.querySelector('.calendar').classList += ' calendar-off';
					document.querySelector('#input-value').value = this.value;
				});

				cell.classList += 'td-hover';
				row.appendChild(cell);
				date++;
			}
		}
		tbl.appendChild(row);
	}
}