// You are going to build a JavaScript application which searches GitHub for users
// by name and displays the results on the screen. Clicking on a specific user will
// show all the repositories for that user.

// 1. The `index.html` file has a form with a search input. When the form is
//    submitted, it should take the value of the input and search GitHub for user
//    matches using the [User Search Endpoint](#user-search-endpoint) = https://developer.github.com/v3/search/#search-users
// 2. Using the results of the search, display information about the users to the
//    page. (You might include showing their username, avatar and a link to their
//    profile.)
// 3. Clicking on one of these users should send a request to the
//    [User Repos Endpoint](#user-repos-endpoint) and return data about all the
//    repositories for that user. = https://developer.github.com/v3/repos/#list-user-repositories
// 4. Using the response from the Users Repos Endpoint, display all the
//    repositories for that user on the page.

//MY Guidelines
// 1. grab the form and set it to a variable
// 2. attach and event listener to it for "submit" & prevent default behavior
// 3. get the search value and set it equal to a variable = document.getelementbyid().value
// 4. console log the search value to make sure you're grabbing the right thing
// 5. write a fetch to the search users api url & add the dynamic value last +search or try ${search}
// 6. write code to remove space between first & last name. set a fullName variable = search.split(' ').join('')
// 7. replace dynamic search value in fetch url with the fullName value 
// 8. change the console log to the fullName value to see if it removes space
// 9. finish fetch - .then (convert to json)
// 10. 2nd .then((data) => console.log(data))
// 11. search user name to see if it console.logs that data
// 12. create userList html element variabe and set its inner html equal to whatever you want to. use key options from fetch data & drill down using data.items[0].whatever you want 
// 13. GO TO 12:40 on video to see added functionality of clearing out results with each search
// 14. Think about the steps above and create a new fetch to display repos when a user is clicked


document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form')
    let userContainer = document.getElementById('user-list')
    let repoContainer = document.getElementById('repos-list')
     //let searchValue = document.getElementById('search').value
    //let fullName = searchValue.split(' ').join('')
    let fullName;
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
       let searchValue = document.getElementById('search').value
       fullName = searchValue.split(' ').join('')
        //let userContainer = document.getElementById('user-list')

        fetch(`https://api.github.com/search/users?q=${fullName}`, {
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            let userName = data.items[0].login
            let profileLink = data.items[0].url
            let avatarPic = data.items[0].avatar_url

            userContainer.innerHTML = `
             <li>${userName}</li>
             <li>${profileLink}</li>
             <li>${avatarPic}</li>
            `
        })
    }) // end of event listener on the submit button

    // listen for a click on the User
    // when a click happens, fetch data from https://api.github.com/user/repos
    // set repoContainer.innerHTML = data from fetch 
    userContainer.addEventListener('click', () => {
        fetch(`https://api.github.com/users/${fullName}/repos`, {
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            data.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item.name;
                repoContainer.appendChild(li);
            })
        })
        
    

    })
}) // end of dom content loaded