function showCity() {
    try{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, errShow);
        } else {
            console.log("Browser Anda tidak Mendukung Geolocation.");
        }

        async function showPosition(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const containerActive = document.querySelector('.container-card-active')
            const container2 = document.querySelector('.container-full2')
            const containers = document.querySelector('.container2')

            const getFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=983648dbfd74107ffc489832e8919603&units=metric`)
            const data = await getFetch.json()

            const city = data.name
            const temp = Math.floor(data.main.temp)
            const weather = data.weather[0].main
            let iconWeather;
            if(weather) {
                iconWeather = "thunder.png"
            }

            containerActive.innerHTML = `
                <div class="active">
                    <section class="description-card">
                        <h3>${city}</h3>
                        <h4>${temp}<Span> C</Span></h4>
                        <p>${weather}</p>
                    </section>
                    <section class="icon-card">
                        <img src="images/${iconWeather}" alt="">
                    </section>
                </div>
            `;

            const getFetchDesc = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=983648dbfd74107ffc489832e8919603&units=metric`).then(response => response.json())

            const datas40 = getFetchDesc.list.slice(0, 3)

            containerActive.addEventListener("click", function() {

                containers.innerHTML =`<div class="back"><</div>
                    <div class="hourlies">`
                console.log(this)
                container2.classList.remove("transform")

                const div2 = document.createElement('div')
                div2.className = "main"
                div2.innerHTML = `
                        <h1>${getFetchDesc.city.name}</h1>
                        <p class="date">${getFetchDesc.list[0].dt_txt.split(" ")[0]}</p>
                        <img src="images/thunder.png" alt="">
                        <h2>${getFetchDesc.list[0].main.temp}° C</h2>
                        <p>${getFetchDesc.list[0].weather[0].main}</p>
                    `
                    
                const hourlyContainer = document.querySelector('.hourlies');
                hourlyContainer.innerHTML = '';

                const back = document.querySelector('.back')
                back.addEventListener("click", () => {
                    container2.classList.add("transform")
                } )

                containers.insertBefore(div2, hourlyContainer)


                datas40.forEach(element => {
                    const div0 = document.createElement('div')
                    div0.className = "hourly-card"

                    div0.innerHTML = `
                        <p>${element.dt_txt.split(" ")[1].substring(0, 5)}</p>
                        <img src="images/thunder.png" alt="">
                        <h5 class="temp">${element.main.temp}° C</h5>
                    `
                    hourlyContainer.appendChild(div0)
                });
            })
        }

        function errShow(err) {
            console.error("gagal mendapatkan lokasi:", err.message);
        }
    }catch(err) {
        console.error(err)
    }
}

async function showNearest() {
    try{
        const cardsContainer = document.querySelector('.container-cards')

        // const dataCity1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=jakarta&appid=983648dbfd74107ffc489832e8919603&units=metric`).then(response => response.json())
        // const dataCity2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Palangka Raya&appid=983648dbfd74107ffc489832e8919603&units=metric`).then(response => response.json())

        // const city1 = dataCity1.city.name
        // const temp1 = Math.floor(dataCity1.list[0].main.temp)
        // const weather1 = dataCity1.list[0].weather[0].main

        // const city2 = dataCity2.city.name
        // const temp2 = Math.floor(dataCity2.list[0].main.temp)
        // const weather2 = dataCity2.list[0].weather[0].main

        // console.log(city1, temp1, weather1)
        // console.log(city2, temp2, weather2)
        // cardsContainer.innerHTML = `
        //     <div>
        //         <section class="description-card">
        //             <h3>${city1}</h3>
        //             <h4>${temp1} <Span>C</Span></h4>
        //             <p>${weather1}</p>
        //         </section>
        //         <section class="icon-card">
        //             <img src="images/thunder.png" alt="">
        //         </section>
        //     </div>
        //     <div>
        //         <section class="description-card">
        //             <h3>${city2}</h3>
        //             <h4>${temp2} <Span>C</Span></h4>
        //             <p>${weather2}</p>
        //         </section>
        //         <section class="icon-card">
        //             <img src="images/thunder.png" alt="">
        //         </section>
        //     </div>
        // `;

        const input = document.getElementById("input")
        input.addEventListener("change", async (e) => {

            if (!(e.target.value == "")) {
                const datas = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=983648dbfd74107ffc489832e8919603&units=metric`).then(response => response.json())

                cardsContainer.innerHTML = `
                    <div>
                        <section class="description-card">
                            <h3>${datas.city.name}</h3>
                            <h4>${Math.floor(datas.list[0].main.temp)} <Span>C</Span></h4>
                            <p>${datas.list[0].weather[0].main}</p>
                        </section>
                        <section class="icon-card">
                            <img src="images/thunder.png" alt="">
                        </section>
                    </div>
                `;

                const container = document.querySelector('.container-cards')
                const container2 = document.querySelector('.container-full2')
                const containers = document.querySelector('.container2')

                const getFetchDesc = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=983648dbfd74107ffc489832e8919603&units=metric`).then(response => response.json())

                const datas40 = getFetchDesc.list.slice(0, 3)

                container.addEventListener("click", function() {

                    containers.innerHTML =`<div class="back"><</div>
                    <div class="hourlies">`

                    console.log(this)
                    container2.classList.remove("transform")

                    const div2 = document.createElement('div')
                    div2.className = "main"
                    div2.innerHTML = `
                            <h1>${getFetchDesc.city.name}</h1>
                            <p class="date">${getFetchDesc.list[0].dt_txt.split(" ")[0]}</p>
                            <img src="images/thunder.png" alt="">
                            <h2>${getFetchDesc.list[0].main.temp}° C</h2>
                            <p>${getFetchDesc.list[0].weather[0].main}</p>
                        `
                        
                    const hourlyContainer = document.querySelector('.hourlies');
                    hourlyContainer.innerHTML = '';

                    const back = document.querySelector('.back')
                    back.addEventListener("click", () => {
                        container2.classList.add("transform")
                    } )

                    containers.insertBefore(div2, hourlyContainer)


                    datas40.forEach(element => {
                        const div0 = document.createElement('div')
                        div0.className = "hourly-card"

                        div0.innerHTML = `
                            <p>${element.dt_txt.split(" ")[1].substring(0, 5)}</p>
                            <img src="images/thunder.png" alt="">
                            <h5 class="temp">${element.main.temp}° C</h5>
                        `
                        hourlyContainer.appendChild(div0)
                    });
                })
            }
        
            e.target.value = ""
        })
    }catch(err) {
        console.error(err)
    }
}

showNearest()
showCity()
