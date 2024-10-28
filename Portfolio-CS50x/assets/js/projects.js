const projectsContainer = document.querySelector("#projects-container");

async function fetchData() {
  try {
    const response = await fetch(
      "https://api.github.com/users/gabrielsantos7/repos"
    );
    if (!response.ok) {
      projectsContainer.innerHTML =
        '<p class="text-center">Network response was not ok. Try again later.</p>';
    }
    const data = await response.json();
    const sortedData = data.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const topProjects = sortedData.slice(0, 8);

    return topProjects;
  } catch (error) {
    projectsContainer.innerHTML =
      '<p class="text-center">An error ocurred. Try again later.</p>';
    return [];
  }
}

function displayProjects(repos) {
  if (repos.length === 0) {
    projectsContainer.innerHTML =
      '<p class="text-center">No repository found.</p>';
    return;
  }

  const cards = repos
    .map(
      (repo) => `
        <div class="col">
            <div class="card border-light">
                <div class="card-header">
                    <h3 class="card-title">${repo.name}</h3>
                </div>
                <div class="card-body">
                    <p class="card-text">${
                      repo.description
                        ? repo.description
                        : "Repository has not description."
                    }</p>
                    <p><i class="bi bi-code-slash"></i> ${repo.language}</p>
                    <a href="${
                      repo.html_url
                    }" class="btn btn-light" target="_blank"><i class="bi bi-github"></i> View on Github</a>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  projectsContainer.innerHTML = cards;
}

document.addEventListener("DOMContentLoaded", async function () {
  const repos = await fetchData();
  displayProjects(repos);
});
