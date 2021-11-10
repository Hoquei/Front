export default function Modal(){
    
    let modalWrapper = document.querySelector('.modal-wrapper')
    const button = document.querySelector('.button')
    const screen = document.querySelector('.screen')

    let body = document.querySelector('.body')
    
    modalWrapper.classList.add("active")
    button.addEventListener("click", getNickname)
    screen.addEventListener("click", multiScreen)

    function open(){
        modalWrapper.classList.add("active")
    }

    function getNickname() {
         
        var player1 = document.getElementById("Nname").value;

        if(!(player1 === "")){
            console.log(player1);
            socket.emit('playerJoin', player1);
            close();
        }
        else{
            document.getElementById("Nname").placeholder = "É necessário digitar um nome!";
        }
    }
    function nome () {
        return {name: document.getElementById("Nname").value, socketId: socket.id};
    }

    function close(){
        modalWrapper.classList.remove("active")
    }

    function multiScreen() {
        modalWrapper.classList.remove("active")
        addScreen()
    }
 
    function addScreen() {
        window.open("localhost:8080/screen/2")
        body.classList.add("2")
    }

    return {
        close,
        nome,
        open
    }
}

// Function to load the modal.
export function ModalLoading(){
    
    const modalWrapper = document.querySelector('.modal-wrapper')
    
    modalWrapper.classList.add("active")

    function open(){
        modalWrapper.classList.add("active")
    }
    function close(){
        modalWrapper.classList.remove("active")
    }
    return {
        close,
        open
    }
}