/**
 * Function to load the modal.
 * @returns functions
 */
export default function Modal(){
    
    let modalWrapper = document.querySelector('.modal-wrapper')
    const button = document.querySelector('.button')
    
    modalWrapper.classList.add("active")
    button.addEventListener("click", getNickname)
    // open modal
    function open(){
        modalWrapper.classList.add("active")
    }
    // get players nickname
    function getNickname() {
         
        var player1 = document.getElementById("Nname").value;

        // if player is not empty, join player 1
        if(!(player1 === "")){
            console.log(player1);
            socket.emit('playerJoin', player1);
            close();
        }
        else{
            document.getElementById("Nname").placeholder = "É necessário digitar um nome!";
        }
    }
    // returns name from player
    function nome () {
        return {name: document.getElementById("Nname").value, socketId: socket.id};
    }

    // close modal
    function close(){
        modalWrapper.classList.remove("active")
    }

    return {
        close,
        nome,
        open
    }
}

/**
 * Function to load the load modal.
 * @returns functions
 */
export function ModalLoading(){
    
    const modalWrapper = document.querySelector('.modal-wrapper')
    
    modalWrapper.classList.add("active")

    // open modal
    function open(){
        modalWrapper.classList.add("active")
    }
    // close modal
    function close(){
        modalWrapper.classList.remove("active")
    }
    return {
        close,
        open
    }
}