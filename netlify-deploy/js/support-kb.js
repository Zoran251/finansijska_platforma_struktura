/**
 * Support Knowledge Base for Chat Support
 * Contains categorized responses for common user questions
 */

// Check if supportKB already exists to avoid redeclaration
if (typeof window.supportKB === 'undefined') {
    window.supportKB = {
    account: [        {
            keywords: ['registracija', 'registrovat', 'nalog', 'račun', 'kreirat', 'napraviti', 'otvoriti', 'kreirati', 'kako da se registrujem', 'novi nalog'],
            response: 'Da biste se registrovali, idite na početnu stranicu i kliknite na "Registracija". Popunite sve potrebne informacije i pratite uputstva.'
        },        {
            keywords: ['prijava', 'login', 'prijavit', 'ulogovat', 'kako da se prijavim', 'ulogujem', 'log in'],
            response: 'Da biste se prijavili, kliknite na dugme "Prijava" u gornjem desnom uglu i unesite svoje podatke.'
        },
        {
            keywords: ['lozinka', 'šifra', 'password', 'zaboravio', 'reset'],
            response: 'Ako ste zaboravili lozinku, kliknite na "Zaboravili ste lozinku?" link na stranici za prijavu i pratite uputstva za resetovanje.'
        }
    ],
    budget: [
        {
            keywords: ['budžet', 'budzet', 'planiranje', 'plan', 'planirat'],
            response: 'Naša aplikacija vam omogućava jednostavno planiranje budžeta kroz pravilo 50/30/20. Nakon što unesete vaše prihode, možete prilagoditi kategorije prema vašim potrebama.'
        },
        {
            keywords: ['50/30/20', 'pravilo', 'procent', 'procenat'],
            response: 'Pravilo 50/30/20 predlaže da 50% prihoda ide na osnovne potrebe, 30% na lične želje i 20% na štednju i otplatu dugova.'
        },
        {
            keywords: ['trošak', 'troškovi', 'unos', 'unet'],
            response: 'Za unos troškova, idite na sekciju "Moj Budžet" i izaberite odgovarajuću kategoriju za dodavanje troška.'
        }
    ],
    savings: [
        {
            keywords: ['štednja', 'ušteda', 'štedeti', 'investicija', 'investirati'],
            response: 'U našoj aplikaciji možete pratiti vašu štednju i postaviti ciljeve štednje. Preporučujemo da izdvojite barem 10-20% vaših mesečnih prihoda za štednju i investicije.'
        },
        {
            keywords: ['ciljevi', 'cilj', 'finansijski ciljevi'],
            response: 'Postavljanje finansijskih ciljeva vam pomaže da bolje planirate vašu štednju. Možete postaviti više ciljeva sa različitim rokovima.'
        }
    ],
    technicalIssues: [
        {
            keywords: ['problem', 'greška', 'bug', 'ne radi'],
            response: 'Žao nam je zbog problema. Pokušajte osvežiti stranicu ili se odjaviti pa ponovo prijaviti. Ako problem i dalje postoji, kontaktirajte nas na podrska@goldenbalance.rs'
        },
        {
            keywords: ['podaci', 'ne čuva', 'ne pamti', 'izgubljen'],
            response: 'Vaši podaci se čuvaju lokalno u vašem pregledaču. Ako koristite režim privatnog pregledanja ili ste obrisali kolačiće, podaci možda neće biti sačuvani.'
        }
    ],
    general: [        {
            keywords: ['kontakt', 'podrška', 'pomoć', 'pitanje', 'kako da vas kontaktiram', 'email', 'telefon'],
            response: 'Za dodatnu pomoć možete nas kontaktirati putem e-maila na zorandostica2@gmail.com ili pozivom na +387 65 827 710, dostupni smo radnim danima od 9-17h.'
        },
        {
            keywords: ['hvala', 'zahvaljujem', 'thanks', 'super', 'odlično', 'bravo'],
            response: 'Nema na čemu! Drago nam je da smo mogli da pomognemo. Imate li još pitanja?'
        },
        {
            keywords: ['pozdrav', 'zdravo', 'dobar dan', 'dobro veče', 'dobro jutro', 'ćao', 'cao', 'hello', 'hi'],
            response: 'Pozdrav! Kako vam mogu pomoći danas u vezi sa vašim finansijama?'
        },
        {
            keywords: ['šta radi', 'funkcionalnosti', 'mogućnosti', 'šta mogu', 'kako funkcioniše', 'o aplikaciji'],
            response: 'Golden Balance je finansijska aplikacija koja vam pomaže da planirate budžet po pravilu 50/30/20, pratite troškove po kategorijama, postavite štedne ciljeve i upravljate svojim finansijama na jednom mestu.'
        },
        {
            keywords: ['besplatno', 'cena', 'plaćanje', 'koliko košta', 'price'],
            response: 'Golden Balance aplikacija je trenutno besplatna za korišćenje. Možete kreirati nalog i početi planiranje budžeta odmah!'
        }    ]
    };
} else {
    console.log('Support Knowledge Base already exists, skipping redeclaration');
}

// Console log to confirm knowledge base is loaded
console.log('Golden Balance Support Knowledge Base loaded successfully!', window.supportKB);