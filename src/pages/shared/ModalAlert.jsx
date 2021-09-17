import Swal from 'sweetalert2';

function ModalAlert(title, icon, description) {
	const obj = 
	{
		title,
		backdrop: '#FFFFFFE5',
		width: 600,
		heigth: 260,
	};

	icon !== undefined ? obj.icon = icon : '';
	description !== undefined ? obj.description = description : '';
	
	Swal.fire(obj);
}

export default ModalAlert;