document.addEventListener("DOMContentLoaded", function () {
    loadDocuments();
  });
  
  function loadDocuments() {
    const documentList = document.getElementById("document-list");
    documentList.innerHTML = `<p class="loading-text">Fetching documents...</p>`;
  
    // GitHub API request
    fetch("https://api.github.com/repos/PrasannTheDeveloper/publicRepo/contents/")
        .then(response => response.json())
        .then(files => {
            documentList.innerHTML = ""; // Clear loading text
  
            files.forEach(file => {
                const fileElement = document.createElement("div");
                fileElement.classList.add("document-item");
  
                if (file.type === "file") {
                    fileElement.innerHTML = `
                        📄 <a href="#" onclick="openDocument('${file.path}')">${file.name}</a>
                    `;
                } else if (file.type === "dir") {
                    fileElement.innerHTML = `
                        📁 <a href="#" onclick="loadSubfolder('${file.path}')">${file.name}</a>
                    `;
                }
  
                documentList.appendChild(fileElement);
            });
        })
        .catch(error => {
            documentList.innerHTML = `<p>Error loading documents. Please try again.</p>`;
        });
  }
  
  // Load subfolder contents
  function loadSubfolder(folderPath) {
    const documentList = document.getElementById("document-list");
    documentList.innerHTML = `<p class="loading-text">Fetching ${folderPath}...</p>`;
  
    fetch(`https://api.github.com/repos/PrasannTheDeveloper/publicRepo/contents/${folderPath}`)
        .then(response => response.json())
        .then(files => {
            documentList.innerHTML = `<button onclick="loadDocuments()" class="close-btn">⬅ Back</button>`;
  
            files.forEach(file => {
                const fileElement = document.createElement("div");
                fileElement.classList.add("document-item");
  
                if (file.type === "file") {
                    fileElement.innerHTML = `
                        📄 <a href="#" onclick="openDocument('${file.path}')">${file.name}</a>
                    `;
                } else if (file.type === "dir") {
                    fileElement.innerHTML = `
                        📁 <a href="#" onclick="loadSubfolder('${file.path}')">${file.name}</a>
                    `;
                }
  
                documentList.appendChild(fileElement);
            });
        })
        .catch(error => {
            documentList.innerHTML = `<p>Error loading ${folderPath}. Please try again.</p>`;
        });
  }
  
  // Open document in viewer
  function openDocument(filePath) {
    const fileExtension = filePath.split('.').pop().toLowerCase();
    const viewer = document.getElementById("document-viewer");
    const frame = document.getElementById("viewer-frame");
  
    const fileUrl = `https://raw.githubusercontent.com/PrasannTheDeveloper/publicRepo/main/${filePath}`;
  
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "pdf"].includes(fileExtension)) {
        // Open image and PDF in a new tab
        window.open(fileUrl, "_blank");
    } else {
        // Open document in iframe
        viewer.style.display = "block";
        frame.src = fileUrl;
    }
  }
  
  // Close viewer
  function closeViewer() {
    document.getElementById("document-viewer").style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const hackerBg = document.getElementById("hacker-bg");

    function createByte() {
        const byte = document.createElement("div");
        byte.classList.add("byte");
        byte.textContent = Math.random() > 0.5 ? "0" : "1"; // You can also use random hex characters
        
        // Set random position
        byte.style.left = Math.random() * 100 + "vw";
        byte.style.top = Math.random() * 100 + "vh";
        
        // Set random animation duration
        byte.style.animationDuration = Math.random() * 2 + 2 + "s";
        
        hackerBg.appendChild(byte);
        
        // Remove byte after animation
        setTimeout(() => byte.remove(), 3000);
    }

    // Generate bytes continuously
    setInterval(createByte, 200);
});

