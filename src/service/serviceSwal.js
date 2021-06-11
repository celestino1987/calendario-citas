import Swal from 'sweetalert2';

export const serviceSwal = (icon, title, text, showConfirmButton,  showCancelButton, timer) => {
    return Swal.fire({
        icon,
        title,
        text,
        showConfirmButton,
        timer,
        showCancelButton
    })
}
