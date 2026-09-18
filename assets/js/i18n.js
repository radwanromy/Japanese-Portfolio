/*===============================================================
  i18n.js — English / Japanese language switching
  - Walks elements tagged with data-i18n / data-i18n-html / data-i18n-aria
    / data-i18n-placeholder / data-i18n-alt and swaps their text based on
    the active language.
  - Persists the choice in localStorage ('selected-lang'), default 'ja'.
  - Also switches the résumé download link (PDF for English, XLSX for
    Japanese) and updates <html lang="">.
===============================================================*/
(function () {
    const RESUME = {
        en: {
            href: 'assets/pdf/ASM_RADWAN_RESUME.pdf',
            filename: 'ASM_RADWAN_RESUME.pdf',
        },
        ja: {
            href: 'assets/files/ASM_Radwan_Rirekisho.xlsx',
            filename: 'ASM_Radwan_履歴書.xlsx',
        },
    }

    const T = {
        // ---------- NAV ----------
        'nav.home': { ja: 'ホーム', en: 'Home' },
        'nav.about': { ja: '私について', en: 'About' },
        'nav.skills': { ja: 'スキル', en: 'Skills' },
        'nav.experience': { ja: '職務経歴', en: 'Experience' },
        'nav.work': { ja: 'ポートフォリオ', en: 'Portfolio' },
        'nav.contact': { ja: 'お問い合わせ', en: 'Contact' },
        'lang.switchLabel': { ja: '言語を切り替え / Switch language', en: 'Switch language / 言語を切り替え' },

        // ---------- HOME ----------
        'home.greeting': { ja: 'こんにちは', en: 'Hello, I\'m' },
        'home.name': { ja: 'エー エス エム レードワンです。', en: 'A.S.M. Radwan' },
        'home.title': { ja: '私はフルスタックエンジニアです。', en: 'Full-Stack Software Engineer' },
        'home.download': { ja: 'ダウンロード履歴書', en: 'Download Resume' },
        'home.aboutBtn': { ja: '私について', en: 'About Me' },
        'home.scroll': { ja: '下へスクロール', en: 'Scroll down' },

        // ---------- ABOUT ----------
        'about.subtitle': { ja: '私のイントロ', en: 'Introduction' },
        'about.title': { ja: '私について', en: 'About Me' },
        'about.box1.title': { ja: '経験', en: 'Experience' },
        'about.box1.sub': { ja: '実務経験5年以上', en: '5+ years professional' },
        'about.box2.title': { ja: '完了', en: 'Completed' },
        'about.box2.sub': { ja: '20以上のプロジェクト', en: '20+ Projects' },
        'about.box3.title': { ja: '資格', en: 'Certified' },
        'about.box3.sub': { ja: 'AWS 認定', en: 'AWS Certified' },
        'about.cta': { ja: '私に連絡して', en: 'Get in Touch' },
        'about.description': {
            ja: 'A.S.M. ラドワンです。ソフトウェアエンジニアとして日本で3年以上、実務経験は合計5年になります。バングラデシュ出身で、東京在住です。現在は株式会社総合システムリサーチにて、車載・制御系開発や企業向けWeb・基幹システムの開発・運用・保守に携わっています。以前はモチベーションワークス株式会社でクラウド型校務支援システム『BLEND』の開発、Era-InfoTech Limited（バングラデシュ）では金融機関向けシステム（銀行ロッカー予約・クレジットカード送金）のフルスタック開発を担当しました。Spring Boot、Django、Angular、Reactを中心としたフルスタック開発と、AWSやAIツールを活用した業務効率化を得意としています。日本語はJLPT N2取得に向けて学習中です。ソースコードの一部は<a href="https://github.com/radwanromy">GitHub</a>で公開しています。',
            en: 'I\'m A.S.M. Radwan, a full-stack software engineer based in Tokyo with 5 years of professional experience, including 3+ years working in Japan. Originally from Bangladesh, I currently work at Sogo System Research, building and maintaining web and core business systems for automotive and enterprise clients. Previously, I developed BLEND, a cloud-based school management platform, at Motivation Works, and led full-stack development of banking systems (locker reservations, credit card transfers) at Era-InfoTech in Bangladesh. I specialize in full-stack development with Spring Boot, Django, Angular, and React, and enjoy using AI tools and AWS to streamline engineering workflows. I\'m currently studying for the JLPT N2. Some of my source code is available on <a href="https://github.com/radwanromy">GitHub</a>.',
        },

        // ---------- SKILLS ----------
        'skills.subtitle': { ja: '私の能力', en: 'My Abilities' },
        'skills.title': { ja: '私のスキル', en: 'My Skills' },
        'skills.group.frontend': { ja: 'フロントエンド開発', en: 'Frontend Development' },
        'skills.group.backend': { ja: 'バックエンド開発', en: 'Backend Development' },
        'skills.group.cloud': { ja: 'クラウド・ツール', en: 'Cloud & Tools' },
        'skills.level.pro': { ja: 'プロ', en: 'Professional' },
        'skills.level.advanced': { ja: '上級', en: 'Advanced' },
        'skills.level.intermediate': { ja: '中級', en: 'Intermediate' },

        // ---------- TIMELINE / EXPERIENCE ----------
        'timeline.subtitle': { ja: '私の経歴', en: 'My Journey' },
        'timeline.title': { ja: '職務経歴', en: 'Career History' },

        'timeline.job1.role': { ja: 'ソフトウェアエンジニア', en: 'Software Engineer' },
        'timeline.job1.company': { ja: '株式会社総合システムリサーチ', en: 'Sogo System Research' },
        'timeline.job1.date': { ja: '2023年8月 〜 現在（3年2ヶ月）', en: 'Aug 2023 – Present (3 yrs 2 mo)' },
        'timeline.job1.d1': { ja: '業務・基幹系を中心としたWeb・モバイルシステムの受託開発（自動車業界クライアント含む）', en: 'Contract development of web/mobile business & core systems for enterprise clients, including automotive' },
        'timeline.job1.d2': { ja: '既存システムの保守運用、障害対応・不具合調査', en: 'Maintenance and operations of existing systems; incident response and bug investigation' },
        'timeline.job1.d3': { ja: 'AIツール等を活用した業務効率化', en: 'Workflow efficiency improvements using AI tools' },
        'timeline.job1.d4': { ja: '要件整理から詳細設計、DB設計', en: 'Requirements gathering through detailed design, and database design' },
        'timeline.job1.d5': { ja: 'コーディング、テスト、リリース、手順書の作成', en: 'Coding, testing, release, and operational documentation' },

        'timeline.job2.role': { ja: 'ソフトウェアエンジニア', en: 'Software Engineer' },
        'timeline.job2.company': { ja: 'モチベーションワークス株式会社', en: 'Motivation Works, Inc.' },
        'timeline.job2.date': { ja: '2022年12月 〜 2023年3月（4ヶ月）', en: 'Dec 2022 – Mar 2023 (4 mo)' },
        'timeline.job2.d1': { ja: 'クラウド型校務支援システム『BLEND』の複数モジュールで課題を発見・解決するアプリを開発', en: 'Built features that find and resolve issues across multiple modules of BLEND, a cloud-based school management platform' },
        'timeline.job2.d2': { ja: '新しいモジュールの作成など追加機能の実装を担当', en: 'Implemented new modules and additional functionality' },
        'timeline.job2.d3': { ja: '要件対応・設計、コーディング、テスト、リリース', en: 'Requirements analysis, design, coding, testing, and release' },
        'timeline.job2.d4': { ja: '保守運用・障害対応', en: 'Maintenance operations and incident response' },

        'timeline.job3.role': { ja: 'フルスタックエンジニア', en: 'Full-Stack Engineer' },
        'timeline.job3.company': { ja: 'Era-InfoTech Limited（バングラデシュ）', en: 'Era-InfoTech Limited (Bangladesh)' },
        'timeline.job3.date': { ja: '2021年10月 〜 2022年2月（5ヶ月）', en: 'Oct 2021 – Feb 2022 (5 mo)' },
        'timeline.job3.d1': { ja: '金融機関向けシステム（銀行ロッカー予約・クレジットカード送金）および社内技術ブログのフルスタック開発', en: 'Full-stack development of financial systems (bank locker reservations, credit card transfers) and an internal tech blog platform' },
        'timeline.job3.d2': { ja: '要件定義・設計、DB構築', en: 'Requirements definition, design, and database construction' },
        'timeline.job3.d3': { ja: 'バックエンド/フロントエンド開発（Django / Angular 13 / MySQL）', en: 'Backend/frontend development (Django / Angular 13 / MySQL)' },
        'timeline.job3.d4': { ja: 'テスト・デプロイ・保守運用', en: 'Testing, deployment, and maintenance' },

        // ---------- SERVICES ----------
        'services.subtitle': { ja: '私のサービス', en: 'My Services' },
        'services.title': { ja: '私が提供しているもの', en: 'What I Offer' },
        'services.more': { ja: '続きを見る', en: 'View More' },
        'services.close': { ja: '閉じる', en: 'Close' },

        'services.card1.title': { ja: 'ウェブサイト<br>デベロッパー', en: 'Website<br>Developer' },
        'services.card1.modalTitle': { ja: 'ウェブサイト デベロッパー', en: 'Website Developer' },
        'services.card1.desc': { ja: '私はこれまで、フリーランスとして独立して仕事をしたり、企業のチームと一緒にウェブサイトを作ったりしてきました。フロントエンドのデザイン・コンテンツ制作から、機能を実現するバックエンド開発まで担当します。', en: 'I\'ve worked independently as a freelancer and as part of company teams to build websites — from front-end design and content to back-end code that powers site functionality.' },
        'services.card1.li1': { ja: '徹底的なUX調査に基づくWebデザイン', en: 'Web design based on thorough UX research' },
        'services.card1.li2': { ja: 'バックエンドのWeb開発', en: 'Back-end web development' },
        'services.card1.li3': { ja: 'Webサイトの制作・保守', en: 'Website production and maintenance' },
        'services.card1.li4': { ja: 'リードを獲得するためのランディングページ設計', en: 'Landing page design for lead generation' },
        'services.card1.li5': { ja: 'PIM・CMS・CRMシステムとの連携', en: 'Integration with PIM, CMS, and CRM systems' },

        'services.card2.title': { ja: 'ウェブサイト<br>デザイナー', en: 'Website<br>Designer' },
        'services.card2.modalTitle': { ja: 'ウェブサイト デザイナー', en: 'Website Designer' },
        'services.card2.desc': { ja: 'ユーザビリティに基づいた、機能的で魅力的なWeb・モバイルアプリケーションの開発。マークアップとCSSでのページ制作、モックアップやプロトタイプの作成、バックエンド開発者のサポートまで担当します。', en: 'Building functional, engaging web and mobile applications grounded in usability — from markup and CSS to mockups, prototypes, and supporting back-end developers with implementation and troubleshooting.' },
        'services.card2.li1': { ja: '使いやすさに基づく機能的で魅力的なアプリ開発', en: 'Functional, engaging web & mobile app design based on usability' },
        'services.card2.li2': { ja: 'UXの詳細な調査に基づくWebデザイン', en: 'Web design based on in-depth UX research' },
        'services.card2.li3': { ja: 'フロントエンドWeb開発', en: 'Front-end web development' },
        'services.card2.li4': { ja: 'Webサイトの作成・維持', en: 'Building and maintaining websites' },
        'services.card2.li5': { ja: 'リードを獲得するためのランディングページ設計', en: 'Landing page design for lead generation' },

        'services.card3.title': { ja: 'フルスタック<br>デベロッパー', en: 'Full-Stack<br>Developer' },
        'services.card3.modalTitle': { ja: 'フルスタック デベロッパー', en: 'Full-Stack Developer' },
        'services.card3.desc': { ja: 'Webデベロッパーの幅広い責任に対応するシステムやアプリケーションを、企画から実装まで一貫して構築します：Spring Boot(Java), Angular 13(TypeScript), Django(Python), SQL, MySQL, PLSQL, Hibernate, Oracle, MVC/Entity Framework, Bootstrap, JavaScript, HTML, CSS, Web APIなど。', en: 'End-to-end tools and systems covering the full breadth of web development responsibilities: Spring Boot (Java), Angular 13 (TypeScript), Django (Python), SQL, MySQL, PLSQL, Hibernate, Oracle, MVC/Entity Framework, Bootstrap, JavaScript, HTML, CSS, and Web APIs.' },
        'services.card3.li1': { ja: 'フロントエンド（クライアントサイド）とバックエンド（サーバーサイド）の両方を担当', en: 'Work across both the front end (client side) and back end (server side)' },
        'services.card3.li2': { ja: 'データベースからUI/UXまで幅広いコーディング領域に対応', en: 'Comfortable across a wide range of coding niches — from databases to UI/UX' },
        'services.card3.li3': { ja: 'バックエンド：Spring Boot(Java), Django(Python), SQL, MySQL, PLSQL, Hibernate, Oracle', en: 'Backend frameworks: Spring Boot (Java), Django (Python), SQL, MySQL, PLSQL, Hibernate, Oracle' },
        'services.card3.li4': { ja: 'フロントエンド：Angular 13(TypeScript), Bootstrap, JavaScript, HTML, CSS', en: 'Frontend frameworks: Angular 13 (TypeScript), Bootstrap, JavaScript, HTML, CSS' },
        'services.card3.li5': { ja: 'フロントエンド・バックエンド双方に対応できる柔軟なリソース', en: 'A flexible resource for developing both front end and back end' },

        // ---------- WORK ----------
        'work.subtitle': { ja: '私のポートフォリオ', en: 'My Portfolio' },
        'work.title': { ja: '最近の作品', en: 'Recent Work' },
        'work.filter.all': { ja: '全て', en: 'All' },
        'work.filter.web': { ja: 'ウェブ', en: 'Web' },
        'work.filter.software': { ja: 'ソフトウェア', en: 'Software' },
        'work.filter.design': { ja: 'UI/UXデザイン', en: 'UI/UX Design' },
        'work.portfolioTitle': { ja: 'レスポンシブ日本語ポートフォリオ', en: 'Responsive Japanese Portfolio' },
        'work.noDemo': { ja: 'デモなし', en: 'No public demo' },

        // ---------- TESTIMONIALS ----------
        'testimonial.subtitle': { ja: 'クライアントのフィードバック', en: 'Client Feedback' },
        'testimonial.title': { ja: '推薦の声', en: 'Testimonials' },

        // ---------- CONTACT ----------
        'contact.subtitle': { ja: 'お問い合わせ先', en: 'Contact' },
        'contact.title': { ja: '連絡先', en: 'Contact Me' },
        'contact.talk': { ja: '話しましょう', en: 'Let\'s Talk' },
        'contact.email': { ja: 'Eメール', en: 'Email' },
        'contact.messenger': { ja: 'メッセンジャー', en: 'Messenger' },
        'contact.whatsapp': { ja: 'ワッツアップ', en: 'WhatsApp' },
        'contact.write': { ja: '私に書いて', en: 'Write to me' },
        'contact.projectTitle': { ja: '私にあなたのプロジェクトを教えてください', en: 'Tell me about your project' },
        'contact.name': { ja: '名前', en: 'Name' },
        'contact.namePlaceholder': { ja: 'あなたの名前を入力してください', en: 'Enter your name' },
        'contact.emailPlaceholder': { ja: 'メールアドレスを入力', en: 'Enter your email address' },
        'contact.projectLabel': { ja: 'プロジェクト', en: 'Project' },
        'contact.projectPlaceholder': { ja: 'プロジェクトの詳細を書く', en: 'Describe your project' },
        'contact.send': { ja: 'メッセージの送信', en: 'Send Message' },

        // ---------- FOOTER ----------
        'footer.title': { ja: 'レードワン', en: 'Radwan' },
        'footer.about': { ja: 'について', en: 'About' },
        'footer.projects': { ja: 'プロジェクト', en: 'Projects' },
        'footer.testimonials': { ja: '推薦状', en: 'Testimonials' },
        'footer.copy': { ja: '無断複写・転載を禁じます 2022–2026', en: 'All rights reserved 2022–2026' },

        // ---------- MISC ----------
        'compact.readMore': { ja: '続きを読む', en: 'Read more' },
        'compact.readLess': { ja: '閉じる', en: 'Show less' },
    }

    function applyLanguage(lang) {
        document.documentElement.setAttribute('lang', lang)

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n')
            if (T[key]) el.textContent = T[key][lang]
        })

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html')
            if (T[key]) el.innerHTML = T[key][lang]
        })

        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria')
            if (T[key]) el.setAttribute('aria-label', T[key][lang])
        })

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder')
            if (T[key]) el.setAttribute('placeholder', T[key][lang])
        })

        document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
            const key = el.getAttribute('data-i18n-alt')
            if (T[key]) el.setAttribute('alt', T[key][lang])
        })

        // Résumé download switches file + filename by language
        const resumeLink = document.getElementById('resume-download')
        if (resumeLink) {
            resumeLink.setAttribute('href', RESUME[lang].href)
            resumeLink.setAttribute('download', RESUME[lang].filename)
        }

        // Lang button active-state styling
        document.querySelectorAll('.lang-button__option').forEach((el) => {
            el.classList.toggle('is-active', el.getAttribute('data-lang-option') === lang)
        })

        localStorage.setItem('selected-lang', lang)
        window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }))
    }

    document.addEventListener('DOMContentLoaded', () => {
        let lang = localStorage.getItem('selected-lang')
        if (lang !== 'en' && lang !== 'ja') lang = 'ja'
        applyLanguage(lang)

        const langButton = document.getElementById('lang-button')
        if (langButton) {
            langButton.addEventListener('click', (e) => {
                const target = e.target.closest('[data-lang-option]')
                const current = localStorage.getItem('selected-lang') === 'en' ? 'en' : 'ja'
                const next = target ? target.getAttribute('data-lang-option') : (current === 'en' ? 'ja' : 'en')
                if (next !== current) applyLanguage(next)
            })
        }

        // Compact-theme "read more" toggles for clamped long text blocks
        document.querySelectorAll('.i18n-clamp').forEach((el) => {
            const toggle = document.createElement('button')
            toggle.type = 'button'
            toggle.className = 'i18n-clamp-toggle'
            toggle.textContent = T['compact.readMore'][document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ja']
            toggle.addEventListener('click', () => {
                const expanded = el.classList.toggle('is-expanded')
                const key = expanded ? 'compact.readLess' : 'compact.readMore'
                const curLang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ja'
                toggle.textContent = T[key][curLang]
            })
            el.insertAdjacentElement('afterend', toggle)

            window.addEventListener('langchange', (ev) => {
                const key = el.classList.contains('is-expanded') ? 'compact.readLess' : 'compact.readMore'
                toggle.textContent = T[key][ev.detail.lang]
            })
        })
    })
})()
