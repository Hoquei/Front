export default function Modal(){


    const modalWrapper = document.querySelector('.modal-wrapper')
    const button = document.querySelector('.button')

modalWrapper.classList.add("active")
    button.addEventListener("click", close)

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