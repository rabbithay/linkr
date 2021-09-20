import ModalAlert from './ModalAlert';

export default function pageReloadErrorAlert() {
	const modalObj = 
	{
		icon: 'error',
		title: 'An error occurred on loading the page, please, try realoading it',
	};
	
	ModalAlert(modalObj);
}
