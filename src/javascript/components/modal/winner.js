import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    return showModal({ title: 'winner', bodyElement: fighter });
}
