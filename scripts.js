// const accessToken = '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';
const accessToken = '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';

const apiUrl = 'https://api.github.com';

const mains = document.querySelector('.main');
// const mainBox = document.querySelector('.main_containt');
var mainContaint = document.querySelector('.main_containt');
var mainInfos = document.querySelector('.main');
const searchBtn = document.querySelector('.header button');
const searchInput = document.querySelector('.header input');
const nextBtn = document.querySelector('.btn-next');
const nextPrivious = document.querySelector('.btn-privious');
const nextNumber = document.querySelectorAll('.page')


searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        searchRepositories(searchTerm);
        var mainInfo = document.querySelector('.main_info');
        while (mainInfo.firstChild) {
            mainInfo.removeChild(mainInfo.firstChild);
        }
        mainInfo.innerHTML = " ";
        ProfileData(searchTerm);
        searchInput.value = '';

    }
});

const showLoader = () => {
    // Implement logic to display loader in your UI (e.g., show a spinner)
    // For simplicity, let's assume you have a div with id "loader" in your HTML
    const loaderElement = document.getElementById("loader");
    if (loaderElement) {
        loaderElement.style.display = "block";
    }
};

const hideLoader = () => {
    // Implement logic to hide loader in your UI
    // For simplicity, let's assume you have a div with id "loader" in your HTML
    const loaderElement = document.getElementById("loader");
    if (loaderElement) {
        loaderElement.style.display = "none";
    }
};

// const searchRepositories = async (query) => {
//     try {
//         showLoader();

//         await new Promise(resolve => setTimeout(resolve, 3000));

//         const response = await fetch(`${apiUrl}/search/repositories?q=${query}`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();

//         // Check if data.items is defined
//         if (data.items) {
//             console.log("searchRepositories data:", data);

//             // Clear existing content
//             mainContaint.innerHTML = '';

//             data.items.slice(0, 9).forEach((repo) => {
//                 let mainBoxDiv = document.createElement('div');
//                 mainBoxDiv.className = 'main_box';

//                 mainBoxDiv.innerHTML = `
//                     <div class="main_repo">
//                         <h2>${repo.name}</h2>
//                         <p>${repo.description}</p>
//                         <p>Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}</p>
//                         <div class="main_button">
//                                 <button>${repo.language}</button>
//                                 <button>${repo.language}</button>
//                                 <button>${repo.language}</button>
//                                 <button>${repo.language}</button>
//                         </div>
//                     </div>
//                 `;

//                 mainContaint.appendChild(mainBoxDiv);
//             });
//         } else {
//             console.error("No items found in the response.");
//         }
//     } catch (error) {
//         console.error("Error in API request:", error.message);
//     } finally {
//         hideLoader(); // Hide loader regardless of success or failure
//     }
// };


const searchRepositories = async (query) => {
    try {
        showLoader();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`${apiUrl}/search/repositories?q=${query}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data.items is defined
        if (data.items) {
            console.log("searchRepositories data:", data);

            // Clear existing content
            mainContaint.innerHTML = '';
            let start = 0;
            let stop = 8;

            const displayProfiles = (startIndex, stopIndex) => {
                mainContaint.innerHTML = ''; // Clear existing content

                for (let i = startIndex; i <= stopIndex; i++) {
                    let mainBoxDiv = document.createElement('div');
                    mainBoxDiv.className = 'main_box';

                    mainBoxDiv.innerHTML = `
                    <div class="main_repo">
                        <h2>${data.items[i].name}</h2>
                        <p>${data.items[i].description}</p>
                        <p>Stars: ${data.items[i].stargazers_count}, Forks: ${data.items[i].forks_count}</p>
                        <div class="main_button">
                                <button>${data.items[i].language}</button>
                                <button>${data.items[i].language}</button>
                                <button>${data.items[i].language}</button>
                                <button>${data.items[i].language}</button>
                        </div>
                    </div>
                `;

                    mainContaint.appendChild(mainBoxDiv);

                }
            };

            // Initial display
            displayProfiles(start, stop);

            const btnNext = document.querySelector('.btn-next');
            const btnPrevious = document.querySelector('.btn-privious');
            const pageButtons = document.querySelectorAll('.page');

            btnNext.addEventListener('click', () => {
                if (stop < data.length) {
                    start += 8;
                    stop += 8;
                    displayProfiles(start, stop);
                }
            });

            btnPrevious.addEventListener('click', () => {
                if (start > 0) {
                    start -= 8;
                    stop -= 8;
                    displayProfiles(start, stop);
                }
            });

            pageButtons.forEach((pageBtn, index) => {
                pageBtn.addEventListener('click', () => {
                    start = index * 8;
                    stop = start + 8;
                    displayProfiles(start, stop);
                });
            });

            // data.items.slice(0, 9).forEach((repo) => {
            //     let mainBoxDiv = document.createElement('div');
            //     mainBoxDiv.className = 'main_box';

            //     mainBoxDiv.innerHTML = `
            //         <div class="main_repo">
            //             <h2>${repo.name}</h2>
            //             <p>${repo.description}</p>
            //             <p>Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}</p>
            //             <div class="main_button">
            //                     <button>${repo.language}</button>
            //                     <button>${repo.language}</button>
            //                     <button>${repo.language}</button>
            //                     <button>${repo.language}</button>
            //             </div>
            //         </div>
            //     `;

            //     mainContaint.appendChild(mainBoxDiv);
            // });
        } else {
            console.error("No items found in the response.");
        }
    } catch (error) {
        console.error("Error in API request:", error.message);
    } finally {
        hideLoader(); // Hide loader regardless of success or failure
    }
};

