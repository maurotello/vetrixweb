(function () {
    const i18n = {
        es: {
            header: {
                inicio: "Inicio",
                sintomas: "Síntomas",
                pilares: "Autoridad",
                proceso: "Metodología",
                faq: "FAQs",
                contacto: "Contacto",
                langLabel: "IDIOMA",
                btnPresupuesto: "Solicitar Presupuesto",
                mobDiagnostico: "Solicitar Diagnóstico"
            },
            footer: {
                description: "Infraestructura de alto rendimiento y SEO técnico. Desarrollado desde la Patagonia Argentina para el mundo.",
                engineLabel: "Diseñado con",
                paymentsLabel: "Pagos Globales",
                transferLabel: "TRANSFERENCIA",
                privacy: "Privacidad",
                terms: "Términos",
                contact: "Contacto",
                designedBy: "Designed by",
                waLabel: "Consultar Disponibilidad"
            },
            urls: {
                home: "/",
                sintomas: "/#sintomas",
                pilares: "/#pilares",
                proceso: "/#proceso",
                faq: "/#faq",
                contacto: "/#contacto",
                privacy: "/privacidad.html",
                terms: "/terminos.html"
            }
        },
        en: {
            header: {
                inicio: "Home",
                sintomas: "Symptoms",
                pilares: "Authority",
                proceso: "Methodology",
                faq: "FAQs",
                contacto: "Contact",
                langLabel: "LANGUAGE",
                btnPresupuesto: "Request a Quote",
                mobDiagnostico: "Request Diagnosis"
            },
            footer: {
                description: "High-performance infrastructure and technical SEO. Developed from Argentine Patagonia for the world.",
                engineLabel: "Engineered with",
                paymentsLabel: "Global Payments",
                transferLabel: "TRANSFER",
                privacy: "Privacy",
                terms: "Terms",
                contact: "Contact",
                designedBy: "Designed by",
                waLabel: "Check Availability"
            },
            urls: {
                home: "/en/",
                sintomas: "/en/#sintomas",
                pilares: "/en/#pilares",
                proceso: "/en/#proceso",
                faq: "/en/#faq",
                contacto: "/en/#contacto",
                privacy: "/en/privacy.html",
                terms: "/en/terms.html"
            }
        },
        pt: {
            header: {
                inicio: "Início",
                sintomas: "Sintomas",
                pilares: "Autoridade",
                proceso: "Metodologia",
                faq: "FAQs",
                contacto: "Contato",
                langLabel: "IDIOMA",
                btnPresupuesto: "Solicitar Orçamento",
                mobDiagnostico: "Solicitar Diagnóstico"
            },
            footer: {
                description: "Infraestrutura de alto desempenho e SEO técnico. Desenvolvido da Patagônia Argentina para o mundo.",
                engineLabel: "Engineered with",
                paymentsLabel: "Global Payments",
                transferLabel: "TRANSFERÊNCIA",
                privacy: "Privacidade",
                terms: "Termos",
                contact: "Contato",
                designedBy: "Designed by",
                waLabel: "Consultar Disponibilidade"
            },
            urls: {
                home: "/pt/",
                sintomas: "/pt/#sintomas",
                pilares: "/pt/#pilares",
                proceso: "/pt/#proceso",
                faq: "/pt/#faq",
                contacto: "/pt/#contacto",
                privacy: "/pt/privacidade.html",
                terms: "/pt/termos.html"
            }
        }
    };

    function detectLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/en/') || path === '/en') return 'en';
        if (path.startsWith('/pt/') || path === '/pt') return 'pt';
        return 'es';
    }

    const lang = detectLanguage();
    document.documentElement.lang = lang === 'es' ? 'es-ES' : (lang === 'pt' ? 'pt-BR' : 'en');

    async function injectLayout() {
        try {
            // Cargar Header y Footer en paralelo
            const [headerRes, footerRes] = await Promise.all([
                fetch('/layout_header.html'),
                fetch('/layout_footer.html')
            ]);

            if (!headerRes.ok || !footerRes.ok) throw new Error("Error loading layout files");

            const headerHtml = await headerRes.text();
            const footerHtml = await footerRes.text();

            const headerContainer = document.getElementById('header-placeholder');
            const footerContainer = document.getElementById('footer-placeholder');

            if (headerContainer) headerContainer.innerHTML = headerHtml;
            if (footerContainer) footerContainer.innerHTML = footerHtml;

            applyTranslations();
            initMobileMenu();
        } catch (error) {
            console.error("Layout initialization failed:", error);
        }
    }

    function applyTranslations() {
        const t = i18n[lang];
        const u = i18n[lang].urls;

        // Header Links & Texts
        const setLink = (id, href, text) => {
            const el = document.getElementById(id);
            if (el) {
                if (href) el.href = href;
                if (text) el.textContent = text;
            }
        };

        setLink('header-logo', u.home);
        setLink('nav-inicio', u.home, t.header.inicio);
        setLink('nav-sintomas', u.sintomas, t.header.sintomas);
        setLink('nav-pilares', u.pilares, t.header.pilares);
        setLink('nav-proceso', u.proceso, t.header.proceso);
        setLink('nav-faq', u.faq, t.header.faq);
        setLink('nav-contacto', u.contacto, t.header.contacto);
        setLink('lang-label', null, t.header.langLabel);
        setLink('btn-presupuesto-header', null, t.header.btnPresupuesto);

        // Mobile Menu Links
        setLink('mob-inicio', u.home, t.header.inicio);
        setLink('mob-sintomas', u.sintomas, t.header.sintomas);
        setLink('mob-pilares', u.pilares, t.header.pilares);
        setLink('mob-proceso', u.proceso, t.header.proceso);
        setLink('mob-faq', u.faq, t.header.faq);
        setLink('mob-contacto', u.contacto, t.header.contacto);
        setLink('mob-whatsapp', null, t.header.mobDiagnostico);

        // Footer
        const setTxt = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setTxt('footer-description', t.footer.description);
        setTxt('footer-engine-label', t.footer.engineLabel);
        setTxt('footer-payments-label', t.footer.paymentsLabel);
        setTxt('footer-transfer-label', t.footer.transferLabel);
        setLink('footer-privacy-link', u.privacy, t.footer.privacy);
        setLink('footer-terms-link', u.terms, t.footer.terms);
        setLink('footer-contact-link', u.contacto, t.footer.contact);
        setTxt('footer-designed-label', t.footer.designedBy);
        setTxt('wa-float-label', t.footer.waLabel);

        // Highlight active link if desired (optional)
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === path) {
                link.classList.add('text-neon-cyan');
                link.classList.remove('text-slate-400');
            }
        });
    }

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });

            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.style.overflow = '';
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    window.changeLanguage = function (l) {
        if (l === 'en') window.location.href = '/en/';
        else if (l === 'pt') window.location.href = '/pt/';
        else window.location.href = '/';
    };

    // Ejecutar carga al estar el DOM listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectLayout);
    } else {
        injectLayout();
    }
})();
