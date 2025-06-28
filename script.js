const envelope = document.querySelector('.envelope');
const topFlap = document.querySelector('.top');
const letter = document.querySelector('.letter');
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let isOpen = false;
let isExpanded = false;

const images = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    'images/5.png',
    'images/6.png',
    'images/7.png',
    'images/8.png',
    'images/9.png',
    'images/10.png',
    'images/11.png',
    'images/12.png',
];
let currentImageIndex = 0;

function openEnvelope() {
    envelope.classList.add('open');
    letter.style.transitionDelay = '0.9s';
    topFlap.style.transitionDelay = '0.05s';
    topFlap.style.zIndex = '3';
    letter.style.zIndex = '2';

    setTimeout(() => {
        letter.style.zIndex = '3';
        topFlap.style.zIndex = '2';
    }, 1000);

    isOpen = true;
    isExpanded = false;
}

// function closeEnvelope() {
//     letter.style.transitionDelay = '0.05s';
//     topFlap.style.transitionDelay = '1s';
//     envelope.classList.remove('open');

//     // reset transform để thư về đúng vị trí ban đầu
//     letter.classList.remove('expanded');
//     letter.style.transform = 'translateY(0)';
//     letter.style.zIndex = '1';

//     setTimeout(() => {
//         topFlap.style.zIndex = '3';
//         letter.style.transitionDelay = '0.9s';
//         topFlap.style.transitionDelay = '0.05s';
//         isOpen = false;
//         isExpanded = false;
//     }, 1000);
// }

// Nhấp vào phong bì để mở/đóng
envelope.addEventListener('click', () => {
    if (!isOpen) {
        openEnvelope();
    } else if (isOpen && !isExpanded) {
        // closeEnvelope();
    }
});

// Nhấp vào thư → bung ra hết
letter.addEventListener('click', (e) => {
    e.stopPropagation(); // tránh lây sang envelope
    if (isOpen && !letter.classList.contains('expanded')) {
        envelope.classList.remove('open');
        letter.classList.add('expanded');
        letter.style.transform = 'translateY(0) scale(1.05)';
        letter.style.transition = 'transform 0.8s ease';
        letter.style.zIndex = '999';
        topFlap.style.zIndex = '1';
        isExpanded = true;
    }
});

// Nhấp bên ngoài → đóng lại nếu chưa expanded
document.addEventListener('click', (e) => {
    const clickedInside = envelope.contains(e.target);

    if (isOpen && !isExpanded && !clickedInside) {
        closeEnvelope();
    }
});

// Open modal on button click
openModalButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImage.src = images[currentImageIndex];
});

// Close modal when clicking outside of it
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Previous and Next buttons functionality
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing the modal
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentImageIndex];
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing the modal
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImage.src = images[currentImageIndex];
});