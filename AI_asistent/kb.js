// Enkapsulacija baze znanja za chatbot koristeći IIFE (Immediately Invoked Function Expression)
(function(global) {
    "use strict";
    
    // Privatna baza znanja - potpuno sakrivena od globalnog scope-a
    var knowledgeBase = {
        greeting: {
            response: "Zdravo! Ja sam vaš AI finansijski asistent. Kako vam mogu pomoći sa vašim finansijskim pitanjima danas?",
            keywords: ["zdravo", "pozdrav", "hi", "hello", "bok", "dobar dan", "dobro veče", "dobro jutro", "ćao", "cao", "hey"]
        },
        investment_intent: {
            response: "Investiranje je važan korak u izgradnji dugoročnog finansijskog blagostanja. Postoji više različitih opcija za investiranje, od niskog do visokog rizika:\n\n1. Štedni računi i oročeni depoziti (nizak rizik, 1-3% prinosa)\n2. Državne i korporativne obveznice (nizak do srednji rizik, 2-7% prinosa)\n3. Investicione nekretnine (srednji rizik, 4-10% prinosa)\n4. Akcije i ETF fondovi (srednji do visok rizik, 7-12% prinosa dugoročno)\n5. Kriptovalute i alternativne investicije (visok rizik, volatilni prinosi)\n\nPre donošenja odluke o investiranju, važno je razmotriti vaše finansijske ciljeve, vremenski horizont i toleranciju na rizik.",
            keywords: ["investirati", "investicija", "ulaganje", "uložiti", "ulagati", "investiranje", "portfolio", "prinos", "berza", "akcije"]
        },
        kredit: {
            response: "Pre uzimanja kredita, važno je razmotriti sledeće faktore:\n\n1. Kamatnu stopu i EKS (efektivna kamatna stopa koja uključuje sve troškove)\n2. Period otplate i kako utiče na ukupne troškove kredita\n3. Mesečnu ratu u odnosu na vaše prihode (idealno ispod 30%)\n4. Dodatne troškove i naknade (obrada, osiguranje, prevremena otplata)\n5. Fiksna vs. varijabilna kamata i rizike koje nosi svaka opcija\n\nZlatno pravilo je da rata kredita ne bi trebalo da prelazi 30% vaših mesečnih prihoda, a za stambene kredite do 40% uz odgovarajuću analizu.",
            keywords: ["kredit", "krediti", "pozajmica", "zajam", "rata", "kamata", "eks", "kredit za stan", "stambeni kredit", "gotovinski kredit", "pozajmica", "kreditna sposobnost", "refinansiranje", "hipoteka", "keš kredit", "kamata na kredit", "kako dobiti kredit", "kreditni rejting"]
        },
        porezi: {
            response: "Osnovne informacije o porezima koje treba da znate:\n\n1. Porez na dohodak građana (10-20% zavisno od visine prihoda)\n2. PDV - porez na dodatu vrednost (20% standardna stopa, 10% povlašćena)\n3. Porez na imovinu (različite stope zavisno od lokacije i vrednosti)\n4. Porez na kapitalni dobitak (15% na razliku prodajne i nabavne cene imovine)\n5. Doprinosi za socijalno osiguranje (PIO, zdravstveno, nezaposlenost)\n\nPoresko planiranje je važan deo finansijske strategije. Za optimizaciju vaše poreske situacije i moguće olakšice, preporučujem konsultaciju sa poreskim savetnikom.",
            keywords: ["porez", "porezi", "pdv", "dohodak", "imovina", "kapitalni dobitak", "poreska prijava", "poreske olakšice", "godišnji porez", "plaćanje poreza", "povraćaj poreza", "poreski odbici", "porez na nekretnine", "porez na dividendu", "porez na zarade"]
        },
        kriptovalute: {
            response: "Investiranje u kriptovalute nosi visok rizik i zahteva poseban oprez:\n\n1. Izuzetno volatilno tržište - cene mogu značajno oscilirati u kratkom periodu\n2. Potrebno temeljno istraživanje - razumevanje tehnologije i tržišnih faktora\n3. Investirajte samo onoliko koliko ste spremni da izgubite\n4. Diversifikujte portfolio umesto ulaganja u samo jednu kriptovalutu\n5. Bezbednost je ključna - koristite sigurne novčanike i pouzdane platforme za trgovanje\n\nPreporučujem da kriptovalute čine maksimalno 5-10% vašeg ukupnog investicionog portfolia, zavisno od vaše tolerancije na rizik.",
            keywords: ["kripto", "kriptovalute", "bitcoin", "ethereum", "bitkoin", "btc", "eth", "altcoin", "blockchain", "rudarenje", "mining", "token", "wallet", "novčanik za kriptovalute", "defi", "nft", "stablecoin", "binance", "coinbase"]
        },
        osiguranje: {
            response: "Osnovni tipovi osiguranja koje bi trebalo razmotriti za potpunu finansijsku zaštitu:\n\n1. Životno osiguranje - zaštita porodice u slučaju smrti osiguranika\n2. Zdravstveno osiguranje - pokriće troškova lečenja i medicinskih usluga\n3. Osiguranje imovine - zaštita od štete na nekretninama i vrednoj pokretnoj imovini\n4. Osiguranje od nezgode - zaštita u slučaju povreda ili trajnog invaliditeta\n5. Osiguranje od odgovornosti - zaštita od odštetnih zahteva trećih lica\n6. Putno osiguranje - za zaštitu tokom putovanja\n\nOsiguranje treba prilagoditi vašoj životnoj situaciji, porodičnim okolnostima i vrednosti imovine. Za izbor najadekvatnijih polisa i pokrića, preporučujem konsultaciju sa stručnjakom.",
            keywords: ["osiguranje", "polisa", "životno", "zivotno", "zdravstveno", "imovina", "nezgoda", "osigurati", "osiguravajuće društvo", "premija osiguranja", "korisnik osiguranja", "osigurani slučaj", "kasko", "autoosiguranje", "dopunsko osiguranje", "rizik", "nadoknada štete", "osigurana suma"]
        },
        penzija: {
            response: "Za uspešno planiranje penzije koja će vam omogućiti finansijski komfor u starijim godinama:\n\n1. Počnite štedeti što ranije - čak i mali iznosi mogu značajno narasti zahvaljujući složenoj kamati\n2. Iskoristite državni penzioni fond (prvi stub) kao osnovu\n3. Razmotrite privatne penzione fondove (drugi i treći stub) za dodatnu sigurnost\n4. Investirajte dugoročno u diversifikovani portfolio\n5. Redovno povećavajte iznos štednje kako rastu vaši prihodi\n\nFinansijski stručnjaci preporučuju da težite ka 70-80% vaših trenutnih primanja za period penzije. Naša kalkulacija pokazuje da je potrebno izdvajati oko 15% godišnjih prihoda tokom radnog veka da biste ostvarili ovaj cilj.",
            keywords: ["penzija", "penzioner", "penzioni fond", "penziono", "starost", "penzionisanje", "treće doba", "trece doba", "fond PIO", "privatni penzioni fond", "dobrovoljni penzioni fond", "obavezni penzioni fond", "primanja u penziji", "penzijski sistem", "penziono osiguranje"]
        },
        dugoročni_ciljevi: {
            response: "Postavljanje i ostvarivanje dugoročnih finansijskih ciljeva zahteva razumevanje moći složene kamate i dugoročnog planiranja:\n\n1. Složena kamata je ključni princip koji omogućava eksponencijalni rast investicija tokom vremena\n2. Formula za izračunavanje konačne vrednosti uz složenu kamatu je: FV = PV * (1 + r)^n\n   - FV: konačna vrednost\n   - PV: početna investicija\n   - r: godišnja stopa prinosa (kao decimala)\n   - n: broj godina\n\n3. Za postizanje dugoročnog cilja, koristite naš finansijski kalkulator gde možete uneti:\n   - Početni iznos (jednokratna uplata)\n   - Mesečnu štednju (redovne uplate)\n   - Ciljani iznos\n   - Vremenski period\n   - Očekivanu stopu prinosa\n\nNa primer, ako počnete sa 10.000€ i želite doći do 300.000€ za 40 godina, uz pretpostavljeni godišnji prinos od 7%, potrebno je mesečno izdvajati oko 70€. Sa višom stopom prinosa od 9%, dovoljno je oko 25€ mesečno. Za personalizovanu analizu, molimo koristite naš kalkulator složene kamate.",
            keywords: ["dugoročni cilj", "dugorocni cilj", "dugoročno", "dugorocno", "složena kamata", "slozena kamata", "kamata na kamatu", "eksponencijalni rast", "za 10 godina", "za 20 godina", "za 30 godina", "za 40 godina", "duži period", "veliki iznos", "ostvariti cilj", "kalkulator", "izračunati", "izracunati", "finansijska nezavisnost", "penzijski fond", "penzionisanje", "finansijsko planiranje", "dupliranje novca", "uvećanje kapitala", "finansijska budućnost", "finansijska sloboda", "sedmogodišnje pravilo", "pravilo 72", "dugoročna investicija", "pasivni prihod", "finansijska sigurnost", "kroz vreme", "budućnost", "dugoročna strategija", "uvećati bogatstvo", "stvaranje bogatstva", "finansijski plan", "finansijski ciljevi"]
        },
        inflacija: {
            response: "Inflacija je stalni rast opšteg nivoa cena koji utiče na kupovnu moć vašeg novca tokom vremena. Za efikasnu zaštitu od inflacije:\n\n1. Investirajte u realna dobra poput nekretnina koje tradicionalno prate ili premašuju stopu inflacije\n2. Kupujte državne obveznice indeksirane prema inflaciji (npr. TIPS u SAD)\n3. Ulažite u akcije kvalitetnih kompanija koje mogu da prilagode cene inflaciji\n4. Diverzifikujte portfolio uključivanjem imovine koja služi kao zaštita od inflacije (zlato, robe)\n5. Izbegavajte držanje velike količine gotovine na duži period\n\nProsečna godišnja stopa inflacije u razvijenim ekonomijama je istorijski oko 2-3%, mada periodi visoke inflacije mogu značajno smanjiti vrednost štednje. Zato je važno imati strategiju investiranja koja uzima u obzir inflatorni rizik.",
            keywords: ["inflacija", "poskupljenje", "rast cena", "vrednost novca", "kupovna moć", "inflatorna spirala", "hiperinflacija", "indeks potrošačkih cena", "inflaciona stopa", "realna vrednost", "nominalna vrednost", "centralna banka", "monetarna politika", "deflacija", "stagflacija"]
        },
        finansijski_cilj: {
            response: "Za ostvarivanje specifičnog finansijskog cilja potrebno je napraviti konkretan plan koristeći principe složene kamate i redovne štednje. Naš kalkulator vam može pomoći da vidite kako različite stope prinosa i različiti iznosi mesečne štednje utiču na krajnji rezultat.\n\nEvo nekoliko primera za različite početne iznose i ciljeve:\n\n1. Sa početnim ulogom od 10.000€ i mesečnom štednjom od 100€, uz 7% godišnjeg prinosa:\n    Za 20 godina: oko 85.000€\n    Za 30 godina: oko 175.000€\n    Za 40 godina: oko 335.000€\n\n2. Za postizanje cilja od 300.000€ uz početnih 10.000€ i 7% godišnjeg prinosa:\n    Za 30 godina: potrebno je mesečno ulagati oko 225€\n    Za 40 godina: potrebno je mesečno ulagati oko 70€\n\nPrincipi koji pomažu u dostizanju dugoročnih finansijskih ciljeva:\n1. Počnite što ranije - svaka godina je važna zbog efekta složene kamate\n2. Budite konzistentni - redovna mesečna ulaganja su ključna\n3. Reinvestirajte prinose - ne povlačite dividende i kamate\n4. Povećavajte iznos ulaganja kako vam rastu prihodi\n\nZa tačno planiranje vašeg ličnog cilja, preporučujem korišćenje našeg kalkulatora i konsultacije sa finansijskim savetnikom.",
            keywords: ["finansijski cilj", "cilj", "želim da uštedim", "zelim da ustedim", "želim da imam", "zelim da imam", "da dođem do", "da dodjem do", "dostići", "dostici", "konkretan iznos", "tačan iznos", "tacan iznos"]
        },
        akcije: {
            response: "Akcije (deonice) predstavljaju vlasnički udeo u kompaniji i jedan su od osnovnih investicionih instrumenata:\n\n1. Potencijal za dugoročni rast kapitala - istorijski, akcije beleže najveće prinose u dužem periodu\n2. Dividende - dodatni prihod od profita kompanije koji se isplaćuje akcionarima\n3. Likvidnost - mogućnost brze kupovine i prodaje na organizovanim tržištima\n4. Rizik - cene akcija mogu biti volatilne u kraćem periodu\n\nZa početak investiranja u akcije, razmotrite ETF-ove (fondovi koji prate berze) koji nude diversifikaciju i niže troškove. Indeksni fondovi koji prate S&P 500, MSCI World ili domaće indekse mogu biti dobra početna tačka sa istorijskim prinosom od oko 7-10% godišnje dugoročno.",
            keywords: ["akcije", "deonice", "berza", "berzansko trgovanje", "hartije od vrednosti", "dividenda", "broker", "akcionarsko društvo", "s&p 500", "belex", "blue chip", "tržišna kapitalizacija", "p/e racio", "cena akcije", "volatilnost", "likvidnost", "trgovanje akcijama", "kupovina akcija", "prodaja akcija", "investiranje u akcije", "ulaganje u akcije", "kako kupiti akcije", "gde kupiti akcije", "etf", "index fond", "indeksni fond", "berzanski indeks"]
        },
        nekretnine: {
            response: "Investiranje u nekretnine je popularna strategija dugoročnog stvaranja bogatstva:\n\n1. Potencijal za aprecijaciju vrednosti tokom vremena\n2. Pasivan prihod od izdavanja\n3. Zaštita od inflacije - vrednost nekretnina često prati ili premašuje stopu inflacije\n4. Potencijalne poreske olakšice za vlasnike nekretnina\n5. Mogućnost korišćenja finansijskog leveridža (hipotekarni krediti)\n\nPri investiranju u nekretnine, ključni faktori su lokacija, stanje objekta, potencijal za rast vrednosti i odnos prihoda od izdavanja prema vrednosti nekretnine (tzv. yield). Za početnike, REIT fondovi (fondovi za ulaganje u nekretnine) mogu biti pristupačnija opcija sa manjim početnim ulaganjem.",
            keywords: ["nekretnina", "nekretnine", "stan", "kuća", "kuca", "plac", "zemljište", "investiciona nekretnina", "izdavanje", "renta", "yield", "najam", "stanarina", "hipoteka", "kvadratura", "kvadrat", "cena nekretnine", "lokacija", "reit", "stambeni kredit", "kupovina stana", "kupovina kuće", "investicija u nekretnine", "nekretnina kao investicija", "ulaganje u nekretnine", "investiranje u stanove"]
        },
        složena_kamata: {
            response: "Složena kamata je jedan od najmoćnijih finansijskih koncepata i često se naziva osmim svetskim čudom. Evo kako funkcioniše:\n\n1. Za razliku od proste kamate koja se obračunava samo na glavnicu, složena kamata se obračunava i na glavnicu i na prethodno zarađenu kamatu\n\n2. Formula za izračunavanje: A = P(1 + r/n)^(nt), gde je:\n    A = konačni iznos\n    P = početna glavnica\n    r = godišnja kamatna stopa (u decimalnom zapisu)\n    n = broj perioda kapitalizacije godišnje\n    t = vreme u godinama\n\n3. Primeri rasta investicije od 10.000€ sa različitim stopama prinosa:\n    3% godišnje: nakon 20 godina = 18.061€\n    5% godišnje: nakon 20 godina = 26.533€\n    7% godišnje: nakon 20 godina = 38.697€\n    10% godišnje: nakon 20 godina = 67.275€\n\n4. Sa redovnim mesečnim uplatama rezultati su još impresivniji. Na primer, 200€ mesečno tokom 30 godina uz 7% prinosa daje oko 243.000€!\n\nVažno je razumeti da čak i mala razlika u stopi prinosa može dovesti do ogromne razlike u konačnom iznosu nakon dužeg vremenskog perioda. Zato je važno početi investirati što ranije i težiti najvišim razumno ostvarivim stopama prinosa za vaš nivo rizika.\n\nProbajte naš kalkulator da izračunate koliko će vredeti vaša investicija kroz vreme uz moć složene kamate.",
            keywords: ["složena kamata", "slozena kamata", "kamata na kamatu", "kapitalizacija kamate", "pravilo 72", "eksponencijalni rast", "reinvestiranje", "kamata", "obračun kamate", "kamatna stopa", "formula za kamatu", "izračunavanje kamate", "stopa prinosa", "godišnji prinos", "pasivni prihod", "formula za složenu kamatu", "finansijska formula", "rast novca", "sedmogodišnje pravilo", "udvostručiti novac", "dupliranje novca", "uvećanje investicije", "snaga kamate", "kumulativni prinos", "reinvestirana dobit", "reinvestirana dividenda", "kapitalizovana kamata", "kamata na kamatu na kamatu", "efekat lavine", "akumulacija bogatstva", "dugoročni rast", "efekat grude snega", "vremenska vrednost novca", "uvećanje vrednosti"]
        }
    };
    
    // Privatne pomoćne funkcije
    function findBestMatch(query) {
        query = query.toLowerCase();
        let bestCategory = "default";
        let bestScore = 0;
        let investmentIntent = false;
        
        // Provera za dugoročne finansijske ciljeve (npr. "imam 10.000€, želim 300.000€ za 40 godina")
        const longTermGoalPattern = /imam\s+(\d+[\.,]?\d*)\s*[€$]?\s*.*?\s+[žz]elim\s+(\d+[\.,]?\d*)\s*[€$]?\s*.*?\s+za\s+(\d+)\s*god/i;
        const altLongTermGoalPattern = /[žz]elim\s+(\d+[\.,]?\d*)\s*[€$]?\s*.*?\s+za\s+(\d+)\s*god/i;
        const moneyAmountPattern = /(\d+[\.,]?\d*)\s*[€$]/i;
        
        // Provera za pitanja o složenoj kamati
        const compoundInterestPattern = /slo[žz]en[ae]\s*kamat[ae]|kamat[ae]\s*na\s*kamat[ae]|koliko\s+[cć]e\s+(bit[Ii]|vredeti)\s+(\d+[\.,]?\d*)\s*[€$]?\s+za\s+(\d+)\s*god|koliko\s+[cć]e\s+narasti|formul[ae]\s+za\s+slo[žz]enu\s+kamatu|ra[cč]un[ae]\s+slo[žz]en[ae]\s+kamat[ae]|duplira[nmt]|uve[cć]a[nmt]|eksponencijaln[iao]|rast za (\d+)\s*god/i;
        
        // Dodatni obrasci za prepoznavanje dugoročnih ciljeva
        const longTermPattern = /za\s+(\d+)\s*god|dugor[oa][cč]n[aoi]|nakon\s+(\d+)\s*god|kroz\s+(\d+)\s*god|kroz\s+vreme|tokom\s+vremena|budu[cć]nost|penzij[aeu]/i;
        const goalPattern = /([cć]ilj|plan|strategij[ae]|ostvariti|posti[cć]i|investicij[aeu]|ulo[žz]iti|finansijsk[aou]|nezavisnost)/i;
        
        // Ako pitanje sadrži specifičan obrazac za dugoročni cilj sa složenom kamatom
        if (longTermGoalPattern.test(query) || altLongTermGoalPattern.test(query) || 
            (moneyAmountPattern.test(query) && 
             (/za\s+(\d+)\s*god/.test(query) || /nakon\s+(\d+)\s*god/.test(query)) && 
             /[žz]elim|[žz]elela|[žz]eleo|ho[cć]u|ho[cć]em/.test(query))) {
            return "dugoročni_ciljevi";
        }
        
        // Ako pitanje sadrži obrasce za složenu kamatu
        if (compoundInterestPattern.test(query)) {
            return "složena_kamata";
        }
        
        // Provera namere za investiranje
        const investmentIntentPatterns = [
            /gde (da )?invest(iram|irati)|gde (da )?ul(ozim|agati|azem)/i,
            /kako (da )?invest(iram|irati)|kako (da )?ul(ozim|agati|azem)/i,
            /kako mogu (da )?(invest|ulož|uloz|ulag)/i,
            /kako mogu investirati/i,
            /kako mogu uložiti/i,
            /kako mogu da investiram/i,
            /u [sš]ta (da )?invest(iram|irati)|u [sš]ta (da )?ul(ozim|agati|azem)/i,
            /(preporuc|preporuč)(i|ite|ujete) (mi )?investicij/i,
            /savetu?j(e|ete)? (me )?(oko|za) (invest|ulag)/i,
            /pomoz(i|ite) (mi )?(da |oko |sa |za )?(invest|ulag)/i,
            /(zeleo bih|želeo bih|želim|zelim|hoću|hocu|hteo bih) (da )?(invest|ulož|uloz)/i,
            /najbolj[ae] (investicij|ulaganj)/i,
            /isplativ[ao] (investicij|ulaganj)/i,
            /prinos[ai]? (od|na) (investicij|ulaganj)/i,
            /zarad(a|iti) (novac|pare|novca|para)/i,
            /poveća(ti|nje) (novac|kapital|bogatstv|štednj)/i,
            /uložiti (novac|pare|štednj)/i,
            /(sigurn|bezbedn|pametno) ulaga/i,
            /pasivn[ai] (prihod|zarad)/i,
            /gdje mogu da uložim/i
        ];
        
        // Provera za investicionu nameru
        for (let pattern of investmentIntentPatterns) {
            if (pattern.test(query)) {
                investmentIntent = true;
                
                // Dodatna provera ako se radi o specifičnoj vrsti investicije
                for (let category in knowledgeBase) {
                    if (knowledgeBase[category].keywords) {
                        for (let keyword of knowledgeBase[category].keywords) {
                            if (query.toLowerCase().includes(keyword.toLowerCase())) {
                                return category;
                            }
                        }
                    }
                }
                // Ne izlazimo iz petlje ovde, dozvoljavamo da se prođe kroz sve obrasce
            }
        }
        
        if (investmentIntent) {
            return "investment_intent"; // Posebna kategorija za nameru investiranja
        }
        
        // Naprednije pretraživanje - računamo skor za svaku kategoriju
        for (let category in knowledgeBase) {
            if (knowledgeBase[category].keywords) {
                // Za svaku kategoriju računamo skor
                let categoryScore = 0;
                
                for (let keyword of knowledgeBase[category].keywords) {
                    const keywordLower = keyword.toLowerCase();
                    
                    // Tačno podudaranje nosi više poena
                    if (query.includes(keywordLower)) {
                        // Dodajemo više poena za duže ključne reči
                        categoryScore += keywordLower.length * 2;
                        
                        // Ako je reč na početku upita, to je verovatno važnije
                        if (query.indexOf(keywordLower) < 10) {
                            categoryScore += 5;
                        }
                        
                        // Ako je to ceo upit ili većina upita, to je skoro sigurno prava kategorija
                        if (query.length < keywordLower.length + 5) {
                            categoryScore += 20;
                        }
                    }
                    
                    // Pretraga za delove složenih reči
                    const keywordParts = keywordLower.split(" ");
                    if (keywordParts.length > 1) {
                        for (let part of keywordParts) {
                            if (part.length > 3 && query.includes(part)) {
                                categoryScore += part.length;
                            }
                        }
                    }
                }
                
                // Bonus poeni za dugoročne ciljeve ako upit sadrži vremenski period
                if (category === "dugoročni_ciljevi" && longTermPattern.test(query)) {
                    categoryScore += 10;
                }
                
                // Bonus poeni za dugoročne ciljeve ako upit sadrži reči vezane za ciljeve
                if (category === "dugoročni_ciljevi" && goalPattern.test(query)) {
                    categoryScore += 5;
                }
                
                // Ako je skor za ovu kategoriju veći od trenutno najboljeg, ažuriramo najboljeg
                if (categoryScore > bestScore) {
                    bestScore = categoryScore;
                    bestCategory = category;
                }
            }
        }
        
        // Ako nema dobrog poklapanja, vraćamo default
        return bestScore > 5 ? bestCategory : "default";
    }
    
    // Funkcija za testiranje prepoznavanja kategorije
    function testCategorization() {
        const testQueries = [
            "Zdravo, kako si?",
            "Šta je složena kamata?",
            "Imam 10.000€, želim 300.000€ za 40 godina",
            "Kako da investiram u akcije?",
            "Šta treba da znam o kreditima?",
            "Koliko iznosi porez na kapitalnu dobit?",
            "Da li je dobro ulagati u kriptovalute?",
            "Kakvo osiguranje da izaberem?",
            "Kako da se pripremim za penziju?",
            "Kako da se zaštitim od inflacije?",
            "Želim da štedim za školovanje dece",
            "Koje akcije preporučujete?",
            "Cene nekretnina u Beogradu",
            "Kako da izračunam složenu kamatu?"
        ];
        
        console.log("=== TEST PREPOZNAVANJA KATEGORIJE ===");
        testQueries.forEach(query => {
            const category = findBestMatch(query);
            console.log("Query: \"" + query + "\" => Category: " + category);
        });
        console.log("==========================================");
    }
    
    // Funkcija za testiranje dugoročnih ciljeva i složene kamate
    function testLongTermGoalDetection() {
        const testCases = [
            { query: "Imam 10.000€, želim 300.000€ za 40 godina", expected: true },
            { query: "Želim 100.000€ za 20 godina", expected: true },
            { query: "Koliko će vredeti 5000€ nakon 20 godina?", expected: true },
            { query: "Kako radi složena kamata?", expected: true },
            { query: "Želim da kupim stan za 5 godina", expected: false },
            { query: "Kako da uštedim 1000€ do sledeće godine?", expected: false },
            { query: "Koje akcije da kupim?", expected: false },
            { query: "Kako da planiram za penziju?", expected: true },
            { query: "Dugoročno investiranje", expected: true },
            { query: "Kratkoročni krediti", expected: false }
        ];
        
        console.log("=== TEST PREPOZNAVANJA DUGOROČNIH CILJEVA I SLOŽENE KAMATE ===");
        testCases.forEach(test => {
            const result = chatBotAPI.isLongTermGoalQuestion(test.query);
            const success = result === test.expected;
            console.log(
                (success ? "" : "") + 
                " Query: \"" + test.query + "\"" +
                " | Expected: " + test.expected +
                " | Actual: " + result +
                " | Category: " + chatBotAPI.identifyTopic(test.query)
            );
        });
        console.log("==========================================");
    }

    // Funkcija za testiranje celokupnog sistema odgovora
    function testAllResponses() {
        const testQueries = [
            "Zdravo!",
            "Šta je složena kamata?",
            "Imam 10.000€, želim 300.000€ za 40 godina",
            "Kako da investiram u akcije?",
            "Šta treba da znam o kreditima?",
            "Preporučite mi osiguranje",
            "Kako da se pripremim za penziju?",
            "Koja je najbolja strategija za dugoročno investiranje?",
            "Zašto je inflacija loša za štednju?"
        ];
        
        console.log("=== TEST SISTEMA ODGOVORA ===");
        testQueries.forEach(query => {
            const category = chatBotAPI.identifyTopic(query);
            const response = chatBotAPI.getResponse(query);
            console.log(
                "Query: \"" + query + "\"\n" +
                "Category: " + category + "\n" +
                "Response: " + response.substring(0, 100) + "...\n" +
                "------------------------------------------"
            );
        });
        console.log("==========================================");
    }

    // Funkcija za testiranje celokupnog sistema odgovora za složenu kamatu
    function testCompoundInterestResponses() {
        const testQueries = [
            "Objasni mi šta je složena kamata",
            "Imam 10.000€, želim 300.000€ za 40 godina",
            "Koliko će vredeti 5000€ nakon 20 godina sa 7% prinosa?",
            "Želim da dupliran novac za 5 godina",
            "Ako uložim 20.000 dinara na 15 godina",
            "Kako da izračunam buduću vrednost investicije?",
            "Da li je bolje ulagati mesečno ili godišnje?",
            "Koja je formula za složenu kamatu?",
            "Koliko moram mesečno da štedim da bih imao milion evra za 30 godina?"
        ];
        
        console.log("=== TEST ODGOVORA ZA SLOŽENU KAMATU ===");
        testQueries.forEach(query => {
            const category = chatBotAPI.identifyTopic(query);
            const response = chatBotAPI.getResponse(query);
            console.log(
                "Query: \"" + query + "\"\n" +
                "Category: " + category + "\n" +
                "Response: " + response.substring(0, 100) + "...\n" +
                "------------------------------------------"
            );
        });
        console.log("==========================================");
    }
    
    // Funkcija za testiranje svih funkcionalnosti vezanih za dugoročne ciljeve
    function testAllLongTermFeatures() {
        console.log("=== SVEOBUHVATNO TESTIRANJE DUGOROČNIH CILJEVA ===");
        testLongTermGoalDetection();
        testAdvancedLongTermGoalDetection();
        testCompoundInterestResponses();
        console.log("==========================================");
    }
    
    // Funkcija za napredno testiranje prepoznavanja složene kamate i dugoročnih ciljeva
    function testAdvancedLongTermGoalDetection() {
        const advancedTestCases = [
            { query: "Kako da dupliran novac u narednih 7 godina?", expected: true, expectedCategory: "složena_kamata" },
            { query: "Koliko mi treba mesečno da uštedim da bih imao 100.000€ za 25 godina?", expected: true, expectedCategory: "dugoročni_ciljevi" },
            { query: "Ako želim da imam 500.000€ za penziju, koliko treba da štedim?", expected: true, expectedCategory: "dugoročni_ciljevi" },
            { query: "Kako da ostvarim finansijsku nezavisnost kroz investiranje?", expected: true, expectedCategory: "dugoročni_ciljevi" },
            { query: "Dugoročna strategija za uvećanje kapitala", expected: true, expectedCategory: "dugoročni_ciljevi" },
            { query: "Eksponencijalni rast investicije - kako to funkcioniše?", expected: true, expectedCategory: "složena_kamata" },
            { query: "Trenutna vrednost 1000€ mesečno na 30 godina", expected: true, expectedCategory: "dugoročni_ciljevi" },
            { query: "Sedmogodišnje pravilo za udvostručenje novca", expected: true, expectedCategory: "složena_kamata" },
            { query: "Kako da planiram finansijski za budućnost?", expected: true, expectedCategory: "dugoročni_ciljevi" }
        ];
        
        console.log("=== NAPREDNO TESTIRANJE SLOŽENE KAMATE I DUGOROČNIH CILJEVA ===");
        advancedTestCases.forEach(test => {
            const result = chatBotAPI.isLongTermGoalQuestion(test.query);
            const category = chatBotAPI.identifyTopic(test.query);
            const success = result === test.expected && (test.expectedCategory ? category === test.expectedCategory : true);
            
            console.log(
                (success ? "" : "") + 
                " Query: \"" + test.query + "\"" +
                " | Expected: " + test.expected +
                " | Actual: " + result +
                " | Category: " + category +
                (test.expectedCategory ? " | Expected Category: " + test.expectedCategory : "")
            );
        });
        console.log("==========================================");
    }
    
    // Funkcija za analizu upita i izvlačenje dodatnih informacija (za buduće korišćenje)
    function analyzeQuery(query) {
        // Normalizacija
        query = query.toLowerCase();
        
        // Detekcija vremenskog horizonta
        let timeHorizon = "Neodređen";
        const yearMatch = query.match(/za\s+(\d+)\s*god/i);
        if (yearMatch && yearMatch[1]) {
            const years = parseInt(yearMatch[1]);
            if (years <= 5) {
                timeHorizon = "Kratak rok (do 5 godina)";
            } else if (years <= 15) {
                timeHorizon = "Srednji rok (5-15 godina)";
            } else {
                timeHorizon = "Dug rok (preko 15 godina)";
            }
        } else if (/kratkor[oa][cč]n[oi]|brzog?|usko[rm]/i.test(query)) {
            timeHorizon = "Kratak rok (do 5 godina)";
        } else if (/sr[ae]dnj[ie]r[oa][cč]n[oi]/i.test(query)) {
            timeHorizon = "Srednji rok (5-15 godina)";
        } else if (/dugor[oa][cč]n[oi]|penzij[aeu]|budu[cć]nost/i.test(query)) {
            timeHorizon = "Dug rok (preko 15 godina)";
        }
        
        // Detekcija iznosa
        let amount = "Nije specificiran";
        const amountMatch = query.match(/(\d+[\.,]?\d*)\s*[€$]/i);
        if (amountMatch && amountMatch[1]) {
            const amountValue = parseFloat(amountMatch[1].replace(",", "."));
            if (amountValue < 1000) {
                amount = "Mali iznos (ispod 1.000€)";
            } else if (amountValue < 10000) {
                amount = "Srednji iznos (1.000-10.000€)";
            } else if (amountValue < 100000) {
                amount = "Veći iznos (10.000-100.000€)";
            } else {
                amount = "Veliki iznos (preko 100.000€)";
            }
        }
        
        // Detekcija rizičnog profila
        let riskProfile = "Nije specificiran";
        if (/sigurn[aeiou]|bez\s*rizik[ao]|niž[ie]\s*rizik[ao]|niskim?\s*rizikom?|konzervativn[aeiou]/i.test(query)) {
            riskProfile = "Nizak rizik";
        } else if (/srednj[ie]\s*rizik[ao]|umeren[aeiou]\s*rizik[ao]/i.test(query)) {
            riskProfile = "Srednji rizik";
        } else if (/visok[aeiou]?\s*rizik[ao]|agresivn[aeiou]|špekulativn[aeiou]|spekulativn[aeiou]/i.test(query)) {
            riskProfile = "Visok rizik";
        }
        
        return {
            timeHorizon: timeHorizon,
            amount: amount,
            riskProfile: riskProfile
        };
    }
    
    // Javni API za chatbot
    const chatBotAPI = {
        // Glavna metoda za dobijanje odgovora na osnovu korisničkog upita
        getResponse: function(query) {
            const category = findBestMatch(query);
            
            // Ako postoji kategorija, vrati odgovor
            if (knowledgeBase[category]) {
                // Ako je pitanje o dugoročnom cilju sa konkretnim iznosima, dodajemo personalizovani odgovor
                if (category === "dugoročni_ciljevi" || category === "složena_kamata") {
                    // Analiza upita za personalizovani odgovor
                    const queryAnalysis = analyzeQuery(query);
                    
                    // Ako imamo vremenski horizont i iznos, možemo dati personalizovaniji odgovor
                    if (queryAnalysis.timeHorizon !== "Neodređen" && queryAnalysis.amount !== "Nije specificiran") {
                        return knowledgeBase[category].response + "\n\nZa vaš konkretan upit koji se odnosi na " + 
                               queryAnalysis.amount.toLowerCase() + " u " + queryAnalysis.timeHorizon.toLowerCase() + 
                               ", preporučujemo da koristite naš kalkulator složene kamate za tačnu procenu.";
                    }
                }
                
                // Provera da li je pitanje vezano za investiranje i dodavanje preporuke za konsultaciju
                const investmentCategories = ["investment_intent", "akcije", "nekretnine", "kriptovalute", "berza", "rizik"];
                if (investmentCategories.includes(category)) {
                    return knowledgeBase[category].response + 
                           "\n\nZa detaljnije informacije o investiranju i personalizovane savete prilagođene vašoj situaciji, " +
                           "preporučujemo da zakažete konsultaciju sa našim stručnim brokerom koji će vam pomoći da napravite " +
                           "optimalan investicioni plan. Možete zakazati termin klikom na dugme 'Zakaži konsultaciju' u gornjem meniju naše aplikacije.";
                }
            }
            
            return knowledgeBase[category].response;
        },
        
        getGreeting: function() {
            return knowledgeBase.greeting.response;
        },
        
        // Metoda za prepoznavanje teme upita bez davanja odgovora
        identifyTopic: function(query) {
            return findBestMatch(query);
        },
        
        // Metoda koja proverava da li se radi o nameri za investiranje
        isInvestmentIntent: function(query) {
            return findBestMatch(query) === "investment_intent";
        },
        
        // Metoda koja proverava da li se radi o pitanju vezanom za dugoročne ciljeve i složenu kamatu
        isLongTermGoalQuestion: function(query) {
            const result = findBestMatch(query);
            
            // Proširena lista kategorija vezanih za dugoročne ciljeve
            const longTermCategories = [
                "dugoročni_ciljevi", 
                "finansijski_cilj", 
                "složena_kamata",
                "investicije", // Uključujemo i investicije ako pitanje sadrži ključne reči za dugoročne ciljeve
                "penzija"      // Penzija je takođe dugoročni cilj
            ];
            
            // Proveravamo da li kategorija pripada dugoročnim ciljevima
            if (longTermCategories.includes(result)) {
                return true;
            }
            
            // Dodatna provera za investicije - da li se odnosi na dugoročno investiranje
            if (result === "investicije" && 
                (/dugor[oa][cč]n[oi]|za (\d+) god|penzij[aeu]|budu[cć]nost/.test(query.toLowerCase()))) {
                return true;
            }
            
            return false;
        },
        
        // Metoda koja vraća nasumičan pozdrav iz nekoliko varijanti
        getRandomGreeting: function() {
            const greetings = [
                "Zdravo! Kako vam mogu pomoći sa finansijskim pitanjima danas?",
                "Dobrodošli u Golden Balance! Kako vam mogu pomoći?",
                "Pozdrav! Ja sam vaš AI finansijski asistent. Postavite mi pitanje!",
                "Dobrodošli! Kako vam mogu pomoći oko vaših finansija danas?",
                "Zdravo! Spremna sam da odgovorim na vaša finansijska pitanja."
            ];
            
            return greetings[Math.floor(Math.random() * greetings.length)];
        },
        
        // Testna funkcija za prepoznavanje (samo u development modu)
        _testDetection: function() {
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                testCategorization();
                testLongTermGoalDetection();
                return true;
            } else {
                console.log("Testiranje je dostupno samo u development okruženju.");
                return false;
            }
        },
        
        // Napredno testiranje prepoznavanja složene kamate i dugoročnih ciljeva
        _testAdvancedDetection: function() {
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                testAdvancedLongTermGoalDetection();
                return true;
            } else {
                console.log("Testiranje je dostupno samo u development okruženju.");
                return false;
            }
        },
        
        // Testna funkcija za odgovore (samo u development modu)
        _testResponses: function() {
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                testAllResponses();
                return true;
            } else {
                console.log("Testiranje je dostupno samo u development okruženju.");
                return false;
            }
        },
        
        // Testna funkcija za odgovore specifično vezane za složenu kamatu
        _testCompoundInterestResponses: function() {
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                testCompoundInterestResponses();
                return true;
            } else {
                console.log("Testiranje je dostupno samo u development okruženju.");
                return false;
            }
        },
        
        // Testna funkcija koja izvršava sva testiranja vezana za dugoročne ciljeve i složenu kamatu
        _testAllLongTermFeatures: function() {
            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                testAllLongTermFeatures();
                return true;
            } else {
                console.log("Testiranje je dostupno samo u development okruženju.");
                return false;
            }
        },
        
        // Test funkcija za kreiranje notifikacije
        createTestNotification: function(title, message, type) {
            // Funkcija koja kreira test notifikaciju za proveru funkcionalnosti
            console.log("Kreiranje test notifikacije:", title, message, type);
            
            // Pokušaj slanja preko UserNotifications ako postoji
            if (typeof UserNotifications !== 'undefined' && UserNotifications.addNotification) {
                UserNotifications.addNotification({
                    title: title || "Test notifikacija",
                    message: message || "Ovo je test notifikacija za proveru sistema.",
                    type: type || "Obaveštenje"
                });
                console.log("Notifikacija poslata preko UserNotifications");
                return true;
            }
            
            // Alternativni pristup - direktno u localStorage
            try {
                const userNotifications = localStorage.getItem('userNotifications') ? 
                    JSON.parse(localStorage.getItem('userNotifications')) : [];
                
                userNotifications.push({
                    id: 'user_notif_' + Date.now(),
                    title: title || "Test notifikacija",
                    message: message || "Ovo je test notifikacija za proveru sistema.",
                    type: type || "Obaveštenje",
                    timestamp: new Date().toISOString(),
                    read: false
                });
                
                localStorage.setItem('userNotifications', JSON.stringify(userNotifications));
                
                // Ažuriranje bedža ako postoji
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    const unreadCount = userNotifications.filter(notif => !notif.read).length;
                    badge.textContent = unreadCount;
                    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
                }
                
                console.log("Notifikacija direktno dodana u localStorage");
                return true;
            } catch (error) {
                console.error("Greška pri kreiranju notifikacije:", error);
                return false;
            }
        }
    };

    // Osiguravamo da se API ne može menjati i da knowledgeBase nije dostupan
    Object.freeze(chatBotAPI);
    
    // Osiguravamo da niko ne može pristupiti ovom modulu kroz debugger
    Object.defineProperty(global, "_chatBotKBModule", { 
        value: chatBotAPI,
        writable: false,
        configurable: false,
        enumerable: false
    });

    // Dodavanje API-ja na global objekat, ali samo ako već nije definisan
    if (typeof global.ChatBotKB === "undefined") {
        global.ChatBotKB = chatBotAPI;
    }

    // Dodatno osiguranje da se ChatBotKB ne može menjati
    if (Object.freeze) {
        Object.freeze(global.ChatBotKB);
    }

    // Vraćamo samo API bez izlaganja baze znanja
    return chatBotAPI;
})(typeof window !== "undefined" ? window : global);
