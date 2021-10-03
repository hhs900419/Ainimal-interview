function generateByData(data) {
    //var container = document.getElementById("userdata_con");
    for(var i = 0;i < data.length; i++) {
        var id = "friend-" + i;
        var animal = data[i].animal;
        var container = document.getElementById(id);

        var textcontainer = document.createElement('div');
        var namediv = document.createElement('div');
        var contentdiv = document.createElement('div');
        var imgcontainer = document.createElement('div');
        var img = document.createElement('img');
        if(animal === 1) {
            img.src = "lion.jfif";
        }else if(animal === 2){
            img.src = "dog.png";
        }else if (animal === 3){   
            img.src = "penguin.png";
        }
        
        imgcontainer.className = "col-3";
        textcontainer.className = "col-9";
        namediv.className = "nickname";
        contentdiv.className = "content";
        namediv.innerHTML = data[i].nickname + ":";
        contentdiv.innerHTML = data[i].last_message;

        imgcontainer.appendChild(img);
        textcontainer.appendChild(namediv);
        textcontainer.appendChild(contentdiv);
        container.appendChild(imgcontainer);
        container.appendChild(textcontainer);
        
    }
};

const api_url = "https://recruit.ainimal.io/friend_list"

fetch(api_url).then(function (response) {
    return response.json();
}).then(function(data) {
    console.log(data) ;
    generateByData(data);
}).catch(function(error) {
    console.error('there is an error fetching the data');
    console.error(error);
});

