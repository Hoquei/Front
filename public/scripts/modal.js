export default function Modal(){
    
    const modalWrapper = document.querySelector('.modal-wrapper')
    const button = document.querySelector('.button')
    
    modalWrapper.classList.add("active")
    button.addEventListener("click", getNickname)

    function open(){
        modalWrapper.classList.add("active")
    }

    function getNickname() {
         
        var player1 = document.getElementById("Nname").value;

        if(!(player1 === "")){
            console.log(player1);
            var isFull = socket.emit('playerJoin', player1);
            console.log('oi' + isFull);
            close();
            
            if(isFull)
                disableModal()
        }
        else{
            document.getElementById("Nname").placeholder = "É necessário digitar um nome!";
        }
    }
    function nome () {
        return document.getElementById("Nname").value;
    }

    function close(){
        modalWrapper.classList.remove("active")
    }

    function disableModal(){
        console.log('entrou');
        document.getElementById("modal").disabled = true;
        var nodes = document.getElementById("modal").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }

     }

    return {
        close,
        nome,
        open
    }
}

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