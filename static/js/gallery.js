// Open the Modal
function openModal() {
    document.getElementById("lightbox").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("lightbox").style.display = "none";
}

var urlParams = new URLSearchParams(window.location.search);
var page_num = urlParams.get('page')
if (page_num === null) {
    page_num = 0;
}
page_num= parseInt(page_num);

fetch("./static/gallery_list.txt")
.then((res) => res.text())
.then((text) => {
    // do something with "text"
    var separateLines = text.split("\n");
    var total_items = separateLines.length;
    
    const item_per_page = 9;
    const total_pages = Math.ceil(total_items / item_per_page);
    
    var start = page_num * item_per_page;
    var end = start + item_per_page;

    if (end > total_items) {
        end = total_items;
    }

    var gallery = document.getElementById("gallery-3d");
    console.log(gallery);
    for (var i = start; i < end; i++) {
        var line = separateLines[i];

        var img = document.createElement("img");
        // TODO: Change to the actual image. Potentially just put the input img in the models folder
        // Replace this then with input.jpg/png
        img.src = "./static/models/" + line + "/preview.jpg";
        img.alt = line;
        // Add a onclick event to open the modal
        img.addEventListener('click', function(e) {
            openModal();
            var item = e.target;
            // Replace modal-content with iframe
            var modal_content = document.querySelector(".modal-content");
            modal_content.innerHTML = '';
            var iframe = document.createElement("iframe");
            iframe.src = "render.html?scene=" + item.alt;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            modal_content.innerHTML = "";
            modal_content.appendChild(iframe);
        });
        var fig = document.createElement("figure");
        
        fig.setAttribute("id", "fig" + (i - start).toString());
        fig.appendChild(img);
        gallery.appendChild(fig);
    }

    var page = document.getElementById("page");
    for (var i = 0; i < total_pages; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "index.html?page=" + i;
        a.innerText = i;
        // Set a to active class if i == page_num
        if (i === page_num){
            a.classList.add("active");
        }
        li.appendChild(a);
        page.appendChild(li);
    }
})
.catch((e) => console.error(e));