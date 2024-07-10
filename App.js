let input=document.getElementById('input')
const search_btn=document.getElementById('search_btn')
let theme_change=document.getElementById('theme_change')



let flag=true
theme_change.addEventListener('click',()=>{
    if(flag){
   
        document.documentElement.style.setProperty('--backgroundColor','white')
        document.documentElement.style.setProperty('--whiteColor','black')
      flag= false
    }
    else{
        document.documentElement.style.setProperty('--backgroundColor','backgroundColor')
        document.documentElement.style.setProperty('--whiteColor','whiteColor')
       flag=True
    }

})

const image = document.getElementById('image');
const uname = document.getElementById('uname');
const userlink = document.getElementById('userlink');
const bio = document.getElementById('bio');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const searchbtn = document.getElementById('searchbtn');
const user_input = document.getElementById('user_input');
const repositoriesDiv = document.getElementById('repositories'); 

searchbtn.addEventListener('click', async () => {
    let value = user_input.value;
    if (value === '' || value === null || value === undefined) {
        alert('Please enter a GitHub username');
        return;
    }
    
    const GitHub_Users_Api = await fetch(`https://api.github.com/users/${value}`);
    user_input.innerHTML=''
    if (GitHub_Users_Api.status === 404) {
        uname.innerHTML = 'User not found';
        image.src = 'https://seekicon.com/free-icon-download/github-circle_1.svg';
        bio.innerHTML = 'No bio';
        repos.innerHTML = 'No';
        followers.innerHTML = 'No';
        following.innerHTML = 'No';
        userlink.href = '';
        userlink= alert('user not found');
        repositoriesDiv.innerHTML = ''; // Clear previous results
        return;
    }

    const data = await GitHub_Users_Api.json();

    const username = data['name'] || 'No name provided';
    const user_image = data['avatar_url'] || '';
    const user_bio = data['bio'] || 'No bio available';
    const user_github = data['html_url'];
    const acc_repos = data['public_repos'];
    const acc_followers = data['followers'];
    const acc_following = data['following'];

    image.src = user_image;
    uname.innerHTML = username;
    userlink.href = user_github;
    userlink.innerHTML = username;
    bio.innerHTML = user_bio;
    repos.innerHTML = acc_repos;
    followers.innerHTML = acc_followers;
    following.innerHTML = acc_following;

    console.log(data);

    repositories(`https://api.github.com/users/${value}/repos`);
});

async function repositories(url) {
    const response = await fetch(url);
    const data = await response.json();
    repositoriesDiv.innerHTML = ''; // Clear previous results



    for (let i = 0; i < data.length; i++) {
        let repositories_name = data[i].name;
        let repositories_description = data[i].description || 'No description available';
        let repo_public_or_priv = data[i].private ? 'private' : 'public';
        let language = data[i].language || 'N/A';
        let star = data[i].stargazers_count;
        let fork = data[i].forks;

        repositoriesDiv.innerHTML += `
            <div class="card-1">
                <div class="part-1">
                    <span id="id-1">
                        <h2>${repositories_name}</h2>
                        <p>${repositories_description}</p>
                    </span>
                    <span id="public">
                        <p>${repo_public_or_priv}</p>
                    </span>
                </div>
                <div class="icons">
                    <span class="material-symbols-outlined">code</span>
                    <span><p>${language}</p></span>
                    <span class="material-symbols-outlined">star</span>
                    <p>${star}</p>
                    <span class="material-symbols-outlined">share</span>
                    <p>${fork}</p>
                </div>
            </div>
        `;
    }

    console.log(data);
}






