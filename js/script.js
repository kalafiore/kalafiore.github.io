const listWrapper = document.querySelector(".list-wrapper")
const checkedTracksList = document.querySelector(".checked-trackes-list")
const checkedCoursesList = document.querySelector('.checked-courses-list')

let text = "<span> You have selected: </span>"
let checkedTracksArray = []
let checkedCoursesArray = []

//Wyswietlamy listę trackow oraz nadajemy listenera na checkbox
function createTrackList(table) {
	for (let i = 0; i < table.length; i++) {
		const sigleTrackAndCourseWrapper = document.createElement("div")
		const singleTrackWrapper = document.createElement("div")
		singleTrackWrapper.setAttribute("id", `sigleTrackWrapper${i}`)
		singleTrackWrapper.classList.add("single-track-wrapper")
		const trackCheckBox = document.createElement("input")
		trackCheckBox.setAttribute("type", "checkbox")
		trackCheckBox.setAttribute("value", table[i].name)
		// trackCheckBox.setAttribute("id", `trackItem${i}`) //czy to potrzebne
		trackCheckBox.classList.add("track-checkbox")
		//Zatem mamy <INPUT type="checkbox" value="trackItem(i).name" id="trackItem(i) class="checkbox">

		const trackLabel = document.createElement("label")
		// trackLabel.setAttribute("id", `trackLabel${i}`) //czy to potrzebne.. no wlasnie nie wiem, chyba nie
		trackLabel.classList.add('track-label')
		trackLabel.textContent = table[i].name
		//Czyli mamy <LABEL id="i"> name </LABEL>

		listWrapper.append(sigleTrackAndCourseWrapper)
		sigleTrackAndCourseWrapper.append(singleTrackWrapper)
		singleTrackWrapper.append(trackCheckBox)
		singleTrackWrapper.append(trackLabel)
		trackCheckBox.addEventListener("click", isTrackChecked)
		trackLabel.addEventListener("click", () => courseForTruck(table, i))
	}
}

// Dla danego trucka sprawdzamy czy istnieje lista coursow jesli nie to ja pobieramy jesli tak to tooglujemy hidden
function courseForTruck(table, trackNumber) {
	const trackElement = document.querySelector(`#sigleTrackWrapper${trackNumber}`)
	const courseListWrapper = document.createElement("div")

	if (document.querySelector(`#course-for-truck${trackNumber}`) === null) {
		courseListWrapper.setAttribute("id", `course-for-truck${trackNumber}`)
		courseListWrapper.classList.add("course-list-wrapper")
		trackElement.parentElement.append(courseListWrapper)

		fetch(table[trackNumber].link)
			.then(response => response.json())
			.then(json => {
				let myCourseData = JSON.stringify(json)
				let courseTable = JSON.parse(myCourseData)
				for (let i = 0; i < courseTable.length; i++) {
					const courseElementParagraph = document.createElement("p")
					const courseCheckBox = document.createElement("input")
					courseCheckBox.setAttribute("type", "checkbox")
					courseCheckBox.setAttribute("value", courseTable[i].name)
					//Zatem mamy <INPUT type="checkbox" value="name">

					const courseLabel = document.createElement("label")
					courseLabel.textContent = courseTable[i].name
					//Czyli mamy <LABEL> name </LABEL>
					courseListWrapper.append(courseElementParagraph)
					courseElementParagraph.append(courseCheckBox)
					courseElementParagraph.append(courseLabel)
					courseCheckBox.addEventListener('click', isCourseChecked)
				}
			})
	} else {
		document
			.querySelector(`#course-for-truck${trackNumber}`)
			.classList.toggle("hidden")
	}
}

//-----------Na click checkboxa pushujemy lub usuwamy jego nazwe z listy---------//
function isTrackChecked() {
	if (this.checked == true) {
		console.log(`You checked ${this.value}`)
		checkedTracksArray.push(this.value)
		checkedTracksList.innerHTML = text + checkedTracksArray.join(" / ")
	} else {
		console.log("you unchecked")
		checkedTracksArray = checkedTracksArray.filter(e => e !== this.value)
		checkedTracksList.innerHTML = text + checkedTracksArray.join(" / ")
	}
}

function isCourseChecked() {
	if (this.checked == true) {
		console.log(`You checked ${this.value}`)
		checkedCoursesArray.push(this.value)
		checkedCoursesList.innerHTML = text + checkedCoursesArray.join(" / ")
	} else {
		console.log("you unchecked")
		checkedCoursesArray = checkedCoursesArray.filter(e => e !== this.value)
		checkedCoursesList.innerHTML = text + checkedCoursesArray.join(" / ")
	}
}

//-------------zaznaczanie wszystkich coursow jesli zaznaczymy trucka -----------------//




fetch("https://kalafiore.github.io/json/data.json")
	.then(response => response.json())
	.then(json => {
		let myData = JSON.stringify(json)
		let table = JSON.parse(myData)

		createTrackList(table)
	})
