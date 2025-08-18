// ルームデータ
const roomData = {
    chihuahua: {
        name: "ちわわ",
        status: "available",
        price: "40,000",
        managementFee: "20,000",
        size: "4.5帖",
        features: [
            "エアコン付き",
            "ベッド付き"
        ],
        images: [
            "resource/チワワ/チワワ1.jpg",
            "resource/チワワ/チワワ2.jpg"
        ],
    },
    poodle: {
        name: "ぷーどる",
        status: "available",
        price: "50,000",
        managementFee: "20,000",
        size: "10帖",
        features: [
            "エアコン付き",
            "ベッド付き"
        ],
        images: [
            "resource/プードル/プードル1.jpg",
            "resource/プードル/プードル2.jpg"
        ],
    },
    dachshund: {
        name: "だっくす",
        status: "occupied",
        price: "50,000",
        managementFee: "20,000",
        size: "7帖",
        features: [
            "エアコン付き",
            "ベッド付き"
        ],
        images: [
            "resource/ダックス/ダックス1.jpg",
            "resource/ダックス/ダックス2.jpg"
        ],
    },
    malpoo: {
        name: "まるぷー",
        status: "available",
        price: "50,000",
        managementFee: "20,000",
        size: "8.5帖",
        features: [
            "エアコン付き",
            "ベッド付き"
        ],
        images: [
            "resource/マルプー/マルプー1.jpg",
            "resource/マルプー/マルプー2.jpg"
        ],
    }
};

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロールの初期化
    initSmoothScroll();
    
    // モバイルメニューの初期化
    initMobileMenu();
    
    // ルームタブの初期化
    initRoomTabs();
    
    // EmailJSの初期化
    initEmailJS();
    
    // お問い合わせフォームの初期化
    initContactForm();

    // 画像モーダルの初期化
    initImageModal();
    
    // 初回のルーム情報表示
    displayRoomInfo('chihuahua');
    
});

// スムーススクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// モバイルメニュー
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// ルームタブ
function initRoomTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブタブの切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // ルーム情報の表示
            const roomId = this.getAttribute('data-room');
            displayRoomInfo(roomId);
        });
    });
}

// ルーム情報表示
function displayRoomInfo(roomId) {
    const room = roomData[roomId];
    const roomContent = document.getElementById('room-content');
    
    if (!room || !roomContent) return;
    
    const statusClass = room.status === 'available' ? 'available' : 'occupied';
    const statusText = room.status === 'available' ? '空室' : '満室';
    
    const featuresHTML = room.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    const imagesHTML = room.images.map((image, index) => 
        `<img src="${image}" alt="${room.name}の部屋${index + 1}" class="room-image" onerror="this.style.display='none'">`
    ).join('');
    
    roomContent.innerHTML = `
        <div class="room-info">
            <div class="room-details">
                <h3>${room.name}ルーム</h3>
                <span class="room-status ${statusClass}">${statusText}</span>
                <div class="room-price">
                    家賃 ￥${room.price}<span>/月</span><br>
                    管理費 ￥${room.managementFee}<span>/月（光熱費・水道代、ペット備品込み）</span>
                </div>
                <p class="room-size">広さ: ${room.size}</p>
                <ul class="room-features">
                    ${featuresHTML}
                </ul>
                ${room.status === 'available' ? 
                    '<a href="#contact" class="cta-button">このお部屋について問い合わせる</a>' : 
                    '<p style="color: #999; margin-top: 1rem;">※現在満室です。空室通知をご希望の方はお問い合わせください</p>'
                }
            </div>
            <div class="room-images">
                ${imagesHTML}
            </div>
        </div>
    `;
    
    // 画像読み込み完了後の処理
    setTimeout(() => {
        const newImages = roomContent.querySelectorAll('.room-image');
        newImages.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                img.src = img.src; // 画像を再読み込み
            }
        });
    }, 100);
    
    // 部屋が選択されたら問い合わせフォームに反映
    if (room.status === 'available') {
        const roomSelect = document.getElementById('room-interest');
        if (roomSelect) {
            roomSelect.value = room.name;
        }
    }
}

// EmailJSの初期化
function initEmailJS() {
    // EmailJSの初期化
    emailjs.init("sPX8WXXM1Aau5_KK5");
}

// お問い合わせフォームの初期化
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || '未記入',
            room_interest: document.getElementById('room-interest').value || '未選択',
            occupancy: document.getElementById('occupancy').value || '未選択',
            pet: document.getElementById('pet').value || '未選択',
            message: document.getElementById('message').value
        };
        
        // メール送信（EmailJS使用）
        sendEmail(formData);
    });
}

// メール送信
function sendEmail(formData) {
    const formMessage = document.getElementById('form-message');
    
    // EmailJSで実際にメール送信
    emailjs.send('service_doghouse', 'template_contact', {
        to_email: '1supagety@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        room_interest: formData.room_interest,
        occupancy: formData.occupancy,
        pet: formData.pet,
        message: formData.message
    })
    .then(function(response) {
        showFormMessage('success', 'お問い合わせありがとうございます。担当者より連絡させていただきます。');
        document.getElementById('contact-form').reset();
    }, function(error) {
        showFormMessage('error', '送信エラーが発生しました。もう一度お試しください。');
    });
}

// フォームメッセージ表示
function showFormMessage(type, message) {
    const formMessage = document.getElementById('form-message');
    if (!formMessage) return;
    
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    
    // 5秒後に非表示
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ヘッダーのスクロール効果
let lastScroll = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 画像モーダル
function initImageModal() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close-button");

    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG' && (event.target.closest('.room-images') || event.target.closest('.common-gallery'))) {
            modal.style.display = "block";
            modalImg.src = event.target.src;
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}