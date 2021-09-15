import Swal from 'sweetalert2';
export default function ErrorAlert(){
	return(
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong! Please, reload the page.',
		})
	);
}
