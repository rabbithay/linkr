import ModalAlert from './ModalAlert';

export default function pageReloadErrorAlert() {
	const modalObj = 
	{
		icon: 'error',
		title: 'Oops...',
		description: 'Erro ao carregar a página, por favor, tente recarregá-la'
	};
	
	ModalAlert(modalObj);
}
