/// api url
var globalData = [];
var allCountriesTopData = [];
var allCountriesData = [];
const apiConfig = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
};
var container = document.getElementById("newCases");
var CountryData = document.getElementById("countryData");
const topCases = document.getElementById("top-countries");

const byCountryUrl = "https://api.covid19api.com/summary";

function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.querySelector(".menu").innerText = "Menu";
        document.querySelector(".main-nav").classList.remove("border-bottom");
    } else {
        x.style.display = "block";
        document.querySelector(".menu").innerText = "Close";
        document.querySelector(".main-nav").classList.add("border-bottom");
    }
}




// Function to show all category top 10 data

function sortCases(sortingOn) {
    let sortingData = allCountriesTopData;

    ///sortingList(sortingOn, allCountriesTopData);

    if (sortingOn == "topCases") {
        sortingData.sort((a, b) => {
            return b.TotalConfirmed - a.TotalConfirmed;
        });
    } else if (sortingOn == "topDeaths") {
        sortingData.sort((a, b) => {
            return b.TotalDeaths - a.TotalDeaths;
        });
    } else if (sortingOn == "topRecovered") {
        sortingData.sort((a, b) => {
            return b.TotalRecovered - a.TotalRecovered;
        });
    } else {
        sortingData.sort((a, b) => {
            return b.NewConfirmed - a.NewConfirmed;
        });
    }

    sortingData.slice(0, 10).forEach((e) => {
        var topCasesInner = document.createElement("li");

        topCasesInner.classList.add("top-countries-list");
        var topCasesInnerSpan = topCasesInner.appendChild(
            document.createElement("img")
        );
        topCasesInnerSpan.classList.add("country-flag");
        var topCasesInnerDiv = topCasesInner.appendChild(
            document.createElement("div")
        );
        topCasesInnerDiv.classList.add("top-countries-info");
        var topCasesInnerDivCountry = topCasesInnerDiv.appendChild(
            document.createElement("h6")
        );
        topCasesInnerDivCountry.innerText = e.Country;
        var topCasesInnerDivSpan = topCasesInnerDiv.appendChild(
            document.createElement("h4")
        );
        topCasesInnerSpan.src =
            "https://flagcdn.com/w40/" + e.CountryCode.toLowerCase() + ".png";

        if (sortingOn == "topCases") {
            topCasesInnerDivSpan.innerHTML =
                e.TotalConfirmed.toLocaleString("en-US");
            document.getElementById("top-cases").append(topCasesInner);
        } else if (sortingOn == "topDeaths") {
            topCasesInnerDivSpan.innerHTML =
                e.TotalDeaths.toLocaleString("en-US");
            document.getElementById("top-deaths").append(topCasesInner);
        } else if (sortingOn == "topRecovered") {
            topCasesInnerDivSpan.innerHTML =
                e.TotalRecovered.toLocaleString("en-US");
            document.getElementById("top-recovered").append(topCasesInner);
        } else {
            topCasesInnerDivSpan.innerHTML =
                e.NewConfirmed.toLocaleString("en-US");
            document.getElementById("new-cases").append(topCasesInner);
        }
    });
}

// Pie chart data

function pieChartData(pieGlobalData) {
    const pieCoviddata = {
        labels: ["Cases", "Deaths", "Recovered"],
        datasets: [
            {
                label: "My First Dataset",
                data: pieGlobalData,
                backgroundColor: ["#3398fb", "#f5365c", "#23bdb8"],
                hoverOffset: 4,
            },
        ],
    };
    const config = {
        type: "doughnut",
        data: pieCoviddata,
    };
    var myChart = new Chart(document.getElementById("myChart"), config);
}

// Function to list all countries

function allCountriesList(allList) {
    for (let countriesData of allList) {
        var div = document.createElement("option");
        div.innerText = countriesData.Country;
        div.value = countriesData.Slug;
        div.classList.add("div-added");
        container.append(div);
    }
}