const ShowAllprofiles = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`${apiUrl}/users`);
        const data = await response.json();

        let start = 0;
        let stop = 8;

        const displayProfiles = (startIndex, stopIndex) => {
            mainContaint.innerHTML = ''; // Clear existing content

            for (let i = startIndex; i <= stopIndex; i++) {
                let mainBoxDiv = document.createElement('div');
                mainBoxDiv.className = 'main_box';

                mainBoxDiv.innerHTML = `
                    <div class="main_boxs ">
                        <img src="${data[i].avatar_url}" alt="">
                        <div class="main_dis">
                            <h2>${data[i].login}</h2> 
                            <a href=${data[i].repos_url}>Repositories</a>
                        </div>
                    </div>
                `;

                // Append main_box div to main_containt
                mainContaint.appendChild(mainBoxDiv);
                mainBoxDiv.addEventListener("click", (function (index) {
                    return function () {




                        ProfileData(data[index].login);
                        searchRepositories(data[index].login);

                        var mainInfo = document.querySelector('.main_info');
                        while (mainInfo.firstChild) {
                            mainInfo.removeChild(mainInfo.firstChild);
                        }

                    };
                })(i));

            }
        };

        // Initial display
        displayProfiles(start, stop);

        const btnNext = document.querySelector('.btn-next');
        const btnPrevious = document.querySelector('.btn-privious');
        const pageButtons = document.querySelectorAll('.page');

        btnNext.addEventListener('click', () => {
            if (stop < data.length) {
                start += 8;
                stop += 8;
                displayProfiles(start, stop);
            }
        });

        btnPrevious.addEventListener('click', () => {
            if (start > 0) {
                start -= 8;
                stop -= 8;
                displayProfiles(start, stop);
            }
        });

        pageButtons.forEach((pageBtn, index) => {
            pageBtn.addEventListener('click', () => {
                start = index * 8;
                stop = start + 8;
                displayProfiles(start, stop);
            });
        });


    } catch (error) {
        console.error("Error in API request:", error.message);
    } finally {
        hideLoader(); // Hide loader regardless of success or failure
    }


};

var mainInfo = document.querySelector('.main_info');

while (mainInfo.firstChild) {
    mainInfo.removeChild(mainInfo.firstChild);
}


const ProfileData = async (user) => {
   
    // console.log(data);
    // mainContaint.addEventListener("click", () => {

    // Check if main_info has child nodes
    const response = await fetch(`${apiUrl}/users/${user}`);
    const data = await response.json();
    const profile = document.createElement('div');
    profile.className = 'main_info';
    profile.innerHTML = `  <div class="main_img">
                                <img src="${data.avatar_url}" />
                                    </div>
                                    <div class="main_details">
                                       <a href=${data.html_url} target="_blank"> <h1>Name: ${data.name}</h1></a>
                                        <h2>Username: ${data.login}</h2>
                                        <h3>Discriptios: ${data.bio}</h3>
                                        <h3>Followers: ${data.followers}</h3>
                                        <h3>Followers: ${data.following}</h3>
                                </div>`;
    mains.prepend(profile);

    var mainInfo = document.querySelector('.main_info');

    // })
}
ShowAllprofiles();
