// Get
fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food')
    .then(response => response.json())
    .then(data => processData(data));

const processData = data => { //Render hrane na stranici

    const section = document.getElementById('sec');
    const mainDiv = document.getElementById('parent');
    const row = document.getElementById('row');

    const dropdown = document.getElementById('dropdown');

    data.forEach(element => {

        const div = document.createElement('div');
        div.classList.add('feature-box', 'col-lg-6');

        const img = document.createElement('img');
        img.classList.add('feature-images');
        img.src = element.imageUrl;

        const h3 = document.createElement('h3');
        h3.classList.add('feature-title');
        h3.innerHTML = element.name;

        const p = document.createElement('p');
        p.innerHTML = element.price + " KM";

        const button = document.createElement('button');
        button.setAttribute("type", "button");
        button.classList.add('btn', 'btn-danger', 'btn-lg');
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#exampleModal");
        button.setAttribute("data-id", element.id);
        button.setAttribute("data-name", element.name);
        button.setAttribute("data-image", element.imageUrl);
        button.setAttribute("data-price", element.price);
        button.innerHTML = "Edit";

        const option = document.createElement('option');
        option.innerHTML = element.id + ". " + element.name;
        option.setAttribute("value", element.id);
        option.classList.add('dropdown-item');

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);
        row.appendChild(div);
        mainDiv.appendChild(row);
        section.appendChild(mainDiv);
        dropdown.appendChild(option);
    });
}

//Funkcija koja ispisuje trenutke podatke o foodu u modal
$('#exampleModal').on('show.bs.modal', function (event) { 

  var button = $(event.relatedTarget); // Button koji je trigerovo modal

  var putId = button.data('id'); //Uzimanje trenutnih podatka o tom foodu
  var putName = button.data('name');
  var putImg = button.data('image');
  var putPrice = button.data('price');

  var modal = $(this);
  modal.find('.modal-title').text('edit food'); //Ispisivanje trenutnih podataka o foodu u modal
  modal.find('.modal-body #foodID').val(putId);
  modal.find('.modal-body #recipient-name').val(putName);
  modal.find('.modal-body #foodImg').val(putImg);
  modal.find('.modal-body #price-text').val(putPrice);
})


//Post
let forma = document.getElementById('forma');
forma.addEventListener('submit', function(e){
    console.log('POST')
    e.preventDefault();

    let name = document.getElementById('name');
    let price = document.getElementById('price');
    let imageUrl = document.getElementById('imageUrl');
    
    fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food', {
        method: 'POST',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            "name": name.value,
            "price": price.value,
            "imageUrl": imageUrl.value,
        })
    })
        .then(data => console.log(data))
})


//Funkcija koja uzima id hrane iz dropdown menija
function getOption() {
    selectElement = document.querySelector('#dropdown');
    id = selectElement.value;
    document.querySelector('.output').textContent = "Option " + id + " has been successfully deleted!";
    deleteFood(id);
}

//Delete
const deleteFood = (id) => {
    console.log('DELETE');
    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        console.log(res);
    })
}

//Put
const updateFood = () =>{

    const foodId = document.getElementById('foodID').value;
    const foodName = document.getElementById('recipient-name').value;
    const foodImg = document.getElementById('foodImg').value;
    const foodPrice = document.getElementById('price-text').value;

    console.log('PUT');

    fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Food',{
        method:"PUT",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify({
            "id": foodId,
            "name": foodName,
            "imageUrl": foodImg,
            "price": foodPrice
        })
    })
    .then(res => {
        console.log(res);
    })
}