//Function to get data by single Country

function getAllCountriesData() {
    let singleData = allCountriesData;
    document.getElementById("sorting-options").value = "default";
    var x = document.getElementById("newCases").value;
    if (x == "all") {
        CountryData.innerHTML = "";
        singleData = allCountriesData;
    } else {
        const found = allCountriesData.find((element) => {
            return element.Slug == x;
        });
        singleData = [];
        singleData.push(found);
        CountryData.innerHTML = "";
    }
    countryLayout(singleData);
}
// Function to create layout for country data

function countryLayout(allList) {
    for (let allData of allList) {
        var divList = document.createElement("div");
        divList.classList.add("col-6", "country-list");

        var countryBlockInner = divList.appendChild(
            document.createElement("div")
        );
        countryBlockInner.classList.add("country-list-inner");

        var countryBlockInnerTop = countryBlockInner.appendChild(
            document.createElement("div")
        );
        countryBlockInnerTop.classList.add("country-list-inner-top");
        var countryBlockInnerBottom = countryBlockInner.appendChild(
            document.createElement("div")
        );
        countryBlockInnerBottom.classList.add("country-list-inner-bottom");

        var countryBlockInnerTopImg = countryBlockInnerTop.appendChild(
            document.createElement("img")
        );

        var countryBlockInnerTopSpan = countryBlockInnerTop.appendChild(
            document.createElement("span")
        );
        countryBlockInnerTopImg.classList.add("country-flag");

        countryBlockInnerTopImg.src =
            "https://flagcdn.com/w40/" +
            allData.CountryCode.toLowerCase() +
            ".png";
        countryBlockInnerTopSpan.innerText = allData.Country;
        countryBlockInnerBottom.innerHTML = "";
        for (const key in allData) {
            if (key == "TotalConfirmed") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");

                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-total-confirmed");
                countTitle.innerHTML = "Cases";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }
            if (key == "NewConfirmed") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-newconfirmed");
                countTitle.innerHTML = "New Cases";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }
            if (key == "NewDeaths") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-new-deaths");
                countTitle.innerHTML = "New Deaths";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }

            if (key == "TotalDeaths") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-new-deaths");
                countTitle.innerHTML = "Total Deaths";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }
            if (key == "NewRecovered") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-new-deaths");
                countTitle.innerHTML = "New Recovered";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }
            if (key == "TotalRecovered") {
                const element = allData[key];

                var countDataDiv = document.createElement("div");
                countDataDiv.classList.add("list-block");
                var countTitle = countDataDiv.appendChild(
                    document.createElement("span")
                );
                var countResult = countDataDiv.appendChild(
                    document.createElement("h4")
                );
                countDataDiv.setAttribute("id", "country-data-new-deaths");
                countTitle.innerHTML = "Total Recovered";
                countResult.innerHTML = element;
                countryBlockInnerBottom.appendChild(countDataDiv);
            }
        }
        CountryData.append(divList);
    }
}

// function for sorting

function sortingOptions() {
    document.getElementById("newCases").value = "all";
    CountryData.innerHTML = "";
    let sortingData = [...allCountriesData];
    var sortingOption = document.getElementById("sorting-options").value;
    if (sortingOption == "topCases") {
        sortingData.sort((a, b) => {
            return b.TotalConfirmed - a.TotalConfirmed;
        });
    }
    if (sortingOption == "topDeaths") {
        sortingData.sort((a, b) => {
            return b.TotalDeaths - a.TotalDeaths;
        });
    }
    if (sortingOption == "topRecovered") {
        sortingData.sort((a, b) => {
            return b.TotalRecovered - a.TotalRecovered;
        });
    }
    if (sortingOption == "topNewConfirmed") {
        sortingData.sort((a, b) => {
            return b.NewConfirmed - a.NewConfirmed;
        });
    }
    window.scrollTo(0, 100);
    countryLayout(sortingData);
}