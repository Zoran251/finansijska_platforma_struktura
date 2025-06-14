// Pomoćne funkcije za rad sa slikama u localStorage
// Ovaj fajl sadrži funkcije za konverziju, skladištenje i učitavanje slika

// Konvertuje URL ili Blob u Base64 string
function convertImageToBase64(imageSource) {
    return new Promise((resolve, reject) => {
        // Ako je već Base64 string, vrati ga direktno
        if (typeof imageSource === 'string' && imageSource.startsWith('data:image/')) {
            resolve(imageSource);
            return;
        }

        // Ako je URL, učitaj sliku prvo
        const img = new Image();
        img.crossOrigin = 'Anonymous'; // Pokušaj zaobilaženja CORS ograničenja
        
        img.onload = function() {
            try {
                // Kreiraj canvas da bismo konvertovali sliku u Base64
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Ograniči veličinu slike ako je prevelika
                let width = img.width;
                let height = img.height;
                
                // Ako je slika prevelika, skaliraj je na max 800px
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
                
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
                
                // Podesi canvas na novu veličinu
                canvas.width = width;
                canvas.height = height;
                
                // Nacrtaj sliku na canvas
                ctx.drawImage(img, 0, 0, width, height);
                
                // Konvertuj u Base64 format
                const base64String = canvas.toDataURL('image/jpeg', 0.8); // Kompresuj na 80% kvaliteta
                resolve(base64String);
            } catch (error) {
                console.error('Greška pri konverziji slike:', error);
                reject(error);
            }
        };
        
        img.onerror = function() {
            console.error('Nije moguće učitati sliku sa URL-a:', imageSource);
            reject(new Error('Nije moguće učitati sliku sa URL-a'));
        };
        
        // Postavi izvor slike - URL ili Blob
        if (typeof imageSource === 'string') {
            img.src = imageSource;
        } else if (imageSource instanceof Blob) {
            img.src = URL.createObjectURL(imageSource);
        } else {
            reject(new Error('Nepodržan tip izvora slike'));
        }
    });
}

// Čuva sliku u localStorage
function saveImageToStorage(key, imageData) {
    try {
        // Proveri veličinu podataka
        const size = new Blob([imageData]).size;
        const maxSize = 2 * 1024 * 1024; // 2MB
        
        if (size > maxSize) {
            console.warn('Slika je prevelika za localStorage (> 2MB):', size / (1024 * 1024), 'MB');
            return false;
        }
        
        localStorage.setItem(key, imageData);
        return true;
    } catch (error) {
        console.error('Greška pri čuvanju slike:', error);
        
        // Proveri da li je greška zbog prekoračenja kvote lokalnog skladišta
        if (error.name === 'QuotaExceededError' || error.code === 22) {
            alert('Lokalno skladište je puno. Molimo obrišite neke stavke pre dodavanja nove slike.');
        }
        
        return false;
    }
}

// Učitava sliku iz localStorage
function getImageFromStorage(key, defaultImage = null) {
    try {
        const imageData = localStorage.getItem(key);
        return imageData || defaultImage;
    } catch (error) {
        console.error('Greška pri učitavanju slike iz skladišta:', error);
        return defaultImage;
    }
}

// Čita sliku iz input file elementa
function readImageFromInput(fileInput) {
    return new Promise((resolve, reject) => {
        if (!fileInput.files || !fileInput.files[0]) {
            reject(new Error('Nije izabrana datoteka'));
            return;
        }
        
        const file = fileInput.files[0];
        
        // Proveri da li je datoteka slika
        if (!file.type.match('image.*')) {
            reject(new Error('Izabrana datoteka nije slika'));
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            resolve(e.target.result);
        };
        
        reader.onerror = function(e) {
            console.error('Greška pri čitanju datoteke:', e);
            reject(e);
        };
        
        reader.readAsDataURL(file);
    });
}

// Validira URL slike
function isValidImageUrl(url) {
    // Brza provera formata URL-a
    if (!url || typeof url !== 'string') return false;
    
    // Proveri ekstenzije datoteka
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const urlLower = url.toLowerCase();
    
    // Ako URL direktno pokazuje na sliku sa ekstenzijom, verovatno je validan
    if (imageExtensions.some(ext => urlLower.endsWith(ext))) {
        return true;
    }
    
    // Proveri uobičajene URL-ove za slike
    if (urlLower.includes('imgur.com') || 
        urlLower.includes('images.unsplash.com') ||
        urlLower.includes('.googleusercontent.com') ||
        urlLower.includes('drive.google.com') ||
        urlLower.includes('flickr.com') ||
        urlLower.includes('cloudinary.com') ||
        urlLower.includes('i.ibb.co')) {
        return true;
    }
    
    // Ako URL sadrži parametre za slike
    if (urlLower.includes('image') || urlLower.includes('photo') || urlLower.includes('picture')) {
        return true;
    }
    
    // Ako ima image/ u URL-u, verovatno je slika
    if (urlLower.includes('image/')) {
        return true;
    }
    
    // Ako počinje sa data:image/, onda je Base64
    if (urlLower.startsWith('data:image/')) {
        return true;
    }
    
    // Inače ćemo biti oprezni i smatrati da nije slika
    return false;
}
